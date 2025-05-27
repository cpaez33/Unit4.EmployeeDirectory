import express from "express";
import employees from "#db/employees";

const app = express();

app.get("/", (req, res) => {
  res.json("Hello employees!");
});

app.get("/employees", (req, res, next) => {
  res.json({ employees });
});

app.get("/employees/random", (req, res, next) => {
  try {
    const randomId = Math.floor(Math.random() * employees.length) + 1;
    const randomEmployee = employees.find((person) => person.id === randomId);
    // console.log(randomEmployee);

    res.send(randomEmployee);
  } catch (err) {
    next(err);
  }
});

app.get("/employees/:id", (req, res, next) => {
  try {
    // console.log("req", req.params);
    const { id } = req.params;

    const employee = employees.find((person) => person.id === Number(id));

    if (!employee) return res.status(404).send("That employee does not exist");

    res.send(employee);
  } catch (err) {
    next(err);
  }
});

export default app;
