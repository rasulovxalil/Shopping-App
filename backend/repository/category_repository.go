package repository

import (
	"database/sql"
	"backend/models"
)

type CategoryRepository interface {
	GetAllCategories() ([]models.Category, error)
	GetSubCategories() ([]models.SubCategory, error)
}

type categoryRepository struct {
	db *sql.DB
}

func NewCategoryRepository(db *sql.DB) CategoryRepository {
	return &categoryRepository{db: db}
}

func (r *categoryRepository) GetAllCategories() ([]models.Category, error) {
	categoriesQuery := `SELECT id, name, COALESCE(slug, ''), COALESCE(icon, '') FROM categories ORDER BY id ASC`
	rows, err := r.db.Query(categoriesQuery)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	categories := make([]models.Category, 0)
	categoryMap := make(map[int]int) // maps category ID to index in categories slice

	for rows.Next() {
		var c models.Category
		c.SubCategories = make([]models.SubCategory, 0)
		if err := rows.Scan(&c.ID, &c.Name, &c.Slug, &c.Icon); err != nil {
			return nil, err
		}
		categoryMap[c.ID] = len(categories)
		categories = append(categories, c)
	}

	subQuery := `SELECT id, category_id, name, COALESCE(slug, ''), COALESCE(img, '') FROM sub_categories ORDER BY id ASC`
	subRows, err := r.db.Query(subQuery)
	if err == nil {
		defer subRows.Close()
		for subRows.Next() {
			var sc models.SubCategory
			if err := subRows.Scan(&sc.ID, &sc.CategoryID, &sc.Name, &sc.Slug, &sc.Img); err == nil {
				if idx, exists := categoryMap[sc.CategoryID]; exists {
					categories[idx].SubCategories = append(categories[idx].SubCategories, sc)
				}
			}
		}
	}

	return categories, nil
}

func (r *categoryRepository) GetSubCategories() ([]models.SubCategory, error) {
	query := `SELECT id, category_id, name, COALESCE(slug, ''), COALESCE(img, '') FROM sub_categories ORDER BY id ASC`
	rows, err := r.db.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	subCategories := make([]models.SubCategory, 0)
	for rows.Next() {
		var sc models.SubCategory
		if err := rows.Scan(&sc.ID, &sc.CategoryID, &sc.Name, &sc.Slug, &sc.Img); err != nil {
			return nil, err
		}
		subCategories = append(subCategories, sc)
	}

	return subCategories, nil
}