package models

type Product struct {
	ID          int      `json:"id"`
	Name        string   `json:"name"`
	Brand       string   `json:"brand"`
	Category    string   `json:"category"`
	SubCategory string   `json:"subCategory"`
	Price       float64  `json:"price"`
	Description string   `json:"description"`
	Images      []string `json:"images"`
}