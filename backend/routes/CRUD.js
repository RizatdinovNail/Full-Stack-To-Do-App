import express from "express";
const router = express.Router();
import bcrypt from "bcrypt";
import userModel from "../models/User.js";
import todoModel from "../models/ToDo.js";
import tagModel from "../models/Tag.js";

router.get("/findUser/:id", async (req, res) => {
  const user = await userModel.findById(req.params.id);
  res.json(user);
});

router.post("/deleteUser", function (req, res) {
  userModel.findByIdAndDelete(req.body.id, function (err, data) {
    if (err) {
      console.log(err);
    } else {
      res.send(data);
      console.log("User is deleted");
    }
  });
});

router.post("/updateUser", function (req, res) {
  userModel.findByIdAndUpdate(
    req.body.id,
    { username: req.body.username },
    function (err, data) {
      if (err) {
        console.log(err);
      } else {
        res.send(data);
        console.log("User was updated");
      }
    },
  );
});

export default router;
