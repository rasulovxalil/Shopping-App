-- Rollback: restore the original placeholder banner images
UPDATE banners SET image = '/banner1.png' WHERE id = 1;
UPDATE banners SET image = '/banner2.png' WHERE id = 2;
UPDATE banners SET image = '/banner3.png' WHERE id = 3;
UPDATE banners SET image = '/banner4.png' WHERE id = 4;

-- Rollback: restore the original placeholder brand images
UPDATE brands SET image = '/brand1.png' WHERE id = 1;
UPDATE brands SET image = '/brand2.png' WHERE id = 2;
UPDATE brands SET image = '/brand3.png' WHERE id = 3;
UPDATE brands SET image = '/brand4.png' WHERE id = 4;
UPDATE brands SET image = '/brand5.png' WHERE id = 5;
UPDATE brands SET image = '/brand6.png' WHERE id = 6;
UPDATE brands SET image = '/brand7.png' WHERE id = 7;
UPDATE brands SET image = '/brand8.png' WHERE id = 8;
UPDATE brands SET image = '/brand9.png' WHERE id = 9;
UPDATE brands SET image = '/brand10.png' WHERE id = 10;
UPDATE brands SET image = '/brand11.png' WHERE id = 11;
UPDATE brands SET image = '/brand12.png' WHERE id = 12;

-- Remove the brands that didn't exist before this migration
DELETE FROM brands WHERE id IN (13, 14);

-- Reset the sequence back to the pre-migration max id
SELECT setval('brands_id_seq', (SELECT MAX(id) FROM brands));
