package api

import (
	"api-server/pkg/api/logs"
	"cloud.google.com/go/firestore"
	"context"
	"encoding/json"
	"io"
	"net/http"
	"strconv"
)

type Post struct {
	Client firestore.Client
}

func (api Post) Get(w http.ResponseWriter, r *http.Request) {
	limit := 10

	if limitQuery := r.URL.Query().Get("limit"); limitQuery != "" {
		if pare, err := strconv.Atoi(limitQuery); err == nil {
			limit = pare
		} else {
			http.Error(w, "limit parameter must be an integer", http.StatusBadRequest)
			return
		}
	}

	ref := api.Client.Collection("main")
	ctx := context.Background()

	docs, err := ref.OrderBy("createdAt", firestore.Desc).Limit(limit).Documents(ctx).GetAll()
	if err != nil {
		logs.ServerFail(w, http.StatusInternalServerError, "Failed to get documents", err)
		return
	}

	results := make([]map[string]interface{}, 0, len(docs))
	for _, doc := range docs {
		data := doc.Data()
		data["id"] = doc.Ref.ID
		results = append(results, data)
	}

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)

	if err = json.NewEncoder(w).Encode(results); err != nil {
		logs.ServerFail(w, http.StatusInternalServerError, "Failed to Json Encode", err)
	}
}

func (api Post) Post(w http.ResponseWriter, r *http.Request) {
	_, err := io.ReadAll(r.Body)
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		_, err = w.Write([]byte(err.Error()))
		logs.WriteFail(w, r, err)
	}
}

func (api Post) Put(w http.ResponseWriter, r *http.Request) {
}

func (api Post) Delete(w http.ResponseWriter, r *http.Request) {
}
