DROP DATABASE IF EXISTS company_db;
CREATE DATABASE company_db;

USE company_db;

CREATE TABLE department (
  id INT NOT NULL  PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(30) NOT NULL
);

CREATE TABLE role (
  id INT NOT NULL  PRIMARY KEY AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL,
  department_id INT,
  FOREIGN KEY (department_id) 
  REFERENCES department(id)
);

CREATE TABLE employee (
  id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, 
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT,
  manager_id INT,
  CONSTRAINT  FOREIGN KEY (role_id) 
  REFERENCES role(id),
  CONSTRAINT  FOREIGN KEY (role_id) 
  REFERENCES role(id)
);

