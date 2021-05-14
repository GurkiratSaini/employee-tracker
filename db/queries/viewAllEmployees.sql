SELECT 
    e.id,
    e.first_name,
    e.last_name,
    role.title,
    dept.name department,
    role.salary,
    concat(m.first_name, " ", m.last_name) manager_name
FROM
    ((employee e
    LEFT JOIN employee m ON m.id = e.manager_id)
    LEFT JOIN role ON e.role_id = role.id
    LEFT JOIN department dept ON role.department_id = dept.id)
ORDER BY
    e.first_name;