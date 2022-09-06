import http from "http";

http.createServer((req, res) => {
    //res.setHeader("Content-Disposition", "attachment; filename=list.csv");
    res.writeHead(200, { "Content-Type": "application/json" });

    const person = {
        name: "Martin",
        lastname: "Santa!!!",
    };

    res.write(JSON.stringify(person));

    res.end();
}).listen(8005);

console.log("Listening on the port", 8005);
