package controllers

import (
	domain "go-blog/pkg/domains"
	"go-blog/pkg/types"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type BlogController struct {
	blogService domain.IBlogService
}

func SetBlogController(blogService *domain.IBlogService) *BlogController {
	return &BlogController{
		blogService: *blogService,
	}
}

func (b *BlogController) CreateBlog(ctx *gin.Context) {
	userID, exists := ctx.Get("user_id")
	if !exists {
		ctx.JSON(http.StatusUnauthorized, gin.H{"error": "User ID not found"})
		return
	}
	newBlog := &types.ControlBlog{}
	newBlog.UserID = userID.(uint)
	if err := ctx.ShouldBindJSON(newBlog); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	if err := newBlog.Validate(); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}
	blog, err := b.blogService.CreateBlog(newBlog)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to create post"})
		return
	}
	ctx.JSON(http.StatusCreated, gin.H{"message": "Post created successfully", "id": blog.ID})
}

func (b *BlogController) GetAnyBlog(ctx *gin.Context) {
	blogId, err := strconv.Atoi(ctx.DefaultQuery("blog_id", "0"))
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid blog_id"})
		return
	}
	userId, err := strconv.Atoi(ctx.DefaultQuery("user_id", "0"))
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid user_id"})
		return
	}

	page, err := strconv.Atoi(ctx.DefaultQuery("page", "1"))
	if err != nil || page < 1 {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid page"})
		return
	}

	limit, err := strconv.Atoi(ctx.DefaultQuery("limit", "10"))
	if err != nil || limit < 1 {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid limit"})
		return
	}

	blogs, totalCount, err := b.blogService.GetBlogs(blogId, userId, page, limit)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch blogs"})
		return
	}

	if len(blogs) == 0 {
		ctx.JSON(http.StatusOK, gin.H{"message": "No posts found"})
		return
	}
	totalPage := (totalCount + 10 - 1) / 10

	ctx.JSON(http.StatusOK, gin.H{
		"current_page": page,
		"total_pages":  totalPage,
		"total_count":  totalCount,
		"blogs":        blogs,
	})
}

func (b *BlogController) BlogView(ctx *gin.Context) {
	id, err := strconv.Atoi(ctx.Param("id"))
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid blog_id"})
		return
	}

	blog, err := b.blogService.BlogView(id)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch blog"})
		return
	}

	ctx.JSON(http.StatusOK, blog)
}

func (b *BlogController) GetBlogListByUserName(ctx *gin.Context) {
	username := ctx.Param("username")

	page, err := strconv.Atoi(ctx.DefaultQuery("page", "1"))
	if err != nil || page < 1 {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid page"})
		return
	}

	limit, err := strconv.Atoi(ctx.DefaultQuery("limit", "10")) 
	if err != nil || limit < 1 {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid limit"})
		return
	}
	blogs, err := b.blogService.GetBlogListByUserName(username, page, limit)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch blogs"})
		return
	}

	if len(blogs) == 0 {
		ctx.JSON(http.StatusOK, gin.H{"message": "No posts found by this author"})
		return
	}

	ctx.JSON(http.StatusOK, blogs)
}

func (b *BlogController) BlogSearch(ctx *gin.Context) {
	query := ctx.Param("query")

	blogs, err := b.blogService.BlogSearch(query)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to fetch blogs"})
		return
	}

	if len(blogs) == 0 {
		ctx.JSON(http.StatusOK, gin.H{"message": "No posts found matching the query"})
		return
	}

	ctx.JSON(http.StatusOK, blogs)
}

func (b *BlogController) UpdateBlog(ctx *gin.Context) {
	id, err := strconv.Atoi(ctx.Param("id"))
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid blog_id"})
		return
	}
	userID, exists := ctx.Get("user_id")
	if !exists {
		ctx.JSON(http.StatusUnauthorized, gin.H{"error": "User ID not found"})
		return
	}
	updatedBlog := &types.ControlBlog{}
	updatedBlog.UserID = userID.(uint)
	if err := ctx.ShouldBindJSON(updatedBlog); err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid input"})
		return
	}

	updatedBlogs, err := b.blogService.UpdateBlog(updatedBlog, id)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to update post"})
		return
	}
	ctx.JSON(http.StatusOK, updatedBlogs)

}

func (b *BlogController) DeleteBlog(ctx *gin.Context) {
	id, err := strconv.Atoi(ctx.Param("id"))
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{"error": "Invalid blog_id"})
		return
	}
	userID, exists := ctx.Get("user_id")
	if !exists {
		ctx.JSON(http.StatusUnauthorized, gin.H{"error": "User ID not found"})
		return
	}

	err = b.blogService.DeleteBlog(uint(id), userID.(uint))
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to delete post"})
		return
	}
	ctx.JSON(http.StatusOK, gin.H{"message": "Post deleted successfully"})
}
