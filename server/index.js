const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "ghjcnjvb[fqkj",
    database: "employeeSystem"
})

app.post("/create", (req, res) => {
        const { name, age, country, position, wage } = req.body

        db.query("INSERT INTO employees (name, age, country, position, wage) VALUES (?,?,?,?,?)",
            [name, age, country, position, wage],
            (err, result) => {
                if (err) {
                    console.log(err.message)
                } else {
                    console.log(result)
                    res.set('Access-Control-Allow-Origin', '*')
                    res.send("Employee was added")
                }
            }
        );
});

app.get("/employees", (req, res) => {
    db.query("SELECT * FROM employees", (err, result) => {
        if (err) {
            console.log(err);
        } else {
            res.send(result);
        }
    });
});

app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM employees WHERE id = ?", id, (err, result) => {
        if (err) {
            console.log('111')
            console.log(err);
        } else {
            res.send(result)
        }
    });
});

app.put('/update', (req, res) => {
    const id = req.body.id
    const wage = req.body.wage
    db.query(`UPDATE employees SET wage = ? WHERE id = ?`,
        [wage, id]
        ,(err, result) => {
        if (err) {
            console.log(err.message)
        } else {
            res.send(result)
        }
    })
})

app.listen(3001, () => {
    console.log('Yey, your server is running on port 3001')
})