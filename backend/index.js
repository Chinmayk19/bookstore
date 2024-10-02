
const port = 4001;
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
app.use(cors());
mongoose.connect(
    "mongodb+srv://student1234:student1234567890@cluster0.tnajmkf.mongodb.net/onlinetutor"
  );

  const UserDonatedBooks = mongoose.model("UserDonateBooks", {
    name: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    books: {
        type: Array,
        required: true
    }
  });
  
  app.post("/userbooks", async (req, res) => {
    try {
        const { userDetails, books } = req.body;
        const newDonation = new UserDonatedBooks({
            name: userDetails.name,
            phone: userDetails.phone,
            email: userDetails.email,
            books: books
        });
  
        await newDonation.save();
        res.status(201).send({ message: "Donation recorded successfully!" });
    } catch (error) {
        console.error("Error saving donation:", error);
        res.status(500).send({ message: "Error saving donation." });
    }
  });

    app.listen(port, (error) => {
    if (!error) {
      console.log("Server running on port " + port);
    } else {
      console.log("Error: " + error);
    }
  });