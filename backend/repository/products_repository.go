package repository

import (
	"database/sql"
	"fmt"

	"backend/models"

	"github.com/lib/pq"
)

type ProductRepository interface {
	GetAll() ([]models.Product, error)
	GetByID(id int) (*models.Product, error)
	Create(product *models.Product) error
	Update(id int, product *models.Product) error
	Delete(id int) error
}

type productRepository struct {
	db *sql.DB
}

func NewProductRepository(db *sql.DB) ProductRepository {
	return &productRepository{db: db}
}

func (r *productRepository) GetAll() ([]models.Product, error) {
	query := `
		SELECT id, name, brand, category, sub_category, price, description, images 
		FROM products 
		ORDER BY id ASC`

	rows, err := r.db.Query(query)
	if err != nil {
		return nil, fmt.Errorf("failed to query products: %w", err)
	}
	defer rows.Close()

	var products []models.Product
	for rows.Next() {
		var p models.Product
		err := rows.Scan(
			&p.ID,
			&p.Name,
			&p.Brand,
			&p.Category,
			&p.SubCategory,
			&p.Price,
			&p.Description,
			pq.Array(&p.Images),
		)
		if err != nil {
			return nil, fmt.Errorf("failed to scan product: %w", err)
		}
		products = append(products, p)
	}

	if err = rows.Err(); err != nil {
		return nil, fmt.Errorf("rows error: %w", err)
	}

	return products, nil
}

func (r *productRepository) GetByID(id int) (*models.Product, error) {
	query := `
		SELECT id, name, brand, category, sub_category, price, description, images 
		FROM products 
		WHERE id = $1`

	var p models.Product
	err := r.db.QueryRow(query, id).Scan(
		&p.ID,
		&p.Name,
		&p.Brand,
		&p.Category,
		&p.SubCategory,
		&p.Price,
		&p.Description,
		pq.Array(&p.Images),
	)

	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		return nil, fmt.Errorf("failed to get product by id: %w", err)
	}

	return &p, nil
}

func (r *productRepository) Create(product *models.Product) error {
	query := `
		INSERT INTO products (name, brand, category, sub_category, price, description, images)
		VALUES ($1, $2, $3, $4, $5, $6, $7)
		RETURNING id`

	err := r.db.QueryRow(
		query,
		product.Name,
		product.Brand,
		product.Category,
		product.SubCategory,
		product.Price,
		product.Description,
		pq.Array(product.Images),
	).Scan(&product.ID)

	if err != nil {
		return fmt.Errorf("failed to create product: %w", err)
	}

	return nil
}

func (r *productRepository) Update(id int, product *models.Product) error {
	query := `
		UPDATE products
		SET name = $1, brand = $2, category = $3, sub_category = $4, price = $5, description = $6, images = $7
		WHERE id = $8`

	res, err := r.db.Exec(
		query,
		product.Name,
		product.Brand,
		product.Category,
		product.SubCategory,
		product.Price,
		product.Description,
		pq.Array(product.Images),
		id,
	)
	if err != nil {
		return fmt.Errorf("failed to update product: %w", err)
	}

	rows, err := res.RowsAffected()
	if err != nil {
		return fmt.Errorf("failed to verify product update: %w", err)
	}
	if rows == 0 {
		return sql.ErrNoRows
	}

	return nil
}

func (r *productRepository) Delete(id int) error {
	res, err := r.db.Exec(`DELETE FROM products WHERE id = $1`, id)
	if err != nil {
		return fmt.Errorf("failed to delete product: %w", err)
	}

	rows, err := res.RowsAffected()
	if err != nil {
		return fmt.Errorf("failed to verify product delete: %w", err)
	}
	if rows == 0 {
		return sql.ErrNoRows
	}

	return nil
}