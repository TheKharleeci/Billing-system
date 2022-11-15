/* Replace with your SQL commands */
INSERT INTO "customer_info" (
    first_name,
    last_name,
    email,
    password,
    salt
) VALUES (
    'John',
    'Doe',
    'customer@gmail.com',
    '$2b$10$afJw.AS4KfRdstv76Ydc0eAkG.nJTUIA.RHC5BEkztSW.SBN7Ll5G',
    '$2b$10$afJw.AS4KfRdstv76Ydc0e'
)
ON CONFLICT (email)
DO
UPDATE
SET
first_name = EXCLUDED.first_name,
last_name = EXCLUDED.last_name,
password = EXCLUDED.password,
salt = EXCLUDED.salt;