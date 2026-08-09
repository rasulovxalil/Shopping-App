package models

// CartItemView is a cart row joined with its product details, shaped for API responses.
type CartItemView struct {
	ProductID int      `json:"productId"`
	Name      string   `json:"name"`
	Brand     string   `json:"brand"`
	Price     float64  `json:"price"`
	Images    []string `json:"images"`
	Quantity  int      `json:"quantity"`
}

type AddCartItemRequest struct {
	ProductID int `json:"productId"`
	Quantity  int `json:"quantity"`
}

type UpdateCartItemRequest struct {
	Quantity int `json:"quantity"`
}
