SELECT 
    IFNULL(source.department, 'No department') AS 'Department',
    source.employee_count AS 'Employee Count',
    concat('$', format(sum(source.utilized_budget), 2)) AS 'Total Utilized Budget'
FROM
(SELECT 
    IFNULL(department.name, 'No department') department,
    count(employee.id) employee_count,
    sum(role.salary) utilized_budget
FROM
    employee
    LEFT JOIN role ON employee.role_id = role.id
    LEFT JOIN department ON role.department_id = department.id
GROUP BY
    role.title, role.salary, department.name) source
GROUP BY
    source.employee_count,
    source.department