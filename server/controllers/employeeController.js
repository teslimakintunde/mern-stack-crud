const Employees = require("../models/Employees");

const getAllEmployees = async (req, res) => {
  try {
    const allEmployees = await Employees.find();
    if (!allEmployees || allEmployees.length === 0) {
      return res.status(400).json({
        message: "There is no employee record. Click add to input records",
      });
    }
    return res.status(201).json(allEmployees);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Inter server error" });
  }
};

const createEmployee = async (req, res) => {
  const { firstname, lastname } = req.body;
  if (!firstname || !lastname)
    return res.status(400).json({ message: "Missing required fields" });
  try {
    const employeeExist = await Employees.findOne({ firstname });
    if (employeeExist) {
      return res.status(400).json({ message: "Employee already exist" });
    }
    const newEmployee = await Employees.create({ firstname, lastname });
    res.status(201).json({ message: "employee created successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

module.exports = { createEmployee, getAllEmployees };
