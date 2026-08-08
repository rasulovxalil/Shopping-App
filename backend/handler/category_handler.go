package handler

import (
	"net/http"
	"backend/models"
	"backend/repository"

	"github.com/labstack/echo/v4"
)

type CategoryHandler struct {
	repo repository.CategoryRepository
}

func NewCategoryHandler(repo repository.CategoryRepository) *CategoryHandler {
	return &CategoryHandler{repo: repo}
}

func (h *CategoryHandler) GetCategories(c echo.Context) error {
	categories, err := h.repo.GetAllCategories()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{
			"error": "Failed to fetch categories: " + err.Error(),
		})
	}
	if categories == nil {
		categories = make([]models.Category, 0)
	}
	return c.JSON(http.StatusOK, categories)
}

func (h *CategoryHandler) GetSubCategories(c echo.Context) error {
	subCategories, err := h.repo.GetSubCategories()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{
			"error": "Failed to fetch sub-categories: " + err.Error(),
		})
	}
	if subCategories == nil {
		subCategories = make([]models.SubCategory, 0)
	}
	return c.JSON(http.StatusOK, subCategories)
}