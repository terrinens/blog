package schema

import "google.golang.org/genproto/googleapis/firestore/v1"

type base struct {
	name        string
	thumbnail   *string
	content     *string
	tags        *[]string
	description string
}

type Post struct {
	base
	createdAt  firestore.Value_TimestampValue
	refProject *string
}

type Project struct {
	base
	startAt  firestore.Value_TimestampValue
	endAt    firestore.Value_TimestampValue
	projType ProjectType
}

type ProjectType string

const (
	Team     ProjectType = "team"
	Personal ProjectType = "personal"
)
