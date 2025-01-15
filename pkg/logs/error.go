package logs

import (
	"log"
	"net/http"
)

// WriteFail response 작성중 실패시 사용하는 함수입니다.
func WriteFail(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusBadRequest)
	log.Panicf("failed to write response: %s\n call api info : %s", r.URL.String(), r.Method)

}

// ServerFail 서버에서 오류 발생시 사용하는 함수입니다.
func ServerFail(w http.ResponseWriter, code *int, message string) {
	if code == nil {
		dfCode := http.StatusInternalServerError
		code = &dfCode
	}

	http.Error(w, message, *code)
	log.Panicf(message)
}
