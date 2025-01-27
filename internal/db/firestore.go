package db

import (
	"cloud.google.com/go/firestore"
	"context"
	firebase "firebase.google.com/go/v4"
	"google.golang.org/api/option"
	"io"
	"log"
	"os"
)

var gacEnvName = "GOOGLE_APPLICATION_CREDENTIALS"

var Client *firestore.Client

/*InitClient 해당 함수는 DB를 초기화하고 글로벌 변수 Client에 결과를 주입합니다.*/
func InitClient() {

	var app *firebase.App

	if os.Getenv("DEV") == "true" {
		app = devInit()
	} else {
		app = cloudInit()
	}

	if app == nil {
		log.Fatalf("error initializing app\n")
	}

	client, err := app.Firestore(context.Background())

	if err != nil || client == nil {
		log.Fatalf("error getting client: %v\n", err)
	}

	Client = client
}

func cloudInit() *firebase.App {
	newApp, err := firebase.NewApp(context.Background(), nil)
	if err != nil {
		log.Fatalf("error initializing app: %v\n", err)
	}

	return newApp
}

func devInit() *firebase.App {
	keyFile, err := os.Open(os.Getenv(gacEnvName))
	if err != nil {
		log.Fatalf("Unable to open %s: %v", gacEnvName, err)
	}

	defer func(keyFile *os.File) {
		err := keyFile.Close()
		if err != nil {
			log.Fatalf("Unable to close key file: %v", err)
		}
	}(keyFile)

	data, err := io.ReadAll(keyFile)

	if err != nil {
		log.Fatalf("Unable to read %s: %v", gacEnvName, err)
	}

	sa := option.WithCredentialsJSON(data)
	app, err := firebase.NewApp(context.Background(), nil, sa)

	if err != nil {
		log.Fatalf("error initializing app: %v\n", err)
	}

	return app
}
