const express = require("express");
const router = express.Router();
const controllers = require("../controllers/employeeController");

router.post("/", controllers.createEmployee);
router.get("/records", controllers.getAllEmployees);

module.exports = router;
