import { model, models, Schema } from "mongoose";

export const AddressSchema = new Schema({
  city: String,
  postalCode: String,
  streetAddress: String,
  state: String,
  country: String,
});

const UserSchema = new Schema({
  email: { type: String, unique: true, required: true },
  name: String,
  image: String,
  address: [AddressSchema],
  phone: String,
  isMembershipActive: { type: Boolean, required: true, default: false },
  membershipEndsOn: { type: Date, default: new Date() },
});

export const User = models?.User || model("User", UserSchema);
