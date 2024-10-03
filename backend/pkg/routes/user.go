package routes

import (
	"go-blog/pkg/controllers"
	"go-blog/pkg/middleware"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
)

func UserRoutes(router *gin.Engine, userController *controllers.UserController) {
	router.Use(cors.New(cors.Config{
		AllowAllOrigins: true,
		AllowMethods:    []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:    []string{"Origin", "Content-Type", "Authorization"},
	}))
	app := router.Group("/app")
	{
		app.POST("/registration", userController.Registration)
		app.POST("/login", userController.Login)
	}

	user := router.Group("/user")
	user.Use(middleware.Authentication)
	{
		admin := user.Group("/users")
		admin.Use(middleware.IsAdmin)
		{
			admin.GET("/", userController.GetUsers)
			admin.DELETE("/:id", userController.DeleteUser)
		}
		user.PUT("/:id", userController.UpdateUser)
		user.GET("/", userController.GetProfile)
		user.GET("/profile/:id", userController.GetByUserName)
	}
}
