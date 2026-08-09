package handler

import (
	"database/sql"
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

// PUT /api/products/:id
func (h *ProductHandler) Update(c echo.Context) error {
	idParam := c.Param("id")
	id, err := strconv.Atoi(idParam)
	if err != nil {
		return c.JSON(http.StatusBadRequest, echo.Map{"error": "Invalid product ID"})
	}

	var req models.Product
	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, echo.Map{"error": "Invalid request payload"})
	}

	if req.Name == "" || req.Price <= 0 {
		return c.JSON(http.StatusBadRequest, echo.Map{"error": "Product name and positive price are required"})
	}
	req.ID = id

	if err := h.repo.Update(id, &req); err != nil {
		if err == sql.ErrNoRows {
			return c.JSON(http.StatusNotFound, echo.Map{"error": "Product not found"})
		}
		return c.JSON(http.StatusInternalServerError, echo.Map{"error": "Failed to update product"})
	}

	return c.JSON(http.StatusOK, req)
}

// DELETE /api/products/:id
func (h *ProductHandler) Delete(c echo.Context) error {
	idParam := c.Param("id")
	id, err := strconv.Atoi(idParam)
	if err != nil {
		return c.JSON(http.StatusBadRequest, echo.Map{"error": "Invalid product ID"})
	}

	if err := h.repo.Delete(id); err != nil {
		if err == sql.ErrNoRows {
			return c.JSON(http.StatusNotFound, echo.Map{"error": "Product not found"})
		}
		return c.JSON(http.StatusInternalServerError, echo.Map{"error": "Failed to delete product"})
	}

	return c.NoContent(http.StatusNoContent)
}