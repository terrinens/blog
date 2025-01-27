package response

import (
	"api-server/pkg/logs"
	"encoding/json"
	"net/http"
)

func Json(w http.ResponseWriter, code int, data map[string]interface{}) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(code)
	if err := json.NewEncoder(w).Encode(data); err != nil {
		logs.ServerFail(w, nil, "Failed to Json Encode")
	}
}

func Notfound(w http.ResponseWriter) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(404)
	return
}
