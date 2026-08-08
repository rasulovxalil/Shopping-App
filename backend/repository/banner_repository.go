package repository

import (
	"database/sql"
	"errors"

	"backend/models"
)

// BannerRepository defines the database contract for banners
type BannerRepository interface {
	GetAll() ([]models.Banner, error)
	GetByID(id int) (*models.Banner, error)
}

type bannerRepository struct {
	db *sql.DB
}

// NewBannerRepository creates a new instance of BannerRepository
func NewBannerRepository(db *sql.DB) BannerRepository {
	return &bannerRepository{db: db}
}

// GetAll retrieves all banners from the database ordered by ID
func (r *bannerRepository) GetAll() ([]models.Banner, error) {
	query := `SELECT id, image, created_at FROM banners ORDER BY id ASC`

	rows, err := r.db.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var banners []models.Banner

	for rows.Next() {
		var banner models.Banner
		if err := rows.Scan(&banner.ID, &banner.Image, &banner.CreatedAt); err != nil {
			return nil, err
		}
		banners = append(banners, banner)
	}

	if err = rows.Err(); err != nil {
		return nil, err
	}

	return banners, nil
}

// GetByID retrieves a single banner record by its primary key
func (r *bannerRepository) GetByID(id int) (*models.Banner, error) {
	query := `SELECT id, image, created_at FROM banners WHERE id = $1`

	var banner models.Banner
	err := r.db.QueryRow(query, id).Scan(&banner.ID, &banner.Image, &banner.CreatedAt)
	if err != nil {
		if errors.Is(err, sql.ErrNoRows) {
			return nil, nil
		}
		return nil, err
	}

	return &banner, nil
}