package repository

import (
	"database/sql"
	"backend/models"
)

type CategoryRepository interface {
	GetAllCategories() ([]models.Category, error)
	GetSubCategories() ([]models.Category, error) // özün uyğun modelə/sorğuya görə dəyiş
}

type categoryRepository struct {
	db *sql.DB
}

func NewCategoryRepository(db *sql.DB) CategoryRepository {
	return &categoryRepository{db: db}
}

func (r *categoryRepository) GetAllCategories() ([]models.Category, error) {
	query := `SELECT id, name FROM categories`
	rows, err := r.db.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var categories []models.Category
	for rows.Next() {
		var c models.Category
		if err := rows.Scan(&c.ID, &c.Name); err != nil {
			return nil, err
		}
		categories = append(categories, c)
	}

	return categories, nil
}

func (r *categoryRepository) GetSubCategories() ([]models.Category, error) {
	query := `SELECT id, name FROM sub_categories` // öz cədvəl/sütun adlarına uyğunlaşdır
	rows, err := r.db.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var categories []models.Category
	for rows.Next() {
		var c models.Category
		if err := rows.Scan(&c.ID, &c.Name); err != nil {
			return nil, err
		}
		categories = append(categories, c)
	}

	return categories, nil
}