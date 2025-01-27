package main

import (
	"api-server/internal/api"
	"net/http"
)

func InitRouter() {
	http.HandleFunc("/post", func(w http.ResponseWriter, r *http.Request) {
		api.Handler(w, r, api.Post{})
	})
}
