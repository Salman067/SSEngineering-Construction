package middleware

import (
	"go-blog/pkg/auth"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
)

func Authentication(c *gin.Context) {
	authToken := c.GetHeader("Authorization")
	splitToken := strings.Split(authToken, "Bearer ")
	if len(splitToken) != 2 {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "User unauthorized"})
		c.Abort()
		return
	}
	reqToken := splitToken[1]
	if reqToken == "" {
		c.JSON(http.StatusInternalServerError, gin.H{"error": "Failed to get your token"})
		c.Abort()
		return
	}
	claims, err := auth.ValidateToken(reqToken)
	if err != nil {
		c.JSON(http.StatusUnauthorized, gin.H{"error": "Please Login..."})
		c.Abort()
		return
	}
	c.Set("user_id", claims.UserID)
	c.Next()
}
