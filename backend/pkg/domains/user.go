package domain

import (
	"go-blog/pkg/models"
	"go-blog/pkg/types"
)

type UserRepoInterface interface {
	Registration(user *models.User) error
	Login(email string) (*models.User, error)
	GetUsers(ID uint) ([]models.User, error)
	UpdateUser(user *models.User) (*models.User, error)
	DeleteUser(ID uint) error
	FindBy(field string, value any) (*models.User, error)
	GetByUserName(userName string) (*models.User, error)
}

type UserServiceInterface interface {
	RegistrationService(user *types.Registration) error
	LoginService(email string) (*models.User, error)
	GetUserService(ID uint) ([]models.User, error)
	UpdateUserService(user *models.User) (*models.User, error)
	DeleteUserService(ID uint) error
	GetUserByUserName(ID int) (*models.User, error)
}
