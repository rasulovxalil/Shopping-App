package models

// Main Category  struct
type Category struct {
	ID   int    `json:"id"`
	Name string `json:"name"`
	Slug string `json:"slug"`
	Icon string `json:"icon"`
}

// Sub Category  struct 
type SubCategory struct {
	ID         int    `json:"id"`
	CategoryID int    `json:"category_id"`
	Name       string `json:"name"`
	Slug       string `json:"slug"`
	Img        string `json:"img"`
}