package handler

import (
	"net/http"
	"backend/models"
	"backend/repository"

	"github.com/labstack/echo/v4"
)

type AboutUsHandler struct {
	repo repository.AboutUsRepository
}

func NewAboutUsHandler(repo repository.AboutUsRepository) *AboutUsHandler {
	return &AboutUsHandler{repo: repo}
}

// GetAll fetches and returns all AboutUs records or filter by query param slug
// GET /api/about-us or /api/aboutus
func (h *AboutUsHandler) GetAll(c echo.Context) error {
	slug := c.QueryParam("slug")
	if slug != "" {
		data, err := h.repo.GetBySlug(slug)
		if err != nil {
			return c.JSON(http.StatusInternalServerError, echo.Map{
				"error": "Failed to retrieve record: " + err.Error(),
			})
		}
		if data == nil {
			return c.JSON(http.StatusNotFound, echo.Map{
				"error": "Requested resource not found",
			})
		}
		return c.JSON(http.StatusOK, data)
	}

	data, err := h.repo.GetAll()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, echo.Map{
			"error": "Failed to retrieve records: " + err.Error(),
		})
	}

	if data == nil {
		data = make([]models.AboutUs, 0)
	}

	return c.JSON(http.StatusOK, data)
}

// GetBySlug fetches and returns a single AboutUs record by its slug
// GET /api/about-us/:slug or /api/aboutus/:slug
func (h *AboutUsHandler) GetBySlug(c echo.Context) error {
	slug := c.Param("slug")
	if slug == "" {
		slug = c.QueryParam("slug")
	}
	if slug == "" {
		return c.JSON(http.StatusBadRequest, echo.Map{
			"error": "Slug parameter is required",
		})
	}

	data, err := h.repo.GetBySlug(slug)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, echo.Map{
			"error": "Failed to retrieve record: " + err.Error(),
		})
	}

	if data == nil {
		return c.JSON(http.StatusNotFound, echo.Map{
			"error": "Requested resource not found",
		})
	}

	return c.JSON(http.StatusOK, data)
}