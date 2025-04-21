const express = require("express");
const router = express.Router();
const controllers = require("../controllers/employeeController");

router.post("/", controllers.createEmployee);
router.get("/records", controllers.getAllEmployees);
router.get("/record/:id", controllers.getSingleEmployee);
router.put("/update/:id", controllers.updateEmployee);
router.delete("/delete/:id", controllers.deleteEmployee);

module.exports = router;
