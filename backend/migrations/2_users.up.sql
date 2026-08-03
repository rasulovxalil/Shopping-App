
-- 1. Creating tables
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Default users
INSERT INTO users (email, password) 
VALUES 
    ('test@gmail.com', '12345678'),
    ('testapp@gmail.com', '1234567'),
    ('salam', 'sadsadsa'),
    ('salaminko', 'paswordm olsun'),
    ('dorduncu user', 'salamino894'),
    ('dorduncu@gmail.com', '214321434234'),
    ('dorduncuuser@gmail.com', '123439393939'),
    ('dorduncuuser@gmail.com', '123456799s9s9sA!')
ON CONFLICT (email) DO NOTHING;