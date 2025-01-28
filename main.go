package main

import (
	"api-server/internal/database"
	"log"
	"net/http"
	"os"
	"strings"
)

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	database.InitClient()
	InitRouter()

	log.Println("Server starting on port " + port)
	err := http.ListenAndServe(":"+port, nil)
	if err != nil {
		log.Fatalf("Error starting server: %s", err)
	}
}

func init() {
	if len(os.Args) > 1 && strings.ToLower(os.Args[1]) == "dev" {
		err := os.Setenv("DEV", "true")
		if err != nil {
			log.Fatalf("Failed to set DEV environment variable")
		}
	}
}
