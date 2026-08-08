package handler

import (
	"net/http"
	"strconv"

	"backend/models"
	"backend/repository"

	"github.com/labstack/echo/v4"
)

type ProductHandler struct {
	repo repository.ProductRepository
}

func NewProductHandler(repo repository.ProductRepository) *ProductHandler {
	return &ProductHandler{repo: repo}
}

// GET /api/products
func (h *ProductHandler) GetAll(c echo.Context) error {
	products, err := h.repo.GetAll()
	if err != nil {
		return c.JSON(http.StatusInternalServerError, echo.Map{"error": "Failed to fetch products"})
	}

	if products == nil {
		products = []models.Product{} // return [] instead of null
	}

	return c.JSON(http.StatusOK, products)
}

// GET /api/products/:id
func (h *ProductHandler) GetByID(c echo.Context) error {
	idParam := c.Param("id")
	id, err := strconv.Atoi(idParam)
	if err != nil {
		return c.JSON(http.StatusBadRequest, echo.Map{"error": "Invalid product ID"})
	}

	product, err := h.repo.GetByID(id)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, echo.Map{"error": "Failed to fetch product"})
	}
	if product == nil {
		return c.JSON(http.StatusNotFound, echo.Map{"error": "Product not found"})
	}

	return c.JSON(http.StatusOK, product)
}

// POST /api/products
func (h *ProductHandler) Create(c echo.Context) error {
	var req models.Product
	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, echo.Map{"error": "Invalid request payload"})
	}

	if req.Name == "" || req.Price <= 0 {
		return c.JSON(http.StatusBadRequest, echo.Map{"error": "Product name and positive price are required"})
	}

	if err := h.repo.Create(&req); err != nil {
		return c.JSON(http.StatusInternalServerError, echo.Map{"error": "Failed to create product"})
	}

	return c.JSON(http.StatusCreated, req)
}