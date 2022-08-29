import { employees } from "./callback-hell.js";

export const getEmployeeById = (id) => {
    return new Promise((resolve, reject) => {
        const employee = employees.find((emp) => emp.id === id);

        employee
            ? resolve(employee)
            : reject(`Employee with id ${id} does not exist`);
    });
};

export const getEmployeeBySalary = (salary) => {
    return new Promise((resolve, reject) => {
        const employee = employees.find((emp) => emp.salary === salary);

        employee
            ? resolve(employee)
            : reject(`Employee with salary ${salary} does not exist`);
    });
};

const id = 5;
const salary = 2000;

// getEmployeeById(id)
//     .then((emp) => console.log(emp))
//     .catch((err) => console.log(err));

// getEmployeeBySalary(salary)
//     .then((emp) => console.log(emp))
//     .catch((err) => console.log(err));

// getEmployeeById(id)
//     .then((emp) => {
//         getEmployeeBySalary(emp.salary)
//             .then((emp) => console.log(emp.salary))
//             .catch((err) => console.log(err));
//     })
//     .catch((err) => console.log(err));

// Chained Promises

// getEmployeeById(id)
//     .then((emp) => getEmployeeBySalary(emp.salary))
//     .then((emp) => console.log(emp))
//     .catch((err) => console.log(err));
