SELECT
    e.id,
    concat(e.first_name, " ", e.last_name) name,
    role.title,
    dept.name department,
    role.salary,
    concat(mgr.first_name, " ", mgr.last_name) manager_name
FROM
    ((employee e
    LEFT JOIN employee mgr ON mgr.id = e.manager_id)
    LEFT JOIN role ON e.role_id = role.id
    LEFT JOIN department dept ON role.department_id = dept.id)
WHERE
    e.isManager = TRUE
ORDER BY
    name;