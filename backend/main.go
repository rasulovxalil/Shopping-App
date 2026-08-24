package main

import (
	"database/sql"
	"errors"
	"fmt"
	"os"

	"backend/handler"
	"backend/repository"

	"github.com/golang-migrate/migrate/v4"
	migratepostgres "github.com/golang-migrate/migrate/v4/database/postgres"
	_ "github.com/golang-migrate/migrate/v4/source/file"
	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	_ "github.com/lib/pq"
	"go.uber.org/zap"
	"go.uber.org/zap/zapcore"
)

func main() {
	logFile, err := os.OpenFile("app.log", os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)
	if err != nil {
		panic(fmt.Sprintf("failed to open log file: %v", err))
	}
	defer logFile.Close()

	consoleEncoder := zapcore.NewConsoleEncoder(zap.NewDevelopmentEncoderConfig())
	fileEncoderCfg := zap.NewProductionEncoderConfig()
	fileEncoderCfg.EncodeTime = zapcore.ISO8601TimeEncoder
	fileEncoder := zapcore.NewJSONEncoder(fileEncoderCfg)

	core := zapcore.NewTee(
		zapcore.NewCore(consoleEncoder, zapcore.AddSync(os.Stdout), zap.DebugLevel),
		zapcore.NewCore(fileEncoder, zapcore.AddSync(logFile), zap.DebugLevel),
	)

	logger := zap.New(core, zap.AddCaller())
	defer logger.Sync()

	e := echo.New()

	// CORS Middleware configuration to allow Next.js frontend requests
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"http://localhost:3000", "http://127.0.0.1:3000"},
		AllowHeaders: []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept},
		AllowMethods: []string{echo.GET, echo.POST, echo.PUT, echo.DELETE},
	}))

	// Request logging middleware (zap)
	e.Use(middleware.RequestLoggerWithConfig(middleware.RequestLoggerConfig{
		LogMethod:  true,
		LogURI:     true,
		LogStatus:  true,
		LogLatency: true,
		LogError:   true,
		LogValuesFunc: func(c echo.Context, v middleware.RequestLoggerValues) error {
			fields := []zap.Field{
				zap.String("method", v.Method),
				zap.String("uri", v.URI),
				zap.Int("status", v.Status),
				zap.Duration("latency", v.Latency),
			}
			if v.Error != nil {
				logger.Error("request", append(fields, zap.Error(v.Error))...)
			} else {
				logger.Info("request", fields...)
			}
			return nil
		},
	}))

	// Load environment variables
	if err := godotenv.Load(); err != nil {
		logger.Warn(".env file not found")
	}

	// Database connection string
	connStr := fmt.Sprintf(
		"postgres://%s:%s@%s:%s/%s?sslmode=disable",
		os.Getenv("DB_USER"),
		os.Getenv("DB_PASSWORD"),
		os.Getenv("DB_HOST"),
		os.Getenv("DB_PORT"),
		os.Getenv("DB_NAME"),
	)

	// Connect to database
	db, err := sql.Open("postgres", connStr)
	if err != nil {
		logger.Fatal("Database connection error", zap.Error(err))
	}
	defer db.Close()

	if err := db.Ping(); err != nil {
		logger.Fatal("Couldn't ping database", zap.Error(err))
	}
	logger.Info("Successfully connected to the database!")

	// Run database migrations
	if err := runMigrations(db, logger); err != nil {
		logger.Fatal("Migration failed", zap.Error(err))
	}

	// Initialize repositories and handlers
	categoryRepo := repository.NewCategoryRepository(db)
	categoryHandler := handler.NewCategoryHandler(categoryRepo)

	userRepo := repository.NewUserRepository(db)
	userHandler := handler.NewUserHandler(userRepo)

	aboutUsRepo := repository.NewAboutUsRepository(db)
	aboutUsHandler := handler.NewAboutUsHandler(aboutUsRepo)

	bannerRepo := repository.NewBannerRepository(db)
	brandRepo := repository.NewBrandRepository(db)

	bannerHandler := handler.NewBannerHandler(bannerRepo)
	brandHandler := handler.NewBrandHandler(brandRepo)

	productRepo := repository.NewProductRepository(db)
	productHandler := handler.NewProductHandler(productRepo)

	cartRepo := repository.NewCartRepository(db)
	cartHandler := handler.NewCartHandler(cartRepo)

	// Single API Group for ALL routes
	api := e.Group("/api")
	{
		// Category routes
		api.GET("/categories", categoryHandler.GetCategories)
		api.GET("/sub-categories", categoryHandler.GetSubCategories)

		// User routes
		api.GET("/users", userHandler.GetUsers)
		api.GET("/users/:id", userHandler.GetUserByID)
		api.POST("/users", userHandler.CreateUser)
		api.PUT("/users/:id", userHandler.UpdateUser)
		api.DELETE("/users/:id", userHandler.DeleteUser)
		api.POST("/login", userHandler.Login)

		// About Us routes
		api.GET("/about-us", aboutUsHandler.GetAll)
		api.GET("/about-us/:slug", aboutUsHandler.GetBySlug)
		api.GET("/aboutus", aboutUsHandler.GetAll)
		api.GET("/aboutus/:slug", aboutUsHandler.GetBySlug)

		// Banner routes
		api.GET("/banners", bannerHandler.GetAll)
		api.GET("/banners/:id", bannerHandler.GetByID)

		// Brand routes
		api.GET("/brands", brandHandler.GetAll)
		api.GET("/brands/:id", brandHandler.GetByID)

		//Product routes
		api.GET("/products", productHandler.GetAll)
		api.GET("/products/:id", productHandler.GetByID)
		api.POST("/products", productHandler.Create)
		api.PUT("/products/:id", productHandler.Update)
		api.DELETE("/products/:id", productHandler.Delete)

		// Cart routes (per-user)
		api.GET("/cart/:userId", cartHandler.GetCart)
		api.POST("/cart/:userId", cartHandler.AddItem)
		api.PUT("/cart/:userId/:productId", cartHandler.UpdateItem)
		api.DELETE("/cart/:userId/:productId", cartHandler.RemoveItem)
		api.DELETE("/cart/:userId", cartHandler.ClearCart)
	}

	// Start server
	apiPort := os.Getenv("PORT")
	if apiPort == "" {
		apiPort = "5000"
	}

	logger.Info("Server running", zap.String("port", apiPort))
	if err := e.Start(":" + apiPort); err != nil {
		logger.Fatal("Server stopped", zap.Error(err))
	}
}

// runMigrations applies all pending "up" migrations from the migrations
// folder to the database, so the schema is always current on startup.
func runMigrations(db *sql.DB, logger *zap.Logger) error {
	driver, err := migratepostgres.WithInstance(db, &migratepostgres.Config{})
	if err != nil {
		return fmt.Errorf("could not create migration driver: %w", err)
	}

	m, err := migrate.NewWithDatabaseInstance("file://migrations", "postgres", driver)
	if err != nil {
		return fmt.Errorf("could not initialize migrations: %w", err)
	}

	if err := m.Up(); err != nil && !errors.Is(err, migrate.ErrNoChange) {
		return fmt.Errorf("could not apply migrations: %w", err)
	}

	logger.Info("Database migrations are up to date")
	return nil
}