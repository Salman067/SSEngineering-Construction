package connection

import (
	"fmt"
	"go-blog/pkg/models"
	"go-blog/pkg/utils"
	"time"

	"gorm.io/driver/mysql"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

var (
	db *gorm.DB
)

func DBConnect() {
	config := utils.LocalConfig

	dsn := fmt.Sprintf("%s:%s@tcp(%s)/%s?charset=utf8mb4&parseTime=True&loc=Local",
		config.DBUser, config.DBPass, config.DBIP, config.DbName)

	var err error
	maxRetries := 5
	for i := 0; i < maxRetries; i++ {
		db, err = gorm.Open(mysql.Open(dsn), &gorm.Config{
			Logger: logger.Default.LogMode(logger.Info),
		})
		if err == nil {
			break
		}
		fmt.Printf("Failed to connect to database. Retrying in 5 seconds... (Attempt %d/%d)\n", i+1, maxRetries)
		time.Sleep(1 * time.Second)
	}

	if err != nil {
		panic(fmt.Sprintf("Failed to connect to database after %d attempts: %v", maxRetries, err))
	}
	fmt.Println("Successfully connected to the database")
}

func GetDB() *gorm.DB {
	if db == nil {
		DBConnect()
	}
	Migrate()
	// DropDatabase()
	return db
}

func DropDatabase() {
	db.Migrator().DropTable(&models.Blog{})
	db.Migrator().DropTable(&models.User{})
}

func Migrate() {
	db.Migrator().AutoMigrate(&models.User{})
	db.Migrator().AutoMigrate(&models.Blog{})
}
