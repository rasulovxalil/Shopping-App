package repository

import (
	"database/sql"

	"backend/models"

	"github.com/lib/pq"
)

type CartRepository interface {
	GetCartItems(userID int) ([]models.CartItemView, error)
	AddItem(userID, productID, quantity int) error
	UpdateQuantity(userID, productID, quantity int) error
	RemoveItem(userID, productID int) error
	ClearCart(userID int) error
}

type cartRepository struct {
	db *sql.DB
}

func NewCartRepository(db *sql.DB) CartRepository {
	return &cartRepository{db: db}
}

func (r *cartRepository) GetCartItems(userID int) ([]models.CartItemView, error) {
	query := `
		SELECT p.id, p.name, p.brand, p.price, p.images, c.quantity
		FROM cart_items c
		JOIN products p ON p.id = c.product_id
		WHERE c.user_id = $1
		ORDER BY c.id ASC`

	rows, err := r.db.Query(query, userID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var items []models.CartItemView
	for rows.Next() {
		var item models.CartItemView
		if err := rows.Scan(&item.ProductID, &item.Name, &item.Brand, &item.Price, pq.Array(&item.Images), &item.Quantity); err != nil {
			return nil, err
		}
		items = append(items, item)
	}

	return items, rows.Err()
}

// AddItem inserts a new cart line, or bumps the quantity if the product is already in the cart.
func (r *cartRepository) AddItem(userID, productID, quantity int) error {
	query := `
		INSERT INTO cart_items (user_id, product_id, quantity)
		VALUES ($1, $2, $3)
		ON CONFLICT (user_id, product_id)
		DO UPDATE SET quantity = cart_items.quantity + EXCLUDED.quantity`
	_, err := r.db.Exec(query, userID, productID, quantity)
	return err
}

func (r *cartRepository) UpdateQuantity(userID, productID, quantity int) error {
	res, err := r.db.Exec(
		`UPDATE cart_items SET quantity = $1 WHERE user_id = $2 AND product_id = $3`,
		quantity, userID, productID,
	)
	if err != nil {
		return err
	}
	rows, err := res.RowsAffected()
	if err != nil {
		return err
	}
	if rows == 0 {
		return sql.ErrNoRows
	}
	return nil
}

func (r *cartRepository) RemoveItem(userID, productID int) error {
	res, err := r.db.Exec(`DELETE FROM cart_items WHERE user_id = $1 AND product_id = $2`, userID, productID)
	if err != nil {
		return err
	}
	rows, err := res.RowsAffected()
	if err != nil {
		return err
	}
	if rows == 0 {
		return sql.ErrNoRows
	}
	return nil
}

func (r *cartRepository) ClearCart(userID int) error {
	_, err := r.db.Exec(`DELETE FROM cart_items WHERE user_id = $1`, userID)
	return err
}
