package controllers

import (
	"go-blog/pkg/auth"
	"go-blog/pkg/consts"
	domain "go-blog/pkg/domains"
	"go-blog/pkg/models"
	"go-blog/pkg/types"
	"log"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

type UserController struct {
	userService domain.UserServiceInterface
}

func SetUserController(userService *domain.UserServiceInterface) *UserController {
	return &UserController{
		userService: *userService,
	}
}

func (userController *UserController) Registration(ctx *gin.Context) {
	reqUser := &types.Registration{}
	if err := ctx.Bind(reqUser); err != nil {
		ctx.JSON(http.StatusBadRequest, consts.InvalidInput)
		return
	}

	password := HashPassword(reqUser.Password)
	reqUser.Password = password
	if err := userController.userService.RegistrationService(reqUser); err != nil {
		ctx.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	ctx.JSON(http.StatusCreated, "User has been successfully registered")

}

func (userController *UserController) Login(ctx *gin.Context) {
	var user = &types.User{}
	var model_user = &models.User{}
	var tokens = types.Token{}

	if err := ctx.Bind(user); err != nil {
		ctx.JSON(http.StatusBadRequest, consts.BadRequest)
		return
	}

	if err := user.Validate(); err != nil {
		ctx.JSON(http.StatusInternalServerError, &types.CustomError{
			Message: err.Error(),
		})
		return
	}
	model_user, err := userController.userService.LoginService(user.Email)
	if err != nil {
		ctx.JSON(http.StatusUnauthorized, &types.CustomError{
			Message: err.Error(),
		})
		return
	}
	passwordIsValid, msg := VerifyPassword(user.Password, model_user.Password)
	if !passwordIsValid {
		ctx.JSON(http.StatusInternalServerError, msg)
		return
	}
	token, refreshToken, err := auth.GenerateAllTokens(model_user.Email, model_user.UserType, model_user.ID)
	tokens.UserToken = token
	tokens.UserRefreshtoken = refreshToken
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, &types.CustomError{
			Message: err.Error(),
		})
		return
	}
	ctx.JSON(http.StatusOK, tokens)
}

func (userController *UserController) GetUsers(ctx *gin.Context) {
	user, err := userController.userService.GetUserService(0)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, &types.CustomError{
			Message: err.Error(),
		})
		return
	}
	ctx.JSON(http.StatusOK, user)
}

func (userController *UserController) GetProfile(ctx *gin.Context) {
	userID, exists := ctx.Get("user_id")
	if !exists {
		ctx.JSON(http.StatusUnauthorized, gin.H{"error": "User ID not found"})
		return
	}
	ID := userID.(uint)
	user, err := userController.userService.GetUserService(ID)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, &types.CustomError{
			Message: err.Error(),
		})
		return
	}
	ctx.JSON(http.StatusOK, user)
}

func (userController *UserController) GetByUserName(ctx *gin.Context) {
	tempID := ctx.Param("id")
	ID, err := strconv.ParseUint(tempID, 0, 0)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, consts.InvalidID)
		return
	}

	user, err := userController.userService.GetUserByUserName(int(ID))
	if err != nil {
		ctx.JSON(http.StatusBadRequest, &types.CustomError{
			Message: err.Error(),
		})
		return
	}
	ctx.JSON(http.StatusOK, user)
}

func (userController *UserController) DeleteUser(ctx *gin.Context) {
	tempID := ctx.Param("id")
	ID, err := strconv.ParseUint(tempID, 0, 0)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, consts.InvalidID)
		return
	}

	_, err = userController.userService.GetUserService(uint(ID))
	if err != nil {
		ctx.JSON(http.StatusBadRequest, &types.CustomError{
			Message: err.Error(),
		})
		return
	}

	if err := userController.userService.DeleteUserService(uint(ID)); err != nil {
		ctx.JSON(http.StatusInternalServerError, &types.CustomError{
			Message: err.Error(),
		})
		return
	}

	ctx.JSON(http.StatusOK, "User has been successfully deleted")
}

func (userController *UserController) UpdateUser(ctx *gin.Context) {
	var user = &models.User{}
	if err := ctx.Bind(user); err != nil {
		ctx.JSON(http.StatusBadRequest, consts.BadRequest)
		return
	}
	id := ctx.Param("id")
	userID, err := strconv.Atoi(id)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, consts.InvalidID)
		return
	}
	oldres, err := userController.userService.GetUserService(uint(userID))
	if err != nil {
		ctx.JSON(http.StatusOK, &types.CustomError{
			Message: err.Error(),
		})
		return
	}
	user.ID = uint(userID)

	checkedUser := UpdateUserField(user, oldres)
	res, err := userController.userService.UpdateUserService(checkedUser)
	if err != nil || res == nil {
		ctx.JSON(http.StatusInternalServerError, &types.CustomError{
			Message: err.Error(),
		})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{"message": "The update was completed successfully.", "update_user": res})
}

func HashPassword(password string) string {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), 10)
	if err != nil {
		log.Panic(err)
	}
	return string(bytes)
}

func VerifyPassword(userPassword string, providedPassword string) (bool, string) {
	err := bcrypt.CompareHashAndPassword([]byte(providedPassword), []byte(userPassword))
	check := true
	msg := ""
	if err != nil {
		msg = "email or password is incorrect"
		check = false
	}
	return check, msg
}

func UpdateUserField(user *models.User, old_user []models.User) *models.User {
	if user.FirstName == "" {
		user.FirstName = old_user[0].FirstName
	}
	if user.LastName == "" {
		user.LastName = old_user[0].LastName
	}
	if user.UserType == "" {
		user.UserType = old_user[0].UserType
	}
	if user.Password == "" {
		user.Password = old_user[0].Password
	}
	if user.Phone == "" {
		user.Phone = old_user[0].Phone
	}
	if user.UserName == "" {
		user.UserName = old_user[0].UserName
	}
	if user.Email == "" {
		user.Email = old_user[0].Email
	}
	if user.CreatedAt.Equal(time.Time{}) {
		user.CreatedAt = old_user[0].CreatedAt
	}
	user.UpdatedAt = time.Now()
	return user
}
