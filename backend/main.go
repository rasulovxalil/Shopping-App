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
	_ "github.com/lib/pq"
)

func main() {
	e := echo.New()

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
	fmt.Println(" Successfully connected to the database!")

	// Initialize repositories and handlers
	categoryRepo := repository.NewCategoryRepository(db)
	categoryHandler := handler.NewCategoryHandler(categoryRepo)

	userRepo := repository.NewUserRepository(db)
	userHandler := handler.NewUserHandler(userRepo)

	// Routes
	e.GET("/categories", categoryHandler.GetCategories)
	e.GET("/sub-categories", categoryHandler.GetSubCategories)

	e.GET("/users", userHandler.GetUsers)
	e.GET("/users/:id", userHandler.GetUserByID)
	e.POST("/users", userHandler.CreateUser)

	// Start server
	apiPort := os.Getenv("PORT")
	if apiPort == "" {
		apiPort = "5000"
	}

	fmt.Printf(" Server running on: http://localhost:%s\n", apiPort)
	if err := e.Start("localhost:" + apiPort); err != nil {
		log.Fatalf("Server stopped: %v", err)
	}
}