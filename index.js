const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./db");
const Staff = require("./models/staffModel");
const studentsRoutes = require("./routes/studentRoutes");

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

connectDB();

app.use("/api", index);

// APIs

app.get("/", (req, res) => {
  return res.status(200).json({
    message: "Welcome to our backend",
  });
});

// GET ALL

app.get("/staff", async (req, res) => {
  const staff = await Staff.find();

  return res.status(200).json({
    message: "success",
    count: staff.length,
    staff,
  });
});

// Get One

app.get("/staff/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const staff = await Staff.findById(id);

    return res.status(200).json({
      message: "sucess",
      staff,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
});

app.post("/staff", async (req, res) => {
  try {
    const { name, email, dept, location } = req.body;

    const alreadyExisting = await Staff.findOne({ email });

    if (alreadyExisting) {
      return res
        .status(400)
        .json({ message: "This staff account already exists!" });
    }

    const newStaff = new Staff({ name, email, dept, location });

    await newStaff.save();

    return res.status(200).json({
      message: "success",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Update one

app.put("/staff/:id", async (req, res) => {
  try {
    const id = req.params.id;

    const { name, email, dept, location } = req.body;

    const updatedStaff = await Staff.findOneAndUpdate(
      { _id: id },
      { name, email, dept, location },
      { new: true }
    );

    return res.status(200).json({
      message: "updated sucessfuly",
      updatedStaff,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

// Delete One

app.delete("/staff/:id", async (req, res) => {
  const id = req.params.id;

  const deleted = await Staff.findByIdAndDelete(id);

  return res.status(200).json({ message: "deleted successfully" });
});

const PORT = process.env.PORT || 7000;

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
