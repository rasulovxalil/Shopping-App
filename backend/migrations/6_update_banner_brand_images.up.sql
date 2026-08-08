-- Replace placeholder banner images with real image URLs
UPDATE banners SET image = 'https://imgstore.alta.ge/images/b90fdb90-0215-4097-a8f6-a2bdb2055eb29966aca1-d0a0-41a1-95e1-3a47114e610b.png' WHERE id = 1;
UPDATE banners SET image = 'https://imgstore.alta.ge/images/d4c7e212-35a5-4006-b65d-a3f38daaacd73389c465-8f0e-4407-a8e8-d2843f573af9.jpeg' WHERE id = 2;
UPDATE banners SET image = 'https://imgstore.alta.ge/images/b43bfded-a3a8-42d9-83f8-0ea68c8fb942d6144f58-515e-4116-8341-0654f45c52f1.png' WHERE id = 3;
UPDATE banners SET image = 'https://imgstore.alta.ge/images/cad5c4b5-fe1a-4fac-b3b6-7c8171676977859e4d18-65db-4697-8732-1383551f89da.png' WHERE id = 4;

-- Replace placeholder brand images with real image URLs
UPDATE brands SET image = 'https://imgstore.alta.ge/images/0ecf841c-1801-4ed6-8395-a39a9f46f778baf19204-e7a8-405b-9833-43c0294d20fb.png' WHERE id = 1;
UPDATE brands SET image = 'https://alta-static.lemon.do/Alta/2d525812-f96e-4c7e-976d-f00df694a2e66322bf61-ba3b-4dc5-81de-e586afa25502.png' WHERE id = 2;
UPDATE brands SET image = 'https://imgstore.alta.ge/images/c566bf0c-b79c-4507-aa48-f9c10ca27a28250b0ab9-c340-47c4-9af3-184c37d2f2f0.png' WHERE id = 3;
UPDATE brands SET image = 'https://alta-static.lemon.do/Alta/f248cc48-416e-402b-abb4-4ac5bcf0fc192fb72c8a-4580-41a3-92a0-3505c4165d7b.png' WHERE id = 4;
UPDATE brands SET image = 'https://alta-static.lemon.do/Alta/7296697b-b812-40d7-8817-399ca0f9f27589be87f5-e8fe-4fad-8979-046ce91d4d36.png' WHERE id = 5;
UPDATE brands SET image = 'https://alta-static.lemon.do/Alta/2aaf4691-1c89-4767-b4d9-126e4b3d36555d4d8f1c-770f-4600-af6a-4acfd775da7d.png' WHERE id = 6;
UPDATE brands SET image = 'https://alta-static.lemon.do/Alta/fcd46dca-ad0c-423b-8459-64dd2d9faa2452421330-6a45-4221-b2e8-81990a5c1dea.png' WHERE id = 7;
UPDATE brands SET image = 'https://alta-static.lemon.do/Alta/5e429b3b-4769-4005-a059-04b5f8a9e3547b63a001-5b11-48f7-b762-6eba45159b6e.png' WHERE id = 8;
UPDATE brands SET image = 'https://alta-static.lemon.do/Alta/847d49b0-a6b6-4a39-bb86-3c2d9e11a24ae451bf1a-3671-4414-830e-5dd19b73d9fd.png' WHERE id = 9;
UPDATE brands SET image = 'https://alta-static.lemon.do/Alta/81d71bf0-650a-4d3c-8cf2-b5914fb760ebecfad54c-3275-49ac-a5c4-c2982725ae7d.png' WHERE id = 10;
UPDATE brands SET image = 'https://imgstore.alta.ge/images/cad5c4b5-fe1a-4fac-b3b6-7c8171676977859e4d18-65db-4697-8732-1383551f89da.png' WHERE id = 11;
UPDATE brands SET image = 'https://alta-static.lemon.do/Alta/be1032a6-adce-4d44-a686-4970fea632d1c07983a2-ba0c-4960-a467-d1242ee959e2.png' WHERE id = 12;

-- New brands present in data.json but missing from the original seed
INSERT INTO brands (id, image) VALUES
(13, 'https://alta-static.lemon.do/Alta/e111924f-e4f2-4190-92a6-21e91ca463a292e006a0-9eed-4fb3-a9ee-b938424c0e90.png'),
(14, 'https://alta-static.lemon.do/Alta/f02fc423-fe90-4b85-8c47-f99d54b5251eb3007bb1-fe07-4b9a-9837-1bbc2a77d6da.png')
ON CONFLICT (id) DO UPDATE SET image = EXCLUDED.image;

-- Keep the sequence ahead of the highest manually-assigned id
SELECT setval('brands_id_seq', (SELECT MAX(id) FROM brands));
