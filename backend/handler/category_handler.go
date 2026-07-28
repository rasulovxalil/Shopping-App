package handler

import (
	"backend/repository"
	"encoding/json"
	"net/http"
	"strconv"
)

type CategoryHandler struct {
	Repo *repository.CategoryRepository
}

func NewCategoryHandler(repo *repository.CategoryRepository) *CategoryHandler {
	return &CategoryHandler{Repo: repo}
}

// GET /categories
func (h *CategoryHandler) GetCategories(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	categories, err := h.Repo.GetAll()
	if err != nil {
		http.Error(w, "An error occured while gettingCategories", http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(categories)
}

// GET /sub-categories?category_id=1
func (h *CategoryHandler) GetSubCategories(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	// reading parameters from URL
	categoryIDStr := r.URL.Query().Get("category_id")
	if categoryIDStr == "" {
		http.Error(w, "Category ID should be entered", http.StatusBadRequest)
		return
	}

	categoryID, err := strconv.Atoi(categoryIDStr)
	if err != nil {
		http.Error(w, "Please enter correct ID", http.StatusBadRequest)
		return
	}

	subCategories, err := h.Repo.GetSubCategoriesByCategoryID(categoryID)
	if err != nil {
		http.Error(w, "An error occured while getting SubCategories", http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(subCategories)
}