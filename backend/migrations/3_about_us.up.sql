CREATE TABLE IF NOT EXISTS about_us (
    id VARCHAR(50) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL UNIQUE,
    body TEXT DEFAULT '',
    stores JSONB DEFAULT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- (Seed Data)
INSERT INTO about_us (id, title, slug, body, stores) VALUES
(
    '1', 
    'About Us', 
    'about-us', 
    'Welcome to Shopping App!\n\nAt Shopping App, we are dedicated to making your shopping experience faster, more convenient, and more enjoyable. We are more than just an application; we are a digital bridge that delivers quality products to your doorstep at the most competitive prices.\n\nOur Mission\nOur mission is to value our customers'' time. By leveraging advanced technology, we simplify the process of choosing from thousands of products, ensuring you can enjoy shopping with secure payments and fast delivery.\n\nWhy Choose Us?\n\n• Wide Selection: From electronics to home essentials, everything is just a click away.\n• Security: Your data and payments are protected by high-level security protocols.\n• Customer Satisfaction: We are always here for you. If you have any questions, our support team is ready to assist.\n\nWe are building the future of shopping together. Thank you for being a part of our journey!', 
    NULL
),
(
    '2', 
    'Who We Are', 
    'who-we-are', 
    'Welcome to Shopping App!\n\nWho We Are\nWe are a team of tech enthusiasts and shopping experts dedicated to redefining the digital retail experience. Based in Georgia, we strive to bring global convenience to your local lifestyle through innovative technology and a customer-first approach.\n\nOur Commitment\nWe believe in transparency, quality, and reliability. Every product we list and every service we offer is curated with our users'' needs in mind, ensuring that your journey with us is not just a transaction, but a seamless experience built on trust.', 
    NULL
),
(
    '3', 
    'Online Payment Methods', 
    'online-payment-methods', 
    'Secure and Convenient Payments\n\nAt Shopping App, we offer a variety of safe and reliable online payment methods to ensure a seamless shopping experience for all our customers.\n\nAvailable Payment Options:\n• Credit & Debit Cards: We accept all major Visa and Mastercard cards.\n• Digital Wallets: Fast and secure checkout using local digital payment platforms.\n• Bank Transfer: Direct payment options for larger orders through our partnered banking institutions.\n\nSecurity Guarantee:\nYour financial information is encrypted using industry-standard SSL technology to ensure your transactions remain private and secure at all times.', 
    NULL
),
(
    '4', 
    'Warranty Terms', 
    'warranty-terms', 
    'Warranty Terms and Conditions\n\nAt Shopping App, we stand by the quality of the products we offer. Most items purchased through our platform come with a manufacturer''s warranty to ensure your peace of mind.\n\nCoverage Details:\n• Duration: Warranty periods vary by product category, typically ranging from 6 to 24 months.\n• What''s Covered: Defects in materials and workmanship under normal use.\n• What''s Not Covered: Damage resulting from misuse, unauthorized repairs, or accidental breakage.\n\nHow to Claim:\n1. Keep your original invoice or order confirmation.\n2. Contact our support team via the ''Contact Us'' page with your order details.\n3. Our team will guide you through the inspection and repair or replacement process.', 
    NULL
),
(
    '5', 
    'Personal Data Policy', 
    'personal-data-policy', 
    'Personal Data Protection Policy\n\nAt Shopping App, we value your privacy and are committed to protecting your personal information. This policy explains how we collect, use, and safeguard your data.\n\nInformation We Collect:\n• Account Information: Your name, email address, phone number, and shipping address provided during registration.\n• Transaction Data: Details of your purchases and payment history to facilitate your orders.\n• Usage Data: Information on how you interact with our application to improve your experience.\n\nHow We Use Your Data:\n• To process and deliver your orders efficiently.\n• To communicate updates regarding your account or promotions.\n• To enhance site security and prevent fraudulent activities.\n\nYour Rights:\nYou have the right to access, update, or request the deletion of your personal data at any time by contacting our support team.', 
    NULL
),
(
    '6', 
    'Our stores', 
    'our-stores', 
    '', 
    '[
      [
        {"name": "City Mall Saburtalo", "address": "Tbilisi, 1 P. Kavtaradze Str. Trade Center City Mall", "hours": "10:00 - 22:00"},
        {"name": "Saburtalo Branch", "address": "Tbilisi, 5 Sulkhan Tsintsadze St.", "hours": "10:00 - 20:00"},
        {"name": "Tbilisi Central", "address": "Tbilisi, 2 Station Square, Trade Center Tbilisi Central", "hours": "10:00 - 21:00"},
        {"name": "Tbilisi Mall", "address": "Tbilisi, 16th Km. Davit Aghmashenebeli Alley, Trade Center \"Tbilisi Mall\", 1st Floor", "hours": "10:00 - 22:00"},
        {"name": "East Point", "address": "Tbilisi, 2 Aleksandre Tvalchrelidze Str., Trade Center East Point", "hours": "10:00 - 22:00"}
      ]
    ]'::jsonb
);