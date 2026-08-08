package handler

import (
	"net/http"
	"strconv"
	"backend/models"
	"backend/repository"

	"github.com/labstack/echo/v4"
)

// BrandHandler handles HTTP requests related to brands
type BrandHandler struct {
	repo repository.BrandRepository
}

// NewBrandHandler initializes and returns a BrandHandler
func NewBrandHandler(repo repository.BrandRepository) *BrandHandler {
	return &BrandHandler{repo: repo}
}

// GetAll handles GET /api/brands request
func (h *BrandHandler) GetAll(c echo.Context) error {
	brands, err := h.repo.GetAll()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, echo.Map{
			"error": "Failed to fetch brands: " + err.Error(),
		})
	}

	if brands == nil {
		brands = make([]models.Brand, 0)
	}

	return c.JSON(http.StatusOK, brands)
}

// GetByID handles GET /api/brands/:id request
func (h *BrandHandler) GetByID(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, echo.Map{
			"error": "Invalid brand ID parameter",
		})
	}

	brand, err := h.repo.GetByID(id)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, echo.Map{
			"error": "Failed to fetch brand: " + err.Error(),
		})
	}

	if brand == nil {
		return c.JSON(http.StatusNotFound, echo.Map{
			"error": "Brand not found",
		})
	}

	return c.JSON(http.StatusOK, brand)
}