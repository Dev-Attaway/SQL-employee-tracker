INSERT INTO department (name)
VALUES ("Web Development"),
       ("Data Science"),
       ("Math"),
       ("Electives");

INSERT INTO role (title, salary, department_id)
VALUES ('cook', 45231.12, 1 ),
       ('robot', 44557.5, 2),
       ('teacher', 65789.1, 3),
       ('sales', 35123.12, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("jim","cook", 1,2),
       ("john","smith", 3,2),
       ("Horus","Lupurcal", 4, NULL),
       ("Benny","Han", 2, 1);

       
