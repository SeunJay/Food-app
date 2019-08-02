const mongoose = require("mongoose");
const crypto = require("crypto");
const uuidv1 = require("uuid/v1");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      require: true,
      trim: true
    },
    lastName: {
      type: String,
      require: true,
      trim: true
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: 32
    },
    hashed_password: {
      type: String,
      required: true
    },
    about: {
      type: String,
      trim: true
    },
    salt: String,
    role: {
      type: Number,
      default: 0
    },
    history: {
      type: Array,
      default: []
    }
    // date: {
    //   type: Date,
    //   default: Date.now
    // }
  },
  { timestamps: true }
);


//virtual field
userSchema.virtual("password")
  .set(function(password) {
    this._password = password;
    this.salt = uuidv1();
    this.hashed_password = this.encryptPassword(password);
  })

  .get(function() {
    return this._password;
  });

userSchema.methods = {
  authenticate: function(plainText){
    return this.encryptPassword(plainText) === this.hashed_password
  },

  encryptPassword: function(password) {
    if (!password) return "";
    try {
      return crypto
        .createHmac("sha1", this.salt)
        .update(password)
        .digest("hex");
    } catch (error) {
      return "";
    }
  }
};

module.exports = mongoose.model("users", userSchema)
