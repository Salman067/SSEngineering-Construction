package routes

import (
	"go-blog/pkg/controllers"
	"go-blog/pkg/middleware"

	"github.com/gin-gonic/gin"
)

func BlogRoutes(router *gin.Engine, blogController *controllers.BlogController) {
	app := router.Group("/app")
	app.GET("/list", blogController.GetAnyBlog)
	app.GET("/author/:username", blogController.GetBlogListByUserName)
	app.GET("/search/:query", blogController.BlogSearch)

	blogPost := router.Group("/blog", middleware.Authentication)
	blogPost.POST("/post", blogController.CreateBlog)
	blogPost.GET("/view/:id", blogController.BlogView)
	blogPost.PUT("/:id", blogController.UpdateBlog)
	blogPost.DELETE("/:id", blogController.DeleteBlog)

}
