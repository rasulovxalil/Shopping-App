package models

import "time"

// Banner represents a promo banner entity
type Banner struct {
	ID        int       `json:"id"`
	Image     string    `json:"image"`
	CreatedAt time.Time `json:"created_at"`
}