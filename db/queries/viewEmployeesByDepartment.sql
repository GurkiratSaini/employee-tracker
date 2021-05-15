SELECT 
    IFNULL(dept.name, 'No Department') department_name,
    GROUP_CONCAT(
        e.first_name, " ", e.last_name
        SEPARATOR ", "
    ) employees
FROM (employee e
    LEFT JOIN role ON e.role_id = role.id
    LEFT JOIN department dept ON role.department_id = dept.id)
GROUP BY
    department_name
ORDER BY
    department_name;