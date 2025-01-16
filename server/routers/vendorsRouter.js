const { Router } = require("express");
const { vendorsController } = require("../controllers/vendorsController");
const vendorsRouter = Router();

vendorsRouter.get("/", vendorsController.getAllVendors);

module.exports = vendorsRouter;
