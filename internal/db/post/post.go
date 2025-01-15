package post

import (
	"api-server/internal/db"
	"cloud.google.com/go/firestore"
	"context"
)

var tableName = "main"

// GetPosts Json Return {posts: ...posts, next: nextRef}
func GetPosts(nextRefId *string, limit *int) (map[string]interface{}, error) {
	ref := db.Client.Collection(tableName)
	ctx := context.Background()

	if limit == nil || *limit <= 0 {
		defaultLimit := 10
		limit = &defaultLimit
	}

	query := ref.OrderBy("createdAt", firestore.Desc).Limit(*limit)
	if nextRefId != nil && *nextRefId != "" {
		docRef, err := ref.Doc(*nextRefId).Get(ctx)

		if docRef == nil || err != nil {
			return nil, nil
		}

		query = query.StartAfter(docRef)
	}

	docs, err := query.Documents(ctx).GetAll()
	if err != nil {
		return nil, err
	}

	posts := make([]map[string]interface{}, 0, len(docs))
	for _, doc := range docs {
		data := doc.Data()
		data["id"] = doc.Ref.ID
		posts = append(posts, data)
	}

	results := map[string]interface{}{
		"posts":     posts,
		"nextRefId": posts[len(posts)-1]["id"],
	}

	return results, nil
}
