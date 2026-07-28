-- 1. Main Category
CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    icon VARCHAR(100)
);

-- 2. SUB-Category
CREATE TABLE IF NOT EXISTS sub_categories (
    id INT PRIMARY KEY,
    category_id INT REFERENCES categories(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL,
    img TEXT
);

-- Adding Default Data (SEED DATA)

-- Main Categories
INSERT INTO categories (id, name, slug, icon) VALUES
(1, 'Mobile phones & Accessories', 'mobile-phones-accessories', 'PhoneAndroidIcon'),
(2, 'Computers & Accessories', 'computers-accessories', 'ComputerIcon'),
(3, 'Tv & Auido', 'tv-audio', 'TvIcon'),
(4, 'Gaming', 'gaming', 'SportsEsportsIcon'),
(5, 'Small Domestic Appliances', 'small-domestic-appliances', 'CountertopsIcon')
ON CONFLICT (id) DO NOTHING;

-- Sub-Categories
INSERT INTO sub_categories (id, category_id, name, slug, img) VALUES
-- Mobile phones & Accessories (category_id = 1)
(101, 1, 'Smart Watches', 'smart-watches', 'https://imgstore.alta.ge/images/d8ff6587-862d-45ce-9f68-92da99b604e1d5d2d57d-9d9a-4827-9c57-1ba5e8de8806.png'),
(102, 1, 'Mobile Phones', 'mobile-phones', 'https://imgstore.alta.ge/images/6ad40fb9-1ba2-4dc2-8c67-3616c803847628f4522e-b021-40ea-957c-2e689b8e321f.png'),
(103, 1, 'Adapters', 'adapters', 'https://imgstore.alta.ge/images/400/134/134732_9804_3.webp'),
(104, 1, 'Cabels', 'cabels', 'https://imgstore.alta.ge/images/400/121/121645_5065_1.webp'),
(105, 1, 'Power Banks', 'power-banks', 'https://imgstore.alta.ge/images/400/159/159090_2730_2.webp'),

-- Computers & Accessories (category_id = 2)
(201, 2, 'Notebooks', 'notebooks', 'https://imgstore.alta.ge/images/66f6beed-1840-427c-bbf9-6149348b612ad9e445be-c0a8-4563-8ef0-a6ae3457f64b.png'),
(202, 2, 'Monitors', 'monitors', 'https://imgstore.alta.ge/images/3af9f434-605e-4778-9339-5808ea61550d8e0c3596-1a4e-4801-a0a4-6872d139dc19.png'),
(203, 2, 'PC components', 'pc-components', 'https://imgstore.alta.ge/images/dc2a6bc8-0d4a-498f-9a03-ad3d4091f2af54b52b35-045f-4c27-975e-50b100c8629d.png'),
(204, 2, 'Printers', 'printers', 'https://imgstore.alta.ge/images/7bc62f9d-a298-4e01-aec7-9c34bfacc682485f66e5-ceb1-4d3c-8fc2-2b3185a27d6a.png'),

-- Tv & Auido (category_id = 3)
(301, 3, 'Smart Tv', 'smart-tv', 'https://imgstore.alta.ge/images/96ea10cc-abc0-4f18-b197-385a80e93f16e916eaa0-e4c7-46c3-bf69-56cb11548995.png'),
(302, 3, 'TV Cables & Adapters', 'tv-cables-adapters', 'https://imgstore.alta.ge/images/400/86/86000_2000_1.webp'),
(303, 3, 'Speakers', 'speakers', 'https://imgstore.alta.ge/images/400/144/144468_2596_5.webp'),
(304, 3, 'Soundbar', 'soundbar', 'https://imgstore.alta.ge/images/a97c3cca-b249-401f-8f51-9d7097aa6ee4_Thumb.jpeg'),

-- Gaming (category_id = 4)
(401, 4, 'Playstation', 'playstation', 'https://imgstore.alta.ge/images/164e908e-3766-47e5-b857-56ce1986b810b0f2754b-2ed9-4d4a-9522-219a967aaec4.png'),
(402, 4, 'Xbox', 'xbox', 'https://imgstore.alta.ge/images/2deb61ca-c6e1-4b2c-80ef-aa5bc88adf5a_Thumb.jpeg'),
(403, 4, 'Gaming Accessories', 'gaming-accessories', 'https://imgstore.alta.ge/images/7261b186-e286-4c85-8313-6772f9c8ff395550a011-cdde-465b-a68b-b45b82ed1f5f.png'),
(404, 4, 'VR Headset', 'vr-headset', 'https://imgstore.alta.ge/images/400/162/162346_4962_4.webp'),

-- Small Domestic Appliances (category_id = 5)
(501, 5, 'Microwave', 'microwave', 'https://imgstore.alta.ge/images/d5684204-81b0-4ef8-83a5-c9a9e9ade2ee_Thumb.jpeg'),
(502, 5, 'Air Fryer', 'air-fryer', 'https://imgstore.alta.ge/images/b8344dc8-2246-4d05-a535-5b5869bc7617_Thumb.jpeg'),
(503, 5, 'Kettle', 'kettle', 'https://imgstore.alta.ge/images/400/150/150054_7838_1.webp'),
(504, 5, 'Coffe Maschine', 'coffee-maschine', 'https://imgstore.alta.ge/images/400/140/140876_9372_1.webp')
ON CONFLICT (id) DO NOTHING;