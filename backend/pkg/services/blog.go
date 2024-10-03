package services

import (
	"errors"
	domain "go-blog/pkg/domains"
	"go-blog/pkg/models"
	"go-blog/pkg/types"
	"log"
	"time"
)

type BlogService struct {
	bRepo domain.IBlogRepo
	uRepo domain.UserRepoInterface
}

func BlogServiceInstance(blogRepo domain.IBlogRepo, uRepo domain.UserRepoInterface) domain.IBlogService {
	return &BlogService{
		bRepo: blogRepo,
		uRepo: uRepo,
	}
}

func (b *BlogService) CreateBlog(newBlog *types.ControlBlog) (*models.Blog, error) {
	_, err := b.uRepo.FindBy("id", newBlog.UserID)
	if err != nil {
		return nil, errors.New("User not found")
	}
	post := &models.Blog{
		Title:   newBlog.Title,
		Content: newBlog.Content,
		UserID:  newBlog.UserID,
	}
	blog, createErr := b.bRepo.CreateBlog(post)
	if createErr != nil {
		return nil, createErr
	}
	return blog, nil
}

func (b *BlogService) GetBlogs(postId, userId, page, limit int) ([]*types.CustomBlogResponse, int, error) {
	totalCount, err := b.bRepo.CountBlogs(postId, userId)
	if err != nil {
		return nil, 0, err
	}

	blogList, err := b.bRepo.GetAnyBlog(postId, userId, page, limit)
	if err != nil {
		return nil, 0, err
	}

	users, err := b.uRepo.GetUsers(0)
	if err != nil {
		log.Fatal("Error getting users")
		return nil, 0, err
	}

	userMap := make(map[uint]string)
	for _, val := range users {
		userMap[val.ID] = val.UserName
	}
	var finalList []*types.CustomBlogResponse
	for _, val := range blogList {
		userNmae, ok := userMap[val.UserID]
		if !ok {
			return nil, 0, errors.New("User not found")
		}
	
		finalList = append(finalList, &types.CustomBlogResponse{
			ID:        val.ID,
			Title:     val.Title,
			Content:   val.Content,
			CreatedAt: val.CreatedAt,
			UpdatedAt: val.UpdatedAt,
			UserID:    val.UserID,
			UserName:  userNmae,
		})
	}
	return finalList, totalCount, nil
}

func (b *BlogService) BlogView(postId int) (*types.CustomBlogResponse, error) {
	blog, err := b.bRepo.FindBy("id", postId)
	if err != nil {
		return nil, err
	}

	user, err := b.uRepo.FindBy("id", blog.UserID)
	if err != nil {
		return nil, errors.New("User not found")
	}

	userName := user.UserName
	return &types.CustomBlogResponse{
		ID:        blog.ID,
		Title:     blog.Title,
		Content:   blog.Content,
		CreatedAt: blog.CreatedAt,
		UpdatedAt: blog.UpdatedAt,
		UserID:    blog.UserID,
		UserName:  userName,
	}, nil
}

func (b *BlogService) BlogSearch(query string) ([]*types.CustomBlogResponse, error) {
	blog, err := b.bRepo.BlogSearch(query)
	if err != nil {
		return nil, err
	}
	users, err := b.uRepo.GetUsers(0)
	if err != nil {
		log.Fatal("Error getting users")
		return nil, err
	}

	userMap := make(map[uint]string)
	for _, val := range users {
		userMap[val.ID] = val.UserName
	}
	var finalList []*types.CustomBlogResponse
	for _, val := range blog {
		userNmae, ok := userMap[val.UserID]
		if !ok {
			return nil, errors.New("User not found")
		}

		finalList = append(finalList, &types.CustomBlogResponse{
			ID:        val.ID,
			Title:     val.Title,
			Content:   val.Content,
			CreatedAt: val.CreatedAt,
			UpdatedAt: val.UpdatedAt,
			UserID:    val.UserID,
			UserName:  userNmae,
		})
	}
	return finalList, nil
}
func (b *BlogService) GetBlogListByUserName(userName string, page, limit int) ([]*types.CustomBlogResponse, error) {
	user, err := b.uRepo.GetByUserName(userName)
	if err != nil {
		return nil, errors.New("User not found")
	}

	blogList, err := b.bRepo.GetAnyBlog(0, int(user.ID), page, limit)
	if err != nil {
		return nil, err
	}

	users, err := b.uRepo.GetUsers(0)
	if err != nil {
		log.Fatal("Error getting users")
		return nil, err
	}

	userMap := make(map[uint]*models.User)
	for _, val := range users {
		userMap[val.ID] = &val
	}

	var finalList []*types.CustomBlogResponse
	for _, val := range blogList {
		user, ok := userMap[val.UserID]
		if !ok {
			return nil, errors.New("User not found")
		}
		userName := user.FirstName + " " + user.LastName
		finalList = append(finalList, &types.CustomBlogResponse{
			ID:        val.ID,
			Title:     val.Title,
			Content:   val.Content,
			CreatedAt: val.CreatedAt,
			UpdatedAt: val.UpdatedAt,
			UserID:    val.UserID,
			UserName:  userName,
		})
	}
	return finalList, nil
}

func (b *BlogService) UpdateBlog(newBlog *types.ControlBlog, id int) (*models.Blog, error) {
	blog, err := b.bRepo.FindBy("id", id)
	if err != nil {
		return nil, errors.New("Blog not found")
	}
	if blog.UserID != newBlog.UserID {
		return nil, errors.New("User ID does not match")
	}
	blog.Title = newBlog.Title
	blog.Content = newBlog.Content
	blog.UpdatedAt = time.Now()
	updatedBlog, updateErr := b.bRepo.UpdateBlog(blog)
	if updateErr != nil {
		return nil, updateErr
	}
	return updatedBlog, nil
}

func (b *BlogService) DeleteBlog(blogId, userId uint) error {
	blog, err := b.bRepo.FindBy("id", int(blogId))
	if err != nil {
		return errors.New("Blog not found")
	}
	if blog.UserID != userId {
		return errors.New("User ID does not match")
	}
	deleteErr := b.bRepo.DeleteBlog(blogId)
	if deleteErr != nil {
		return deleteErr
	}
	return nil
}
