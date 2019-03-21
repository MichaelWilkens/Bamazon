CREATE DATABASE bamazon

USE bamazon 

CREATE TABLE products (
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100),
    department_name VARCHAR(100),
    price FLOAT(2),
    stock_quantity INT
    PRIMARY KEY (item_id)
)

INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES ('furby', 'toys', '25', '3')
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES ('bicycle', 'transportation', '225', '13')
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES ('spoon', 'kitchen', '2', '123')
INSERT INTO products(product_name, department_name, price, stock_quantity) VALUES ('chemistry textbook', 'books', '200', '12')
