package main

import (
	"go-blog/pkg/containers"

	"github.com/gin-gonic/gin"
)

func main() {
	router := gin.Default()
	containers.Init(router)
}
