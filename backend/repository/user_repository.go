package repository

import (
	"database/sql"
	"backend/models"
)

type UserRepository interface {
	GetAllUsers() ([]models.User, error)
	GetUserByID(id string) (*models.User, error)
	CreateUser(user *models.User) error
}

type userRepository struct {
	db *sql.DB
}

func NewUserRepository(db *sql.DB) UserRepository {
	return &userRepository{db: db}
}

// Fetch all users from database
func (r *userRepository) GetAllUsers() ([]models.User, error) {
	query := `SELECT id, email FROM users`
	rows, err := r.db.Query(query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var users []models.User
	for rows.Next() {
		var u models.User
		if err := rows.Scan(&u.ID, &u.Email); err != nil {
			return nil, err
		}
		users = append(users, u)
	}

	return users, nil
}

// Fetch a single user by ID
func (r *userRepository) GetUserByID(id string) (*models.User, error) {
	query := `SELECT id, email FROM users WHERE id = $1`
	row := r.db.QueryRow(query, id)

	var u models.User
	if err := row.Scan(&u.ID, &u.Email); err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		return nil, err
	}

	return &u, nil
}

// Insert a new user into the database
func (r *userRepository) CreateUser(user *models.User) error {
	query := `INSERT INTO users (id, email, password) VALUES ($1, $2, $3)`
	_, err := r.db.Exec(query, user.ID, user.Email, user.Password)
	return err
}