const { Model } = require("sequelize");
const { Task } = require("../models/task.model");
const { User } = require("../models/user.model");

const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const newUser = await User.create({
      name,
      email,
      password,
    });
    res.status(201).json({
      status: "success",
      data: { newUser },
    });
  } catch (error) {
    console.log(error);
  }
};

const getAllUser = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["id", "name"],
      include: [
        {
          model: Task,
          attributes: [
            "id",
            "title",
            "startDate",
            "limitDate",
            "finishDate",
            "status",
          ],
        },
      ],
    });
    res.status(200).json({
      status: "success",
      data: { users },
    });
  } catch (error) {
    console.error(error);
  }
};

const updateUser = async (req, res) => {
  try {
    const { name, email } = req.body;
    const { user } = req;
    user.update({ name, email });
    res.status(200).json({
      status: "success",
      data: { user },
    });
  } catch (error) {
    console.error(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = req.user;
    await user.update({ status: "unactive" });
    res.status(204).json({ status: "success" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createUser,
  getAllUser,
  updateUser,
  deleteUser,
};
