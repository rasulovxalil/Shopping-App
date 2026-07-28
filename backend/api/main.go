package main

import (
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"os"

	"backend/handler"
	"backend/repository"

	"github.com/joho/godotenv"
	_ "github.com/lib/pq"
)

func main() {
	// 1. reading .env file
	if err := godotenv.Load(); err != nil {
		log.Println("Warning: couldn't load .env file")
	}

	// 2. Reading datas from ENV
	dbHost := os.Getenv("DB_HOST")
	dbPort := os.Getenv("DB_PORT")
	dbUser := os.Getenv("DB_USER")
	dbPassword := os.Getenv("DB_PASSWORD")
	dbName := os.Getenv("DB_NAME")

	apiPort := os.Getenv("PORT")
	if apiPort == "" {
		apiPort = "5000"
	}

	// 3. PostgreSQL connection text
	connStr := fmt.Sprintf(
		"host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
		dbHost, dbPort, dbUser, dbPassword, dbName,
	)

	// 4. Connecting to the DB
	db, err := sql.Open("postgres", connStr)
	if err != nil {
		log.Fatalf("Database Error: %v", err)
	}
	defer db.Close()

	if err := db.Ping(); err != nil {
		log.Fatalf("Couldn't check the ping: %v", err)
	}
	fmt.Println("Succesfully connected")
	categoryRepo := repository.NewCategoryRepository(db)
	categoryHandler := handler.NewCategoryHandler(categoryRepo)

	// 6. Ednpoit for testing
	http.HandleFunc("/health", func(w http.ResponseWriter, r *http.Request) {
		w.WriteHeader(http.StatusOK)
		w.Write([]byte("API is working"))
	})
	http.HandleFunc("/categories", categoryHandler.GetCategories)
	http.HandleFunc("/sub-categories", categoryHandler.GetSubCategories)

	// 7.starting HTTP Server
	serverAddr := ":" + apiPort
	fmt.Printf("Server is connecting: http://localhost%s/categories\n", serverAddr)

	if err := http.ListenAndServe(serverAddr, nil); err != nil {
		log.Fatalf("Server stopped: %v", err)
	}
}