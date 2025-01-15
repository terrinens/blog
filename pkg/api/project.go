package api

import (
	"net/http"
)

type Project struct{}

func (p Project) Get(w http.ResponseWriter, r *http.Request) {
}

func (p Project) Post(w http.ResponseWriter, r *http.Request) {
}

func (p Project) Put(w http.ResponseWriter, r *http.Request) {
}

func (p Project) Delete(w http.ResponseWriter, r *http.Request) {
}
