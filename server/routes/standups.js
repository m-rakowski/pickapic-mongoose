const Standup = require("../model/standup");
const mongoose = require("mongoose");

module.exports = (router) => {
  router.get("/standups", (req, res) => {
    Standup.find()
      .sort({ createdOn: 1 })
      .exec()
      .then((docs) => res.status(200).json(docs))
      .catch((err) =>
        res
          .status(500)
          .json({ message: "Error finding active projects", error: err })
      );
  });

  router.get("/standup/:teamMemberId", (req, res) => {
    const qry = {
      _teamMemberId: mongoose.Types.ObjectId(req.params.teamMemberId),
    };

    Standup.findById(qry)
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

  router.post("/standup", (req, res) => {
    let note = new Standups(req.body);
    note.save((err, note) => {
      if (err) {
        return res.status(400).json(err);
      }
      res.status(200).json(note);
    });
  });
};
