package handler

import (
	"database/sql"
	"net/http"
	"strconv"

	"backend/models"
	"backend/repository"

	"github.com/labstack/echo/v4"
)

type CartHandler struct {
	repo repository.CartRepository
}

func NewCartHandler(repo repository.CartRepository) *CartHandler {
	return &CartHandler{repo: repo}
}

// GET /api/cart/:userId
func (h *CartHandler) GetCart(c echo.Context) error {
	userID, err := strconv.Atoi(c.Param("userId"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, echo.Map{"error": "Invalid user ID"})
	}

	items, err := h.repo.GetCartItems(userID)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, echo.Map{"error": "Failed to fetch cart"})
	}
	if items == nil {
		items = []models.CartItemView{}
	}

	return c.JSON(http.StatusOK, items)
}

// POST /api/cart/:userId
func (h *CartHandler) AddItem(c echo.Context) error {
	userID, err := strconv.Atoi(c.Param("userId"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, echo.Map{"error": "Invalid user ID"})
	}

	var req models.AddCartItemRequest
	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, echo.Map{"error": "Invalid request payload"})
	}
	if req.ProductID <= 0 {
		return c.JSON(http.StatusBadRequest, echo.Map{"error": "productId is required"})
	}
	if req.Quantity <= 0 {
		req.Quantity = 1
	}

	if err := h.repo.AddItem(userID, req.ProductID, req.Quantity); err != nil {
		return c.JSON(http.StatusInternalServerError, echo.Map{"error": "Failed to add item to cart"})
	}

	return h.respondWithCart(c, userID)
}

// PUT /api/cart/:userId/:productId
func (h *CartHandler) UpdateItem(c echo.Context) error {
	userID, err := strconv.Atoi(c.Param("userId"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, echo.Map{"error": "Invalid user ID"})
	}
	productID, err := strconv.Atoi(c.Param("productId"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, echo.Map{"error": "Invalid product ID"})
	}

	var req models.UpdateCartItemRequest
	if err := c.Bind(&req); err != nil {
		return c.JSON(http.StatusBadRequest, echo.Map{"error": "Invalid request payload"})
	}
	if req.Quantity <= 0 {
		return c.JSON(http.StatusBadRequest, echo.Map{"error": "Quantity must be positive"})
	}

	if err := h.repo.UpdateQuantity(userID, productID, req.Quantity); err != nil {
		if err == sql.ErrNoRows {
			return c.JSON(http.StatusNotFound, echo.Map{"error": "Cart item not found"})
		}
		return c.JSON(http.StatusInternalServerError, echo.Map{"error": "Failed to update cart item"})
	}

	return h.respondWithCart(c, userID)
}

// DELETE /api/cart/:userId/:productId
func (h *CartHandler) RemoveItem(c echo.Context) error {
	userID, err := strconv.Atoi(c.Param("userId"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, echo.Map{"error": "Invalid user ID"})
	}
	productID, err := strconv.Atoi(c.Param("productId"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, echo.Map{"error": "Invalid product ID"})
	}

	if err := h.repo.RemoveItem(userID, productID); err != nil {
		if err == sql.ErrNoRows {
			return c.JSON(http.StatusNotFound, echo.Map{"error": "Cart item not found"})
		}
		return c.JSON(http.StatusInternalServerError, echo.Map{"error": "Failed to remove cart item"})
	}

	return c.NoContent(http.StatusNoContent)
}

// DELETE /api/cart/:userId
func (h *CartHandler) ClearCart(c echo.Context) error {
	userID, err := strconv.Atoi(c.Param("userId"))
	if err != nil {
		return c.JSON(http.StatusBadRequest, echo.Map{"error": "Invalid user ID"})
	}

	if err := h.repo.ClearCart(userID); err != nil {
		return c.JSON(http.StatusInternalServerError, echo.Map{"error": "Failed to clear cart"})
	}

	return c.NoContent(http.StatusNoContent)
}

func (h *CartHandler) respondWithCart(c echo.Context, userID int) error {
	items, err := h.repo.GetCartItems(userID)
	if err != nil {
		return c.JSON(http.StatusInternalServerError, echo.Map{"error": "Failed to fetch cart"})
	}
	if items == nil {
		items = []models.CartItemView{}
	}
	return c.JSON(http.StatusOK, items)
}
