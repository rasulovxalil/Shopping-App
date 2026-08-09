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
),

-- Real products sourced from alta.ge product pages (name, brand, price,
-- category and images taken directly from the live listing; description
-- left blank to match the rest of this seed data).
(
    'Canon ImageRUNNER 2425i 4293C004AA - White',
    'Canon',
    'computers-accessories',
    'printers',
    4599.00,
    '',
    ARRAY[
        'https://imgstore.alta.ge/images/400/115/115768_8696_1.webp',
        'https://imgstore.alta.ge/images/400/115/115768_8696_2.webp'
    ]
),
(
    'TCL 43V6C',
    'TCL',
    'tv-audio',
    'smart-tv',
    799.00,
    '',
    ARRAY[
        'https://imgstore.alta.ge/images/400/164/164404_4788_2.webp',
        'https://imgstore.alta.ge/images/400/164/164404_4788_4.webp'
    ]
),
(
    'Toshiba 43M450RE',
    'Toshiba',
    'tv-audio',
    'smart-tv',
    1299.00,
    '',
    ARRAY[
        'https://imgstore.alta.ge/images/c29ee585-3e76-4e78-a52c-0d9a6bac907e_Thumb.jpeg',
        'https://imgstore.alta.ge/images/08605df5-159e-43c2-bbd0-3181d279355d_Thumb.jpeg'
    ]
),
(
    'SBOX HDMI To HDMI 1.4 Cable - 1.5m',
    'SBOX',
    'tv-audio',
    'tv-cables-adapters',
    9.00,
    '',
    ARRAY[
        'https://imgstore.alta.ge/images/400/116/116544_8368_1.webp'
    ]
),
(
    'Gembird Power Cord 2.5m White',
    'Gembird',
    'computers-accessories',
    'pc-components',
    9.00,
    '',
    ARRAY[
        'https://imgstore.alta.ge/images/400/113/113126_2622_1.webp'
    ]
),
(
    'Sony S100F Black',
    'Sony',
    'tv-audio',
    'soundbar',
    399.00,
    '',
    ARRAY[
        'https://imgstore.alta.ge/images/400/144/144617_149_5.webp',
        'https://imgstore.alta.ge/images/400/144/144617_149_7.webp'
    ]
),
(
    'JBL PartyBox Stage 320 Black',
    'JBL',
    'tv-audio',
    'speakers',
    1859.00,
    '',
    ARRAY[
        'https://imgstore.alta.ge/images/400/158/158818_9546_1.webp',
        'https://imgstore.alta.ge/images/400/158/158818_9546_3.webp'
    ]
),
(
    'LG Soundbar S65TR',
    'LG',
    'tv-audio',
    'soundbar',
    749.00,
    '',
    ARRAY[
        'https://imgstore.alta.ge/images/795d2fba-a45c-4208-a3a6-bda20cd0c4c5_Thumb.jpeg',
        'https://imgstore.alta.ge/images/8a023dc5-2000-4902-a363-793273187ff3_Thumb.png'
    ]
),
(
    'Microsoft Xbox Series X/S Wireless Controller - Robot White',
    'Microsoft',
    'gaming',
    'xbox',
    179.00,
    '',
    ARRAY[
        'https://imgstore.alta.ge/images/400/117/117078_4766_1.webp',
        'https://imgstore.alta.ge/images/400/117/117078_4766_2.webp'
    ]
),
(
    'PlayStation 5 Pro Console - 2 TB',
    'PlayStation',
    'gaming',
    'playstation',
    2849.00,
    '',
    ARRAY[
        'https://imgstore.alta.ge/images/400/163/163056_2832_1.webp',
        'https://imgstore.alta.ge/images/400/163/163056_2832_4.webp'
    ]
),
(
    'Microsoft Xbox Series X 1TB, 8-Core AMD Ryzen Zen 2-Architecture CPU At 3.8GHz 8K 60fps; 4K 120fps , 4K Blu-Ray JP \ X',
    'Microsoft',
    'gaming',
    'xbox',
    2299.00,
    '',
    ARRAY[
        'https://imgstore.alta.ge/images/2deb61ca-c6e1-4b2c-80ef-aa5bc88adf5a_Thumb.jpeg',
        'https://imgstore.alta.ge/images/d81e3292-306d-4d4f-b049-5a258bdf25af_Thumb.jpeg'
    ]
),
(
    'Microsoft Xbox Series S 512GB Custom NVME SSD CPU. 8X Cores @ 3.6 GHz GPU. 4 TFLOPS, 20 CUs Memory. 10GB GDDR6 128 Bit JP/Xbox Series X/S',
    'Microsoft',
    'gaming',
    'xbox',
    1499.00,
    '',
    ARRAY[
        'https://imgstore.alta.ge/images/3172ee6e-ee70-4951-9c05-83dc488e4ff8_Thumb.jpeg',
        'https://imgstore.alta.ge/images/c13d05d6-89d2-4a0d-84b0-9157f89a78c7_Thumb.jpeg'
    ]
),
(
    'E-Blue EEC412BBAA-IA Gaming Cobra Chair - Black/Blue',
    'E-Blue',
    'gaming',
    'gaming-accessories',
    339.00,
    '',
    ARRAY[
        'https://imgstore.alta.ge/images/400/119/119815_555_1.webp',
        'https://imgstore.alta.ge/images/400/119/119815_555_2.webp'
    ]
),
(
    'Asus ROG Spatha X Wireless Gaming Mouse Black',
    'Asus',
    'gaming',
    'gaming-accessories',
    549.00,
    '',
    ARRAY[
        'https://imgstore.alta.ge/images/400/125/125955_2135_1.webp',
        'https://imgstore.alta.ge/images/400/125/125955_2135_2.webp'
    ]
),
(
    'Lenovo IdeaPad Gaming Modern Backpack - White',
    'Lenovo',
    'gaming',
    'gaming-accessories',
    89.00,
    '',
    ARRAY[
        'https://imgstore.alta.ge/images/400/138/138632_8104_1.webp',
        'https://imgstore.alta.ge/images/400/138/138632_8104_2.webp'
    ]
),
(
    'Meta Quest 3 512 GB Advanced All-In-One Virtual Reality Headset',
    'Meta',
    'gaming',
    'vr-headset',
    1999.00,
    '',
    ARRAY[
        'https://imgstore.alta.ge/images/400/162/162346_4962_4.webp',
        'https://imgstore.alta.ge/images/400/162/162346_4962_1.webp'
    ]
),
(
    'Toshiba MW3-EG25PE(BM)',
    'Toshiba',
    'small-domestic-appliances',
    'microwave',
    299.00,
    '',
    ARRAY[
        'https://imgstore.alta.ge/images/e859f1e3-5dba-470e-ba19-865f4cc4a5e9_Thumb.jpeg'
    ]
),
(
    'Panasonic NN-ST34HWZPE',
    'Panasonic',
    'small-domestic-appliances',
    'microwave',
    399.00,
    '',
    ARRAY[
        'https://imgstore.alta.ge/images/400/113/113493_5521_2.webp',
        'https://imgstore.alta.ge/images/400/113/113493_5521_1.webp'
    ]
),
(
    'Ninja AF180EU',
    'Ninja',
    'small-domestic-appliances',
    'air-fryer',
    499.00,
    '',
    ARRAY[
        'https://imgstore.alta.ge/images/400/162/162035_3895_1.webp',
        'https://imgstore.alta.ge/images/400/162/162035_3895_2.webp'
    ]
),
(
    'Franko FKT-1101',
    'Franko',
    'small-domestic-appliances',
    'kettle',
    89.00,
    '',
    ARRAY[
        'https://imgstore.alta.ge/images/400/78/78345_4965_1.webp'
    ]
),
(
    'Philips HD9339/80',
    'Philips',
    'small-domestic-appliances',
    'kettle',
    299.00,
    '',
    ARRAY[
        'https://imgstore.alta.ge/images/400/118/118446_6662_1.webp',
        'https://imgstore.alta.ge/images/400/118/118446_6662_2.webp'
    ]
),
(
    'DeLonghi Rivelia (EXAM440.55.BG)',
    'DeLonghi',
    'small-domestic-appliances',
    'coffee-maschine',
    2099.00,
    '',
    ARRAY[
        'https://imgstore.alta.ge/images/400/152/152420_2740_1.webp',
        'https://imgstore.alta.ge/images/400/152/152420_2740_2.webp'
    ]
),
(
    'ETA 017590000 Coffito Espresso Coffee Maker',
    'ETA',
    'small-domestic-appliances',
    'coffee-maschine',
    399.00,
    '',
    ARRAY[
        'https://imgstore.alta.ge/images/400/161/161118_2646_4.webp',
        'https://imgstore.alta.ge/images/400/161/161118_2646_3.webp'
    ]
);