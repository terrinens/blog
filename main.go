package main

import (
	"api-server/pkg/db"
	"log"
	"net/http"
	"os"
)

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"

		if err := os.Setenv("PORT", port); err != nil {
			log.Fatal("Error setting port env:", err)
		}
	}

	client := db.CreateClient()
	InitRouter(client)

	if len(os.Args) > 1 && os.Args[1] == "dev" {
		log.Println("Server Listening Port:", port)
		if err := http.ListenAndServe(":"+port, nil); err != nil {
			log.Fatalf("Error starting server: %v", err)
		}
	}
}

func init() {
	err := os.Setenv("GOOGLE_PROJECT_ID", "github-blog-b7f62")
	if err != nil {
		log.Fatal("Failed to set FIRESTORE_PROJECT_ID environment variable")
	}

	if len(os.Args) > 1 && os.Args[1] == "dev" {
		err := os.Setenv("DEV", "true")
		if err != nil {
			log.Fatal("Failed to set DEV environment variable")
		}
	}
}
