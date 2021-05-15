SELECT 
    IFNULL(department.name, 'No department') department,
    count(employee.id) employee_count,
    sum(role.salary) utilized_budget
FROM
    employee
    LEFT JOIN role ON employee.role_id = role.id
    LEFT JOIN department ON role.department_id = department.id
GROUP BY
    role.title, role.salary, department.name