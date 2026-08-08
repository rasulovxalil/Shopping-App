package models

import "time"

// Store
type Store struct {
	Name    string `json:"name"`
	Address string `json:"address"`
	Hours   string `json:"hours"`
}

type AboutUs struct {
	ID        string     `json:"id"`
	Title     string     `json:"title"`
	Slug      string     `json:"slug"`
	Body      string     `json:"body"`
	Stores    [][]Store  `json:"stores,omitempty"` // to handle the JSONB array
	CreatedAt time.Time  `json:"created_at"`
	UpdatedAt time.Time  `json:"updated_at"`
}