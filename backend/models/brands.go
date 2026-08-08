package models

import "time"

// Brand represents a brand entity
type Brand struct {
	ID        int       `json:"id"`
	Image     string    `json:"image"`
	CreatedAt time.Time `json:"created_at"`
}