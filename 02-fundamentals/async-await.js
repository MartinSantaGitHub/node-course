import { getEmployeeById, getEmployeeBySalary } from "./promises.js";

const id = 5;

const getInfoUser = async (id) => {
    const employee = await getEmployeeById(id);
    const salary = await getEmployeeBySalary(employee.salary);

    return `The salary of employee id = ${id} is ${employee.salary}`;
};

try {
    console.log(await getInfoUser(id));
} catch (err) {
    console.log(err);
}
