package repositories

import (
	"errors"
	domain "go-blog/pkg/domains"
	"go-blog/pkg/models"

	"gorm.io/gorm"
)

type UserRepo struct {
	DB *gorm.DB
}

func UserDBInterface(db *gorm.DB) domain.UserRepoInterface {
	return &UserRepo{
		DB: db,
	}
}
func (userRepo *UserRepo) Registration(user *models.User) error {
	if err := userRepo.DB.Create(&user).Error; err != nil {
		return err
	}
	return nil
}

func (userRepo *UserRepo) Login(email string) (*models.User, error) {
	var user models.User
	if err := userRepo.DB.Where("email = ?", email).First(&user).Error; err != nil {
		return nil, errors.New("user not registrated")
	}
	if err := userRepo.DB.Find(&user).Error; err != nil {
		return nil, err
	}
	return &user, nil
}

func (userRepo *UserRepo) GetUsers(ID uint) ([]models.User, error) {
	var User []models.User
	if ID != 0 {
		if err := userRepo.DB.Where("id = ?", ID).First(&User).Error; err != nil {
			return nil, errors.New("user id not found")
		}
	} else {
		if err := userRepo.DB.Find(&User).Error; err != nil {
			return nil, err
		}
	}
	return User, nil
}

func (userRepo *UserRepo) FindBy(field string, value any) (*models.User, error) {
	var user models.User
	if err := userRepo.DB.Where(field+" =?", value).First(&user).Error; err != nil {
		return nil, err
	}
	return &user, nil

}
func (userRepo *UserRepo) UpdateUser(user *models.User) (*models.User, error) {
	if err := userRepo.DB.Model(&user).Save(&user).Error; err != nil {
		return nil, err
	}
	return user, nil
}

func (userRepo *UserRepo) DeleteUser(ID uint) error {
	var User models.User
	if err := userRepo.DB.Where("id = ?", ID).Delete(&User).
		Error; err != nil {
		return err
	}
	return nil
}

func (userRepo *UserRepo) GetByUserName(userName string) (*models.User, error) {
	var user models.User
	if err := userRepo.DB.Model(&models.User{}).Where("user_name =?", userName).First(&user).Error; err != nil {
		return nil, err
	}
	return &user, nil
}
