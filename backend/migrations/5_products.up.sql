-- Create products table
CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    brand VARCHAR(100) NOT NULL,
    category VARCHAR(100) NOT NULL,
    sub_category VARCHAR(100) NOT NULL,
    price NUMERIC(10, 2) NOT NULL,
    description TEXT DEFAULT '',
    images TEXT[] DEFAULT '{}'
);

-- Insert initial seed data for products
INSERT INTO products (name, brand, category, sub_category, price, description, images) 
VALUES
(
    'Apple Watch Series 11 GPS 46mm Jet Black Aluminium Case with Black Sport Band', 
    'Apple', 
    'mobile-phones-accessories', 
    'smart-watches', 
    1400.00, 
    '', 
    ARRAY[
        'https://imgstore.alta.ge/images/1e674e07-2697-4d8d-ad4a-f4edbe5f23f3_Thumb.png',
        'https://imgstore.alta.ge/images/502be42a-1a4d-44bd-ba20-cb03f37721fd_Thumb.png',
        'https://imgstore.alta.ge/images/745c5f62-8c00-4b40-bb1a-099928b352a0_Thumb.png'
    ]
),
(
    'Amazfit Bip 5 Soft Black', 
    'Amazfit', 
    'mobile-phones-accessories', 
    'smart-watches', 
    2120.00, 
    '', 
    ARRAY[
        'https://imgstore.alta.ge/images/400/146/146044_9868_1.webp',
        'https://imgstore.alta.ge/images/400/146/146044_9868_2.webp',
        'https://imgstore.alta.ge/images/400/146/146044_9868_3.webp'
    ]
),
(
    'Xiaomi Redmi Watch 5 Obsidian Black (BHR9389GL)', 
    'Xiaomi', 
    'mobile-phones-accessories', 
    'smart-watches', 
    220.00, 
    '', 
    ARRAY[
        'https://imgstore.alta.ge/images/400/164/164967_9099_1.webp',
        'https://imgstore.alta.ge/images/400/164/164967_9099_2.webp',
        'https://imgstore.alta.ge/images/400/164/164967_9099_3.webp'
    ]
),
(
    'Samsung S942B Galaxy S26 5G White', 
    'Samsung', 
    'mobile-phones-accessories', 
    'mobile-phones', 
    3220.00, 
    '', 
    ARRAY[
        'https://imgstore.alta.ge/images/3d8ba073-246d-4729-ba58-992ff229082e_Thumb.png',
        'https://imgstore.alta.ge/images/07f92d37-e099-430a-a4a2-bb7c7ed02e8a_Thumb.png',
        'https://imgstore.alta.ge/images/3c95d501-88a2-4408-bc58-8bd124b48501_Thumb.jpeg'
    ]
),
(
    'Samsung S948B Galaxy S26 Ultra 5G Black', 
    'Samsung', 
    'mobile-phones-accessories', 
    'mobile-phones', 
    2200.00, 
    '', 
    ARRAY[
        'https://imgstore.alta.ge/images/85cfd959-28fa-4e8b-a12a-a77ce1c121f2_Thumb.png',
        'https://imgstore.alta.ge/images/e2457426-062a-4e1e-a03d-cf38461e3a10_Thumb.png',
        'https://imgstore.alta.ge/images/076e35f7-74a4-4de3-af23-0cf58cd60468_Thumb.png'
    ]
),
(
    'Samsung 45W Compact Power Adapter (w C to C Cable) Black', 
    'Samsung', 
    'mobile-phones-accessories', 
    'adapters', 
    120.00, 
    '', 
    ARRAY[
        'https://imgstore.alta.ge/images/400/134/134732_9804_3.webp',
        'https://imgstore.alta.ge/images/400/134/134732_9804_1.webp',
        'https://imgstore.alta.ge/images/400/134/134732_9804_2.webp'
    ]
),
(
    'Apple USB-C to Lightning Cable 1m', 
    'Apple', 
    'mobile-phones-accessories', 
    'cabels', 
    50.00, 
    '', 
    ARRAY[
        'https://imgstore.alta.ge/images/400/114/114856_7432_1.webp',
        'https://imgstore.alta.ge/images/400/114/114856_7432_2.webp'
    ]
),
(
    'Xiaomi Power Bank 10000mAh (Integrated Cable) Tan GL', 
    'Xiaomi', 
    'mobile-phones-accessories', 
    'power-banks', 
    120.00, 
    '', 
    ARRAY[
        'https://imgstore.alta.ge/images/b0b6eb88-d124-4cf8-a76e-dd8b91c25a40_Thumb.jpeg',
        'https://imgstore.alta.ge/images/4c391f1e-93a1-4cfc-87ee-31edf643fc3a_Thumb.jpeg'
    ]
),
(
    'Lenovo LOQ 15ARP9 83JC00LBRK 15.6 - Luna Grey', 
    'Lenovo', 
    'computers-accessories', 
    'notebooks', 
    1200.00, 
    '', 
    ARRAY[
        'https://imgstore.alta.ge/images/4d02d78d-987f-43e1-b265-6e589cf26291_Thumb.jpeg',
        'https://imgstore.alta.ge/images/35ba301c-3681-436f-a9ec-e1a9777ab44e_Thumb.jpeg'
    ]
),
(
    'Apple MacBook Air 13 M2 8-core CPU and 8-core GPU - Midnight', 
    'Apple', 
    'computers-accessories', 
    'notebooks', 
    4200.00, 
    '', 
    ARRAY[
        'https://imgstore.alta.ge/images/400/161/161589_3233_1.webp',
        'https://imgstore.alta.ge/images/400/161/161589_3233_4.webp'
    ]
),
(
    'ViewSonic VX2776 27'' FHD VX2776-SMH - Black', 
    'ViewSonic', 
    'computers-accessories', 
    'monitors', 
    1200.00, 
    '', 
    ARRAY[
        'https://imgstore.alta.ge/images/400/139/139444_9668_1.webp',
        'https://imgstore.alta.ge/images/400/139/139444_9668_8.webp'
    ]
),
(
    'Gigabyte Intel B760 - GGB760_GAMING_X', 
    'Gigabyte', 
    'computers-accessories', 
    'pc-components', 
    1200.00, 
    '', 
    ARRAY[
        'https://imgstore.alta.ge/images/400/157/157225_8325_3.webp',
        'https://imgstore.alta.ge/images/400/157/157225_8325_1.webp'
    ]
);