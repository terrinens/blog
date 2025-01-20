package db

import (
	"cloud.google.com/go/firestore"
	"context"
	"encoding/base64"
	"encoding/json"
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

	var jsonBytes []byte
	if os.Getenv("DEV") == "true" {
		jsonBytes = devInit()
	} else {
		base64Str := os.Getenv(gacEnvName)
		jsonBytes = Base64ToJson(base64Str)
	}

	var app = appInit(jsonBytes)
	client, err := app.Firestore(context.Background())

	if err != nil {
		log.Fatalf("error getting client: %v\n", err)
	}

	Client = client
}

func appInit(data []byte) *firebase.App {
	sa := option.WithCredentialsJSON(data)

	config := &firebase.Config{ProjectID: os.Getenv("GOOGLE_PROJECT_ID")}

	app, err := firebase.NewApp(context.Background(), config, sa)

	if err != nil {
		log.Fatalf("error initializing app: %v\n", err)
	}

	return app
}

func devInit() []byte {
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

	return data
}

/*JsonToBase64 json 파일을 base64로 인코딩 이 함수가 제작된 이유는 Cloud Run에서 비밀변수가 JSON 파일로 변환이 되지 않기 때문에 수동으로 변환하기 위함임*/
func JsonToBase64(file io.Reader) string {
	data, err := io.ReadAll(file)
	if err != nil {
		log.Fatalf("파일 읽기 실패: %v", err)
	}

	var jsonData interface{}
	if err := json.Unmarshal(data, &jsonData); err != nil {
		log.Fatalf("JSON 변환 실패: %v", err)
	}

	jsonBytes, err := json.Marshal(jsonData)
	if err != nil {
		log.Fatalf("JSON 변환 실패: %v", err)
	}

	base64Data := base64.StdEncoding.EncodeToString(jsonBytes)
	return base64Data
}

func Base64ToJson(base64Data string) []byte {
	decodedData, err := base64.StdEncoding.DecodeString(base64Data)
	if err != nil {
		log.Fatalf("Base64 디코딩 실패: %v", err)
	}

	return decodedData
}
