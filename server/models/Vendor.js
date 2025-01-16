const { Schema, model } = require("mongoose");

const vendorSchema = new Schema(
  {
    fullName: { type: String, required: true }, 
    email: { type: String, required: true, unique: true }, 
    phone: { type: String, required: true }, 
    category: { 
      type: String,
      required: true,
      enum: ["Makeup", "Hair", "Photography", "DJ", "Catering", "Decoration", "Other"],
    },
    region: { 
      type: String,
      required: true,
      enum: ["North", "Center", "South"],
    },
  },
  { collection: "vendors" });

const Vendor = model('Vendor', vendorSchema);

module.exports = Vendor;
