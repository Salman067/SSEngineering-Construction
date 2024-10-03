package models

import (
	"time"

	_ "github.com/jinzhu/gorm/dialects/mysql"
)

type User struct {
	ID        uint      `gorm:"primary_key;AUTO_INCREMENT" json:"id,omitempty"`
	FirstName string    `json:"first_name,omitempty"`
	LastName  string    `json:"last_name,omitempty" `
	Password  string    `json:"password,omitempty" `
	UserName  string    `json:"user_name,omitempty"`
	Email     string    `json:"email,omitempty" `
	Phone     string    `json:"phone,omitempty"`
	UserType  string    `json:"user_type"  gorm:"default:'user'"`
	CreatedAt time.Time `gorm:"autoCreateTime" json:"created_at"`
	UpdatedAt time.Time `gorm:"autoUpdateTime" json:"updated_at"`
}
