package main

import (
	"api-server/internal/api"
	"api-server/pkg/logs"
	"net/http"
)

func InitRouter() {
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		_, err := w.Write([]byte("Server Ready"))
		if err != nil {
			logs.WriteFail(w, r)
		}
	})

	http.HandleFunc("/post", func(w http.ResponseWriter, r *http.Request) {
		api.Handler(w, r, api.Post{})
	})

	http.HandleFunc("/project", func(w http.ResponseWriter, r *http.Request) {
		api.Handler(w, r, api.Project{})
	})
}
