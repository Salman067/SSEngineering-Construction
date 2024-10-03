package types

import (
	"fmt"

	jwt "github.com/dgrijalva/jwt-go"
	validation "github.com/go-ozzo/ozzo-validation/v4"
	"github.com/go-ozzo/ozzo-validation/v4/is"
)

type SignedDetails struct {
	Email    string
	UserType string
	UserID   uint
	jwt.StandardClaims
}

type User struct {
	Email    string `json:"email" `
	Password string `json:"password" `
	UserType string `json:"user_type" `
}

func (user User) Validate() error {
	return validation.ValidateStruct(&user,
		validation.Field(&user.Email, validation.Required),
		validation.Field(&user.Password, validation.Required),
		validation.Field(&user.UserType))

}

type Token struct {
	UserToken        string
	UserRefreshtoken string
}

type CustomError struct {
	Message string
	Err     error
}

func (ce *CustomError) Error() string {
	if ce.Err != nil {
		return fmt.Sprintf("%s: %v", ce.Message, ce.Err)
	}
	return ce.Message
}

type Registration struct {
	FirstName string `json:"first_name,omitempty"`
	LastName  string `json:"last_name,omitempty" `
	Password  string `json:"password,omitempty" `
	Email     string `json:"email,omitempty" `
	Phone     string `json:"phone,omitempty"`
	UserType  string `json:"user_type"`
}

func (user Registration) Validate() error {
	return validation.ValidateStruct(&user,
		validation.Field(&user.FirstName, validation.Required, validation.Length(3, 50)),
		validation.Field(&user.LastName, validation.Required, validation.Length(3, 50)),
		validation.Field(&user.Password, validation.Required),
		validation.Field(&user.Email, validation.Required, is.Email),
		validation.Field(&user.Phone, validation.Required, validation.Length(1, 11)),
		validation.Field(&user.UserType),
	)
}

type LoginResponse struct {
	Password string `json:"password"`
	Email    string `json:"email"`
}

func (user LoginResponse) Validate() error {
	return validation.ValidateStruct(&user,
		validation.Field(&user.Password, validation.Required, validation.Length(4, 20)),
		validation.Field(&user.Email, validation.Required, is.Email),
	)
}
