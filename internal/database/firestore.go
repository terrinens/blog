package database

import (
	"cloud.google.com/go/firestore"
	"context"
	firebase "firebase.google.com/go/v4"
	"google.golang.org/api/option"
	"log"
	"os"
)

var gacEnvName = "GOOGLE_APPLICATION_CREDENTIALS"
var Client *firestore.Client

/*InitClient 해당 함수는 DB를 초기화하고 글로벌 변수 Client에 결과를 주입합니다.*/
func InitClient() {
	var clientOptions option.ClientOption

	jsonfile := os.Getenv(gacEnvName)
	if jsonfile == "" {
		log.Fatalln("firebase json key not found in environment")
	}

	if os.Getenv("DEV") == "true" {
		clientOptions = option.WithCredentialsFile(jsonfile)
	} else {
		clientOptions = option.WithCredentialsJSON([]byte(jsonfile))
	}

	option.WithCredentialsJSON([]byte(jsonfile))

	app, err := firebase.NewApp(context.Background(), nil, clientOptions)
	if err != nil || app == nil {
		log.Fatalf("error initializing app: %v\n", err)
	}

	client, err := app.Firestore(context.Background())
	if err != nil || client == nil {
		log.Fatalf("error getting client: %v\n", err)
	}

	Client = client
}
