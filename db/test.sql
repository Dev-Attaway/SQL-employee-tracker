SELECT
        employee.id AS ID,
        employee.first_name AS Firstname,
        employee.last_name AS Lastname,
        role.title AS Title,
        department.name AS Department,
        role.salary AS Salary,
        CONCAT(managers.first_name, " ", managers.last_name ) AS Manager
        
        FROM department
        JOIN employee
        ON department.id = employee.role_id
        LEFT JOIN employee AS managers

        ON employee.manager_id = managers.id

        JOIN role
        ON role.id = department.id