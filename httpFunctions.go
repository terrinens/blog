package main

import (
	"api-server/pkg/api"
	"api-server/pkg/api/logs"
	"cloud.google.com/go/firestore"
	"net/http"
)

func InitRouter(client *firestore.Client) {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		_, err := w.Write([]byte("Server Ready"))
		logs.WriteFail(w, r, err)
	})

	http.HandleFunc("/post", func(w http.ResponseWriter, r *http.Request) {
		api.Handler(w, r, api.Post{Client: *client})
	})

	http.HandleFunc("/project", func(w http.ResponseWriter, r *http.Request) {
		api.Handler(w, r, api.Project{})
	})
}
