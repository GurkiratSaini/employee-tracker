-- INCOMPLETE

SELECT
    IFNULL(dept.name, 'No Department') department_name,
    GROUP_CONCAT(
        e.first_name, " ", e.last_name
        SEPARATOR ", "
    ) employees
FROM (employees e
    LEFT JOIN department dept ON dept.id = e.)