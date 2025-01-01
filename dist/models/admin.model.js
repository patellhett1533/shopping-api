"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const validator_1 = __importDefault(require("validator"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const paginate_plugins_1 = __importDefault(require("./plugins/paginate.plugins"));
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator_1.default.isEmail(value)) {
                throw new Error("Invalid email");
            }
        },
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 8,
        validate(value) {
            if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
                throw new Error("Password must contain at least one letter and one number");
            }
        },
        private: true,
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
}, {
    toJSON: {
        virtuals: true,
        transform: function (doc, ret) {
            delete ret.password;
            ret.id = ret._id;
            delete ret._id;
        }
    }
});
userSchema.plugin(paginate_plugins_1.default);
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcryptjs_1.default.compare(enteredPassword, this.password);
};
userSchema.statics.isEmailTaken = async function (email) {
    const user = await this.findOne({ email });
    return !!user;
};
userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcryptjs_1.default.hash(this.password, 8);
    }
    next();
});
const User = mongoose_1.default.model("User", userSchema);
exports.default = User;
