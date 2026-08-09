package handler

import (
	"database/sql"
	"net/http"
	"backend/models"
	"backend/repository"

	"github.com/labstack/echo/v4"
)

type UserHandler struct {
	repo repository.UserRepository
}

func NewUserHandler(repo repository.UserRepository) *UserHandler {
	return &UserHandler{repo: repo}
}

// GetUsers handles request to fetch all users
func (h *UserHandler) GetUsers(c echo.Context) error {
	users, err := h.repo.GetAllUsers()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{
			"error": "Failed to fetch users: " + err.Error(),
		})
	}
	if users == nil {
		users = make([]models.User, 0)
	}

	return c.JSON(http.StatusOK, users)
}

// GetUserByID handles request to fetch a single user by ID
func (h *UserHandler) GetUserByID(c echo.Context) error {
	id := c.Param("id")

	user, err := h.repo.GetUserByID(id)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{
			"error": "An error occurred: " + err.Error(),
		})
	}
	if user == nil {
		return c.JSON(http.StatusNotFound, map[string]string{
			"message": "User not found",
		})
	}

	return c.JSON(http.StatusOK, user)
}

// CreateUser handles request to register a new user
func (h *UserHandler) CreateUser(c echo.Context) error {
	var req models.CreateUserRequest

	// Bind incoming JSON body to request struct
	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{
			"error": "Invalid request payload",
		})
	}

	// Simple validation
	if req.Email == "" || req.Password == "" {
		return c.JSON(http.StatusBadRequest, map[string]string{
			"error": "Email and password are required",
		})
	}

	newUser := models.User{
		Email:    req.Email,
		Password: req.Password,
	}

	if err := h.repo.CreateUser(&newUser); err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{
			"error": "Failed to create user: " + err.Error(),
		})
	}

	return c.JSON(http.StatusCreated, map[string]interface{}{
		"message": "User created successfully",
		"user": map[string]string{
			"id":    newUser.ID,
			"email": newUser.Email,
		},
	})
}

// Login verifies email/password against the stored user record.
// Note: passwords are compared as plain text here because they are stored
// as plain text throughout this project (no hashing anywhere yet).
func (h *UserHandler) Login(c echo.Context) error {
	var req models.LoginRequest
	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{
			"error": "Invalid request payload",
		})
	}

	if req.Email == "" || req.Password == "" {
		return c.JSON(http.StatusBadRequest, map[string]string{
			"error": "Email and password are required",
		})
	}

	user, err := h.repo.GetUserByEmail(req.Email)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{
			"error": "An error occurred: " + err.Error(),
		})
	}

	if user == nil || user.Password != req.Password {
		return c.JSON(http.StatusUnauthorized, map[string]string{
			"error": "Invalid email or password",
		})
	}

	return c.JSON(http.StatusOK, map[string]string{
		"id":    user.ID,
		"email": user.Email,
	})
}

// UpdateUser handles request to update an existing user's email/password
func (h *UserHandler) UpdateUser(c echo.Context) error {
	id := c.Param("id")

	var req models.UpdateUserRequest
	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{
			"error": "Invalid request payload",
		})
	}

	if req.Email == "" {
		return c.JSON(http.StatusBadRequest, map[string]string{
			"error": "Email is required",
		})
	}

	if err := h.repo.UpdateUser(id, req.Email, req.Password); err != nil {
		if err == sql.ErrNoRows {
			return c.JSON(http.StatusNotFound, map[string]string{
				"message": "User not found",
			})
		}
		return c.JSON(http.StatusInternalServerError, map[string]string{
			"error": "Failed to update user: " + err.Error(),
		})
	}

	return c.JSON(http.StatusOK, map[string]string{
		"id":    id,
		"email": req.Email,
	})
}

// DeleteUser handles request to remove a user
func (h *UserHandler) DeleteUser(c echo.Context) error {
	id := c.Param("id")

	if err := h.repo.DeleteUser(id); err != nil {
		if err == sql.ErrNoRows {
			return c.JSON(http.StatusNotFound, map[string]string{
				"message": "User not found",
			})
		}
		return c.JSON(http.StatusInternalServerError, map[string]string{
			"error": "Failed to delete user: " + err.Error(),
		})
	}

	return c.NoContent(http.StatusNoContent)
}