const Project = require("../model/project");

module.exports = (router) => {
  router.get("/projects", (req, res) => {});
  router.post("/projects", (req, res) => {
    let project = new Project(req.body);
    project.save((err, note) => {
      if (err) {
        return res.status(400).json(err);
      }
      res.status(200).json(note);
    });
  });
};
