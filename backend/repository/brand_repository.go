package repository

import (
	"database/sql"
	"errors"

	"backend/models"
)

// BrandRepository defines the database contract for brands
type BrandRepository interface {
	GetAll() ([]models.Brand, error)
	GetByID(id int) (*models.Brand, error)
}

type brandRepository struct {
	db *sql.DB
}

// NewBrandRepository creates a new instance of BrandRepository
func NewBrandRepository(db *sql.DB) BrandRepository {
	return &brandRepository{db: db}
}

// GetAll retrieves all brands from the database ordered by ID
func (r *brandRepository) GetAll() ([]models.Brand, error) {
	query := `SELECT id, image, created_at FROM brands ORDER BY id ASC`

	rows, err := r.db.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var brands []models.Brand

	for rows.Next() {
		var brand models.Brand
		if err := rows.Scan(&brand.ID, &brand.Image, &brand.CreatedAt); err != nil {
			return nil, err
		}
		brands = append(brands, brand)
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	return brands, nil
}

// GetByID retrieves a single brand record by its primary key
func (r *brandRepository) GetByID(id int) (*models.Brand, error) {
	query := `SELECT id, image, created_at FROM brands WHERE id = $1`

	var brand models.Brand
	err := r.db.QueryRow(query, id).Scan(&brand.ID, &brand.Image, &brand.CreatedAt)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, nil
		}
		return nil, err
	}

	return &brand, nil
}