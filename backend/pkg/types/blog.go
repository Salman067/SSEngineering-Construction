package types

import (
	"time"

	validation "github.com/go-ozzo/ozzo-validation"
)

type NewBlogBody struct {
	Subject string `json:"subject"`
	Body    string `json:"body"`
}

type CustomBlogResponse struct {
	ID        uint      `json:"id,omitempty"`
	Title     string    `json:"title,omitempty"`
	Content   string    `json:"content,omitempty"`
	Status    string    `json:"status,omitempty"`
	CreatedAt time.Time `json:"created_at,omitempty"`
	UpdatedAt time.Time `json:"updated_at,omitempty"`
	UserID    uint      `json:"userID,omitempty"`
	UserName  string    `json:"userName,omitempty"`
}

type ControlBlog struct {
	Title   string `json:"title"`
	Content string `json:"content"`
	Status  string `json:"status"`
	UserID  uint   `json:"user_id"`
}

func (b ControlBlog) Validate() error {
	return validation.ValidateStruct(&b,
		validation.Field(&b.Title,
			validation.Required.Error("Please input subject of your post"),
			validation.Length(2, 200)),
		validation.Field(&b.Content,
			validation.Required.Error("Description needed!"),
			validation.Length(2, 20000)),
	)
}
