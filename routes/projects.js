const express = require("express");
const router = express.Router();
const {
  getAllProjects,
  getProjectDetails,
  addProject,
  updateProject,
  deleteProject,
} = require("../controllers/projects")

router.get("/", getAllProjects);
router.get("/:id", getProjectDetails);
router.post("/add", addProject);
router.put("/update/:id", updateProject);
router.delete("/delete/:id", deleteProject);

module.exports = router;
