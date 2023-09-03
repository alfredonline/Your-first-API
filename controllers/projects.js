const Project = require("../models/project");

exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find();
    res.status(200).json(projects);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getProjectDetails = async (req, res) => {
  // get project details

  const id = req.params.id;

  try {
    const project = await Project.findById(id);
    if (!project) {
      return res.status(404).json({ message: "Project not found." });
    } else {
      return res.status(200).json(project);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.addProject = async (req, res) => {
  try {
    const { title, tag, description } = req.body;
    if (!title || !tag || !description) {
      return res.status(400).json({ message: "All fields are required." });
    }
    const project = new Project({
      title,
      tag,
      description,
    });

    const newProject = await project.save();

    res.status(201).json(newProject);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateProject = async (req, res) => {
  const id = req.params.id;

  try {
    const project = await Project.findById(id);
    if (!project) {
      res.send("Project not found.");
    } else {
      const { title, tag, description } = req.body;
      project.title = title || project.title;
      project.tag = tag || project.tag;
      project.description = description || project.description;
      await project.save();
      res.status(200).json(project);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.deleteProject = async (req, res) => {
  const id = req.params.id;

  try {
    const projectDeletion = await Project.findByIdAndDelete(id);
    if (!projectDeletion) {
      res.status(404).json({ message: "Project not found." });
    }
    res.status(200).json({ message: "Project deleted." });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
