package repositories

import (
	domain "go-blog/pkg/domains"
	"go-blog/pkg/models"

	"gorm.io/gorm"
)

type BlogRepo struct {
	DB *gorm.DB
}

func BlogDBInstance(db *gorm.DB) domain.IBlogRepo {
	return &BlogRepo{
		DB: db,
	}

}

func (repo *BlogRepo) CreateBlog(post *models.Blog) (*models.Blog, error) {
	err := repo.DB.Create(&post).Error
	if err != nil {
		return nil, err
	}
	return post, nil
}

func (repo *BlogRepo) GetAnyBlog(postId, userId, page, limit int) ([]*models.Blog, error) {
	var blogs []*models.Blog
	offset := (page - 1) * limit
	query := repo.DB.Model(&models.Blog{})

	if postId != 0 {
		query = query.Where("id = ?", postId)
	}

	if userId != 0 {
		query = query.Where("user_id = ?", userId)
	}

	err := query.Order("id DESC").Offset(offset).Limit(limit).Find(&blogs).Error
	if err != nil {
		return nil, err
	}
	return blogs, nil
}

func (repo *BlogRepo) CountBlogs(postId, userId int) (int, error) {
	var count int64
	query := repo.DB.Model(&models.Blog{})

	if postId != 0 {
		query = query.Where("id = ?", postId)
	}
	if userId != 0 {
		query = query.Where("user_id = ?", userId)
	}

	err := query.Count(&count).Error
	if err != nil {
		return 0, err
	}
	return int(count), nil
}

func (repo *BlogRepo) FindBy(field string, value any) (*models.Blog, error) {
	var blog models.Blog
	if err := repo.DB.Where(field+" =?", value).First(&blog).Error; err != nil {
		return nil, err
	}
	return &blog, nil
}

func (repo *BlogRepo) BlogSearch(query string) ([]*models.Blog, error) {
	var blog []*models.Blog
	if err := repo.DB.Model(&models.Blog{}).Where("title LIKE ? OR content LIKE ?", "%"+query+"%", "%"+query+"%").Find(&blog).Error; err != nil {
		return nil, err
	}
	return blog, nil
}

func (repo *BlogRepo) UpdateBlog(blog *models.Blog) (*models.Blog, error) {
	err := repo.DB.Save(blog).Error
	if err != nil {
		return nil, err
	}
	return blog, nil
}

func (repo *BlogRepo) DeleteBlog(postId uint) error {
	var blog models.Blog
	if err := repo.DB.Where("id =?", postId).Delete(&blog).Error; err != nil {
		return err
	}
	return nil
}
