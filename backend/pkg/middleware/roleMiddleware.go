package middleware

import (
	"go-blog/pkg/utils"
	"net/http"
	"strings"

	"github.com/dgrijalva/jwt-go"
	"github.com/gin-gonic/gin"
)

func IsAdmin(c *gin.Context) {
	hToken := c.GetHeader("Authorization")
	if hToken == "" {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Authorization header missing"})
		c.Abort()
		return
	}
	splitToken := strings.Split(hToken, " ")
	if len(splitToken) != 2 {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Invalid authorization token"})
		c.Abort()
		return
	}
	token := splitToken[1]
	claims := jwt.MapClaims{}
	_, err := jwt.ParseWithClaims(token, claims, func(token *jwt.Token) (interface{}, error) {
		return []byte(utils.LocalConfig.SECRETKEY), nil
	})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Unable to parse token"})
		c.Abort()
		return
	}
	if claims["UserType"] != "admin" {
		c.JSON(http.StatusForbidden, gin.H{"error": "Only admin can access"})
		c.Abort()
		return
	}
	c.Next()
}
