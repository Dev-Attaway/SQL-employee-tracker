-- department IDs will be generated upon the seed being sourced, this is done though AUTO_INCREMENT
-- loading the departments with a name
INSERT INTO department (name)
VALUES ("Web Development"),
       ("Data Science"),
       ("Customer Service"),
       ("IT");

-- salary is a decimal value and is loaded into salary
-- department_id is a foreign key which references the department ID 
INSERT INTO role (title, salary, department_id)
VALUES ('Project Lead', 45231.12, 1 ),
       ('Analyst', 44557.5, 2),
       ('MSR', 65789.1, 3),
       ('Tech', 35123.12, 4);

-- department_id is a foreign key which references the department ID 
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("jim","cook", 1,2),
       ("john","smith", 3,2),
       ("Horus","Lupurcal", 4, NULL),
       ("Benny","Han", 2, 1);

       
