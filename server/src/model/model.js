const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const registerSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  repassword: String,
  tokens: [
    {
      token: {
        type: String,
      },
    },
  ],
});

// create auth token
registerSchema.methods.generateAuthToken = async function () {
  try {
    const token = jwt.sign(
      { _id: this._id.toString() },
      process.env.SECRET_KEY
    );
    this.tokens = this.tokens.concat({ token });
    await this.save();
    return token;
  } catch (err) {
    if (err) throw err;
  }
};

// converting password to hash
registerSchema.pre("save", async function (next) {
  try {
    if (this.isModified("password")) {
      this.password = await bcrypt.hash(this.password, 10);
      this.repassword = await bcrypt.hash(this.password, 10);
    }
    next();
  } catch (err) {
    if (err) throw err;
  }
});

const Register = new mongoose.model("UserInfo", registerSchema);

module.exports = Register;
