const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema(
    {
        partnerOneName: { type: String, required: false },
        partnerTwoName: { type: String, required: false },
        username: { type: String, required: false, unique: true },
        email: { type: String, required: false, unique: true },
        phone: { type: String, required: true },
        password: { type: String, required: true },
        role: {
            type: String,
            enum: ["Bride", "Groom", "Other"],
            default: "Bride",
        },
        coupleType: {
            type: String,
            enum: ["BrideAndGroom", "BrideAndBride", "GroomAndGroom"],
            default: "BrideAndGroom",
        },
        weddingDate: { type: Date, required: true },
        completedTasks: {
            progress: { type: Number, default: 0, min: 0, max: 100 },
            tasks: [{ type: String, default: [] }],
        }
    },
    { collection: "users" }
);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

const User = model('User', userSchema);

module.exports = User;