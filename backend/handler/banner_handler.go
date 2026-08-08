package handler

import (
	"net/http"
	"strconv"
	"backend/models"
	"backend/repository"

	"github.com/labstack/echo/v4"
)

// BannerHandler handles HTTP requests related to banners
type BannerHandler struct {
	repo repository.BannerRepository
}

// NewBannerHandler initializes and returns a BannerHandler
func NewBannerHandler(repo repository.BannerRepository) *BannerHandler {
	return &BannerHandler{repo: repo}
}

// GetAll handles GET /api/banners request
func (h *BannerHandler) GetAll(c echo.Context) error {
	banners, err := h.repo.GetAll()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, echo.Map{
			"error": "Failed to fetch banners: " + err.Error(),
		})
	}

	if banners == nil {
		banners = make([]models.Banner, 0)
	}

	return c.JSON(http.StatusOK, banners)
}

// GetByID handles GET /api/banners/:id request
func (h *BannerHandler) GetByID(c echo.Context) error {
	id, err := strconv.Atoi(c.Param("id"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, echo.Map{
			"error": "Invalid banner ID parameter",
		})
	}

	banner, err := h.repo.GetByID(id)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, echo.Map{
			"error": "Failed to fetch banner: " + err.Error(),
		})
	}

	if banner == nil {
		return c.JSON(http.StatusNotFound, echo.Map{
			"error": "Banner not found",
		})
	}

	return c.JSON(http.StatusOK, banner)
}