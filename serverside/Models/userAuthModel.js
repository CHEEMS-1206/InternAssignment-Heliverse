import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  u_id : {type : Number, required : true}
});

const userModel = mongoose.model("userModel", userSchema);
export default userModel;