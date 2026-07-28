package repository

import (
	"backend/models"
	"database/sql"
)

type CategoryRepository struct {
	DB *sql.DB
}

func NewCategoryRepository(db *sql.DB) *CategoryRepository {
	return &CategoryRepository{DB: db}
}

// Bütün əsas kateqoriyaları gətirir
func (r *CategoryRepository) GetAll() ([]models.Category, error) {
	rows, err := r.DB.Query("SELECT id, name, slug, icon FROM categories")
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var categories []models.Category
	for rows.Next() {
		var c models.Category
		if err := rows.Scan(&c.ID, &c.Name, &c.Slug, &c.Icon); err != nil {
			return nil, err
		}
		categories = append(categories, c)
	}

	if categories == nil {
		categories = []models.Category{}
	}

	return categories, nil
}

// Müəyyən bir kateqoriyaya aid alt kateqoriyaları gətirir
func (r *CategoryRepository) GetSubCategoriesByCategoryID(categoryID int) ([]models.SubCategory, error) {
	rows, err := r.DB.Query("SELECT id, category_id, name, slug, img FROM sub_categories WHERE category_id = $1", categoryID)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var subCategories []models.SubCategory
	for rows.Next() {
		var sub models.SubCategory
		if err := rows.Scan(&sub.ID, &sub.CategoryID, &sub.Name, &sub.Slug, &sub.Img); err != nil {
			return nil, err
		}
		subCategories = append(subCategories, sub)
	}

	if subCategories == nil {
		subCategories = []models.SubCategory{}
	}

	return subCategories, nil
}