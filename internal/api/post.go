package api

import (
	"api-server/internal/db/post"
	"api-server/pkg/logs"
	"encoding/json"
	"log"
	"net/http"
	"strconv"
)

type Post struct {
}

func (api Post) Get(w http.ResponseWriter, r *http.Request) {
	next := r.URL.Query().Get("next")
	limitQuery := r.URL.Query().Get("limit")

	var limit int
	if limitQuery != "" {
		val, err := strconv.Atoi(limitQuery)

		if err != nil {
			w.WriteHeader(http.StatusBadRequest)
			_, err = w.Write([]byte("limit parameter must be an integer and max request 30"))
			logs.WriteFail(w, r)
			return
		}

		limit = val
	}

	if limit >= 30 {
		w.WriteHeader(http.StatusBadRequest)
		_, _ = w.Write([]byte(`{"message":"limit parameter should be less than 30"}`))
		return
	}

	result, err := post.GetPosts(&next, &limit)
	if err != nil {
		log.Println(err.Error())
		logs.ServerFail(w, nil, "server error")
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)

	if err = json.NewEncoder(w).Encode(result); err != nil {
		logs.ServerFail(w, nil, "Failed to Json Encode")
	}
}

func (api Post) Post(w http.ResponseWriter, r *http.Request) {
}

func (api Post) Put(w http.ResponseWriter, r *http.Request) {
}

func (api Post) Delete(w http.ResponseWriter, r *http.Request) {
}
