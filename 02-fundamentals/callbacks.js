//setTimeout(() => console.log("Something"), 1000);

const getUserById = (id, callback) => {
    const user = {
        id,
        name: "Santa"
    };

    setTimeout(() => callback(user), 1500);
};

getUserById(10, (user) => {
    console.log(user);
});
