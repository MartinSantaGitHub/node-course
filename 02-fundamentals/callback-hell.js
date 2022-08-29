export const employees = [
    {
        id: 1,
        name: "Fer",
        salary: 1000,
    },
    {
        id: 2,
        name: "Linda",
        salary: 2000,
    },
    {
        id: 3,
        name: "Karen",
    },
];

const getEmployee = (id) => {
    return (
        employees.find((emp) => emp.id === id) ??
        `Employee with id ${id} does not exist`
    );
};

//console.log(getEmployee(5));

const getSalary = (salary, callback) => {
    const employee = employees.find((emp) => emp.salary === salary);

    if (employee) {
        callback(null, employee);
    } else {
        callback(`Salary with mount ${salary} does not exist`);
    }
};

// getSalary(2000, (err, salary) => {
//     if (err) {
//         console.log("ERROR!");

//         return console.log(err);
//     }

//     console.log("Salary exists!");
//     console.log(salary);
// });
