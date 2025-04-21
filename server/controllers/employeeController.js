const EmployeeDB = require("../models/Employees");

const getAllEmployees = async (req, res) => {
  try {
    const allEmployees = await EmployeeDB.find();
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
    const employeeExist = await EmployeeDB.findOne({ firstname });
    if (employeeExist) {
      return res.status(400).json({ message: "Employee already exist" });
    }
    await EmployeeDB.create({ firstname, lastname });
    res.status(200).json({ message: "employee created successfully" });
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const updateEmployee = async (req, res) => {
  if (!req?.body?.id)
    return res.status(400).json({ message: "Missing required id" });

  const employeeExist = await EmployeeDB.findOne({ _id: req.body.id });
  if (!employeeExist)
    return res
      .status(404)
      .json({ message: `Employee with this id ${req.body.id} not found` });
  if (req.body.firstname) employeeExist.firstname = req.body.firstname;
  if (req.body.lastname) employeeExist.lastname = req.body.lastname;
  const result = await employeeExist.save();
  res.status(200).json({ message: "employee updated successfully" });
};

const deleteEmployee = async (req, res) => {
  const id = req.params.id;
  const employeeExist = await EmployeeDB.findById(id);
  if (!employeeExist)
    return res
      .status(404)
      .json({ message: `Employee with this id ${id} not found` });
  await EmployeeDB.findByIdAndDelete(id);
  res.status(200).json({ message: "Employee deleted successfully" });
};

const getSingleEmployee = async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: "No employee id present" });
  const employee = await EmployeeDB.findOne({ _id: req.params.id }).exec();
  if (!employee)
    return res
      .status(204)
      .json({ message: `No employee matches ID ${req.params.id}` });
  res.status(200).json(employee);
};

module.exports = {
  createEmployee,
  getAllEmployees,
  updateEmployee,
  deleteEmployee,
  getSingleEmployee,
};
