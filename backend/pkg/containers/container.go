package containers

import (
	"go-blog/pkg/connection"
	"go-blog/pkg/controllers"
	"go-blog/pkg/repositories"
	"go-blog/pkg/routes"
	"go-blog/pkg/services"
	"go-blog/pkg/utils"
	"log"

	"github.com/gin-gonic/gin"
)

func Init(router *gin.Engine) {
	utils.SetConfig()
	db := connection.GetDB()
	/* User */
	userRepo := repositories.UserDBInterface(db)
	userService := services.UserServiceInstance(userRepo)
	userController := controllers.SetUserController(&userService)

	/* Blog */
	blogRepo := repositories.BlogDBInstance(db)
	blogService := services.BlogServiceInstance(blogRepo, userRepo)
	blogController := controllers.SetBlogController(&blogService)

	// Set up routes
	routes.UserRoutes(router, userController)
	routes.BlogRoutes(router, blogController)

	router.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{"message": "Hello, World!"})
	})
	// Start the Gin server
	log.Fatal(router.Run(":8080"))
}
