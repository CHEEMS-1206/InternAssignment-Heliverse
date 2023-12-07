import mongoose from "mongoose";
const ObjectId = mongoose.Types.ObjectId;

const userSchema = new mongoose.Schema({
  _id: {
    type: String,
    default: function () {
      return new ObjectId().toString();
    },
  },
  u_id : {
    type : Number,
    required : true,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, "Please enter a valid email"],
  },
  gender: {
    type: String,
    enum: ["Male", "Female", "Gender Fluid"],
  },
  avatar: {
    type: String,
    validate: {
      validator: function (v) {
        return /^(http|https):\/\/[^ "]+$/.test(v);
      },
      message: (props) => `${props.value} is not a valid URL!`,
    },
  },
  domain: {
    type: String,
    enum: [
      "Sales",
      "Finance",
      "Marketing",
      "Management",
      "UI Designing",
      "Web Development",
    ],
  },
  available: {
    type: Boolean,
    default: true,
  },
});
const usersModel = mongoose.model("usersModel", userSchema);
export default usersModel;
