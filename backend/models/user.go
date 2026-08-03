package models

type User struct {
	ID       string `json:"id" db:"id"`
	Email    string `json:"email" db:"email"`
	Password string `json:"password,omitempty" db:"password"` 
}

type CreateUserRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}