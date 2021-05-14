SELECT
    IFNULL(concat(m.first_name, " ", m.last_name), 'No Manager') manager_name,
    GROUP_CONCAT(
        e.first_name, " ", e.last_name
        SEPARATOR ", "
    ) employees
FROM (employee e
    LEFT JOIN employee m ON m.id = e.manager_id)
GROUP BY
    manager_name
ORDER BY
    manager_name