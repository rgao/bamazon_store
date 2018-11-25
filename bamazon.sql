USE bamazon;

-- DROP TABLE IF EXISTS products;

-- CREATE TABLE products (
--     id INTEGER NOT NULL auto_increment,
--     product_name VARCHAR(50) NOT NULL,
--     department_name VARCHAR(50) NULL,
--     price DECIMAL(10, 2) NULL,
--     stock_quantity INTEGER NULL,
--     PRIMARY KEY (id)
-- );

-- INSERT INTO products (product_name, department_name, price, stock_quantity)
--     VALUES ('Blueberry Matcha Latte', 'Drinks', 4.75, 33),
--     ('Mangosteen Milk Tea', 'Drinks', 6.95, 8),
--     ('Squirrel', 'Pets', 69.00, 5),
--     ('Chihuahua', 'Pets', 256.00, 3),
--     ('Ferret', 'Pets', 108.80, 4),
--     ('Blender', 'Cookware', 19.88, 12),
--     ('Cauldron', 'Cookware', 30.52, 10),
--     ('Seasoning Mix', 'Food', 3.77, 42),
--     ('Potato', 'Food', 0.33, 99),
--     ('Mixed Veggie Bag', 'Food', 4.61, 57);

SELECT * FROM products;