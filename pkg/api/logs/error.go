package logs

import (
	"log"
	"net/http"
)

// WriteFail response 작성중 실패시 사용하는 함수입니다. err가 유효할 경우에만 작동합니다.
func WriteFail(w http.ResponseWriter, r *http.Request, err error) {
	if err != nil {
		w.WriteHeader(http.StatusBadRequest)
		log.Fatalf("failed to write response: %s\n call api info : %s %s", err, r.URL.String(), r.Method)
	}
}

// ServerFail 서버에서 오류 발생시 사용하는 함수입니다. err가 유효할 경우에만 작동합니다.
func ServerFail(w http.ResponseWriter, code int, message string, err error) {
	if err != nil {
		http.Error(w, message, code)
		log.Fatalf(message, err)
	}
}
