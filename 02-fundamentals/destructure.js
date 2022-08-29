const deadpool = {
    name: 'Wade',
    lastname: "Winston",
    power: 'regeneration',
    getName() {
        return `${this.name} ${this.lastname} ${this.power}`;
    }
};

// console.log(deadpool.getName());

// const name = deadpool.name;
// const lastname = deadpool.lastname;
// const power = deadpool.power;

// console.log(name, lastname, power);

const {name, lastname, power, getName, age = 0} = deadpool;

console.log(name, lastname, power, getName, age);

const printArray = (...array) => {
    console.log(array);
};

printArray('Tema1', 'Batman', 'Superman', true);

const [, , h3] = ['Deadpool', 'Batman', 'Supergirl'];

console.log(h3);
