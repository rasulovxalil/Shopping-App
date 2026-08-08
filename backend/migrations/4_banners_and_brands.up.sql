-- Create banners table
CREATE TABLE IF NOT EXISTS banners (
    id SERIAL PRIMARY KEY,
    image VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create brands table
CREATE TABLE IF NOT EXISTS brands (
    id SERIAL PRIMARY KEY,
    image VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Seed initial data for banners
INSERT INTO banners (id, image) VALUES
(1, '/banner1.png'),
(2, '/banner2.png'),
(3, '/banner3.png'),
(4, '/banner4.png');

-- Reset primary key sequence for banners to prevent ID collision on new inserts
SELECT setval('banners_id_seq', (SELECT MAX(id) FROM banners));

-- Seed initial data for brands
INSERT INTO brands (id, image) VALUES
(1, '/brand1.png'),
(2, '/brand2.png'),
(3, '/brand3.png'),
(4, '/brand4.png'),
(5, '/brand5.png'),
(6, '/brand6.png'),
(7, '/brand7.png'),
(8, '/brand8.png'),
(9, '/brand9.png'),
(10, '/brand10.png'),
(11, '/brand11.png'),
(12, '/brand12.png');

-- Reset primary key sequence for brands
SELECT setval('brands_id_seq', (SELECT MAX(id) FROM brands));