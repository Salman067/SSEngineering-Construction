package domain

import (
	"go-blog/pkg/models"
	"go-blog/pkg/types"
)

type IBlogRepo interface {
	CreateBlog(post *models.Blog) (*models.Blog, error)
	GetAnyBlog(postId, userId, page, limit int) ([]*models.Blog, error)
	CountBlogs(postId, userId int) (int, error)
	FindBy(field string, value any) (*models.Blog, error)
	BlogSearch(query string) ([]*models.Blog, error)
	DeleteBlog(postId uint) error
	UpdateBlog(blog *models.Blog) (*models.Blog, error)
}

type IBlogService interface {
	CreateBlog(newBlog *types.ControlBlog) (*models.Blog, error)
	GetBlogs(postId, userId, page, limit int) ([]*types.CustomBlogResponse, int, error)
	BlogView(postId int) (*types.CustomBlogResponse, error)
	BlogSearch(query string) ([]*types.CustomBlogResponse, error)
	GetBlogListByUserName(userName string, page, limit int) ([]*types.CustomBlogResponse, error)
	UpdateBlog(newBlog *types.ControlBlog, id int) (*models.Blog, error)
	DeleteBlog(blogId, userId uint) error
}
