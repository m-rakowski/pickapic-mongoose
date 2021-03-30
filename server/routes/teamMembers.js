const TeamMember = require("../model/teamMember");
const mongoose = require("mongoose");

module.exports = (router) => {
  router.get("/teamMembers", (req, res) => {
    TeamMember.find()
      .sort({ createdOn: 1 })
      .exec()
      .then((docs) => res.status(200).json(docs))
      .catch((err) =>
        res
          .status(500)
          .json({ message: "Error finding active team members", error: err })
      );
  });

  router.get("/teamMembers/:teamMemberId", (req, res) => {
    const qry = {
      _teamMemberId: mongoose.Types.ObjectId(req.params.teamMemberId),
    };

    TeamMember.findById(qry)
      .sort({ createdOn: 1 })
      .exec()
      .then((docs) => res.status(200).json(docs))
      .catch((err) =>
        res.status(500).json({
          message: "Errorrrr",
          error: err,
        })
      );
  });

  router.post("/teamMembers", (req, res) => {
    let note = new TeamMember(req.body);
    note.save((err, note) => {
      if (err) {
        return res.status(400).json(err);
      }
      res.status(200).json(note);
    });
  });
};
