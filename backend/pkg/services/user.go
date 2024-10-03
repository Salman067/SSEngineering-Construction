package services

import (
	"errors"
	domain "go-blog/pkg/domains"
	"go-blog/pkg/models"
	"go-blog/pkg/types"
)

type UserService struct {
	repo domain.UserRepoInterface
}

func UserServiceInstance(userRepo domain.UserRepoInterface) domain.UserServiceInterface {
	return &UserService{
		repo: userRepo,
	}
}
func (service *UserService) RegistrationService(user *types.Registration) error {
	oldUser, _ := service.repo.FindBy("email", user.Email)

	if oldUser != nil {
		return errors.New("user already registrated")
	}
	userName := user.FirstName + " " + user.LastName
	newUser := &models.User{
		FirstName: user.FirstName,
		LastName:  user.LastName,
		UserName:  userName,
		Password:  user.Password,
		Email:     user.Email,
		Phone:     user.Phone,
		UserType:  user.UserType,
	}

	return service.repo.Registration(newUser)
}

func (service *UserService) LoginService(email string) (*models.User, error) {
	users, err := service.repo.Login(email)
	return users, err

}

func (service *UserService) GetUserService(ID uint) ([]models.User, error) {
	user, err := service.repo.GetUsers(ID)
	if err != nil {
		return nil, err
	}
	return user, nil
}

func (service *UserService) DeleteUserService(ID uint) error {
	if err := service.repo.DeleteUser(ID); err != nil {
		return errors.New("user deletion was unsuccessful")
	}
	return nil
}

func (service *UserService) UpdateUserService(user *models.User) (*models.User, error) {
	user, err := service.repo.UpdateUser(user)
	if err != nil {
		return nil, errors.New("user update was unsuccesful" + err.Error())
	}
	return user, nil
}

func (service *UserService) GetUserByUserName(ID int) (*models.User, error) {
	user, err := service.repo.FindBy("id", ID)
	if err != nil {
		return nil, err
	}
	return user, nil
}
