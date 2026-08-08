package repository

import (
	"database/sql"
	"encoding/json"
	"errors"

	"backend/models"
)

// AboutUsRepository defines database operations for AboutUs
type AboutUsRepository interface {
	GetAll() ([]models.AboutUs, error)
	GetBySlug(slug string) (*models.AboutUs, error)
}

type aboutUsRepository struct {
	db *sql.DB
}

// NewAboutUsRepository creates a new instance of AboutUsRepository
func NewAboutUsRepository(db *sql.DB) AboutUsRepository {
	return &aboutUsRepository{db: db}
}

// GetAll retrieves all AboutUs records from database
func (r *aboutUsRepository) GetAll() ([]models.AboutUs, error) {
	query := `SELECT id, title, slug, COALESCE(body, ''), stores, created_at, updated_at FROM about_us`

	rows, err := r.db.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var list []models.AboutUs

	for rows.Next() {
		var item models.AboutUs
		var storesBytes []byte

		err := rows.Scan(
			&item.ID,
			&item.Title,
			&item.Slug,
			&item.Body,
			&storesBytes,
			&item.CreatedAt,
			&item.UpdatedAt,
		)
		if err != nil {
			return nil, err
		}

		// Parse JSONB stores array if present
		if len(storesBytes) > 0 {
			if err := json.Unmarshal(storesBytes, &item.Stores); err != nil {
				return nil, err
			}
		}

		list = append(list, item)
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	return list, nil
}

// GetBySlug retrieves a single AboutUs record by its slug
func (r *aboutUsRepository) GetBySlug(slug string) (*models.AboutUs, error) {
	query := `SELECT id, title, slug, COALESCE(body, ''), stores, created_at, updated_at FROM about_us WHERE slug = $1`

	var item models.AboutUs
	var storesBytes []byte

	err := r.db.QueryRow(query, slug).Scan(
		&item.ID,
		&item.Title,
		&item.Slug,
		&item.Body,
		&storesBytes,
		&item.CreatedAt,
		&item.UpdatedAt,
	)

	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, nil
		}
		return nil, err
	}

	// Parse JSONB stores array if present
	if len(storesBytes) > 0 {
		if err := json.Unmarshal(storesBytes, &item.Stores); err != nil {
			return nil, err
		}
	}

	return &item, nil
}