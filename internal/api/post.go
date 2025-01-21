package api

import (
	"api-server/internal/db/post"
	"api-server/pkg/logs"
	"api-server/pkg/response"
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
			res := map[string]interface{}{"message": "limit parameter must be an integer and max request 30"}
			response.Json(w, 400, res)
			return
		}

		limit = val
	}

	if limit >= 30 {
		res := map[string]interface{}{"message": "limit must be less than 30"}
		response.Json(w, 400, res)
		return
	}

	result, err := post.GetPosts(&next, &limit)
	if err != nil {
		log.Println(err.Error())
		logs.ServerFail(w, nil, "server error")
	}

	response.Json(w, 200, result)
}

func (api Post) Post(w http.ResponseWriter, r *http.Request) {
	id := r.URL.Query().Get("id")
	if id == "" || id == "undefined" {
		res := map[string]interface{}{"message": "id parameter must be required or must be valid"}
		response.Json(w, 400, res)
		return
	}

	data, err := post.FindPostById(id)
	if err != nil {
		log.Println(err.Error())
		logs.ServerFail(w, nil, "server error")
	} else if data == nil {
		response.Json(w, 404, map[string]interface{}{"message": "post not found"})
	} else {
		response.Json(w, 200, data)
	}
}

func (api Post) Put(w http.ResponseWriter, r *http.Request) {
}

func (api Post) Delete(w http.ResponseWriter, r *http.Request) {
}
