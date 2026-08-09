package main

import (
	"database/sql"
	"fmt"
	"log"
	"os"

	"backend/handler"
	"backend/repository"

	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	_ "github.com/lib/pq"
)

func main() {
	e := echo.New()

	// CORS Middleware configuration to allow Next.js frontend requests
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"http://localhost:3000", "http://127.0.0.1:3000"},
		AllowHeaders: []string{echo.HeaderOrigin, echo.HeaderContentType, echo.HeaderAccept},
		AllowMethods: []string{echo.GET, echo.POST, echo.PUT, echo.DELETE},
	}))

	// Load environment variables
	if err := godotenv.Load(); err != nil {
		log.Println("Warning: .env file not found")
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
		log.Fatalf("Database connection error: %v", err)
	}
	defer db.Close()

	if err := db.Ping(); err != nil {
		log.Fatalf("Couldn't ping database: %v", err)
	}
	fmt.Println("Successfully connected to the database!")

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

	fmt.Printf("Server running on: http://localhost:%s\n", apiPort)
	if err := e.Start(":" + apiPort); err != nil {
		log.Fatalf("Server stopped: %v", err)
	}
}