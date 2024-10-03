package models

import (
	"time"
)

type Blog struct {
	ID        uint      `gorm:"primaryKey;autoIncrement:true" json:"id"`
	Title     string    `json:"title"`
	Content   string    `json:"content"`
	Status    string    `json:"status"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
	UserID    uint      `json:"user_id"`
	User      User
}
