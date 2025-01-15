package api

import (
	"api-server/pkg/api/logs"
	"net/http"
)

func optionsAction(w http.ResponseWriter, r *http.Request) {
	if r.Method == http.MethodOptions {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "*")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		w.Header().Set("Access-Control-Max-Age", "3600")
		w.WriteHeader(http.StatusNoContent)
	}

	w.Header().Set("Access-Control-Allow-Origin", "*")
}

func httpMethodAction(w http.ResponseWriter, r *http.Request, fun func(w http.ResponseWriter, r *http.Request)) {
	if fun != nil {
		fun(w, r)
	} else {
		w.WriteHeader(http.StatusNotFound)
		_, err := w.Write([]byte("404 - Not Found"))
		logs.WriteFail(w, r, err)
	}
}

type API interface {
	Get(w http.ResponseWriter, r *http.Request)
	Post(w http.ResponseWriter, r *http.Request)
	Put(w http.ResponseWriter, r *http.Request)
	Delete(w http.ResponseWriter, r *http.Request)
}

func Handler(w http.ResponseWriter, r *http.Request, api API) {
	switch r.Method {
	case http.MethodOptions:
		optionsAction(w, r)
	case http.MethodGet:
		httpMethodAction(w, r, api.Get)
	case http.MethodPost:
		httpMethodAction(w, r, api.Post)
	case http.MethodPut:
		httpMethodAction(w, r, api.Put)
	case http.MethodDelete:
		httpMethodAction(w, r, api.Delete)
	default:
		w.WriteHeader(http.StatusMethodNotAllowed)
	}
}
