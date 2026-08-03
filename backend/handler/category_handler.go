package handler

import (
	"net/http"
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
	return c.JSON(http.StatusOK, map[string]interface{}{
		"categories": categories,
	})
}

func (h *CategoryHandler) GetSubCategories(c echo.Context) error {
	subCategories, err := h.repo.GetSubCategories()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, map[string]string{
			"error": "Failed to fetch sub-categories: " + err.Error(),
		})
	}
	return c.JSON(http.StatusOK, map[string]interface{}{
		"subCategories": subCategories,
	})
}