package auth

import (
	"go-blog/pkg/types"
	"go-blog/pkg/utils"
	"time"

	"github.com/dgrijalva/jwt-go"
)

func GenerateAllTokens(email, userType string, userID uint) (signedToken string, signedRefreshToken string, err error) {
	claims := &types.SignedDetails{
		Email:    email,
		UserType: userType,
		UserID:   userID,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: time.Now().Local().Add(time.Minute * time.Duration(30)).Unix(),
		},
	}
	refreshClaims := &types.SignedDetails{
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: time.Now().Local().Add(time.Hour * time.Duration(1)).Unix(),
		},
	}
	token, err := jwt.NewWithClaims(jwt.SigningMethodHS256, claims).SignedString([]byte(utils.LocalConfig.SECRETKEY))
	if err != nil {
		return token, "", err
	}
	refreshToken, err := jwt.NewWithClaims(jwt.SigningMethodHS256, refreshClaims).SignedString([]byte(utils.LocalConfig.SECRETKEY))

	if err != nil {
		return token, refreshToken, err
	}
	return token, refreshToken, nil
}

func ValidateToken(userToken string) (*types.SignedDetails, error) {
	claims := &types.SignedDetails{}
	token, err := jwt.ParseWithClaims(userToken, claims, func(token *jwt.Token) (interface{}, error) {
		return []byte(utils.LocalConfig.SECRETKEY), nil
	})
	if err != nil {
		return nil, err
	}

	if !token.Valid {
		return nil, err
	}
	return claims, nil
}
