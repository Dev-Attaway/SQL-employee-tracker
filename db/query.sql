
-- https://learnsql.com/blog/how-to-join-3-tables-or-more-in-sql/

SELECT 
    department.name AS Department,
    role.title AS Position,
    employee.first_name AS Firstname,
    employee.last_name AS Lastname

FROM department
JOIN employee
ON department.id = employee.role_id
JOIN role
ON role.id = department.id
