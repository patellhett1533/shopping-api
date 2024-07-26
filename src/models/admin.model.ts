import mongoose, { Schema, Document, Model } from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import paginate from "./plugins/paginate.plugins";
import toJSONPlugin from "./plugins/toJSON.plugins";

interface IAdmin extends Document {
  name: string;
  email: string;
  password: string;
  isVerified: boolean;
  matchPassword: (enteredPassword: string) => Promise<boolean>;
}

interface AdminModel extends Model<IAdmin> {
  isEmailTaken(email: string): Promise<boolean>;
  matchPassword(enteredPassword: string): Promise<boolean>;
  paginate(filter: any, options: any): Promise<any>;
  toJSONPlugin(schema: Schema): void;
}

const adminSchema = new mongoose.Schema<IAdmin>(
  {
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
      validate(value: string) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid email");
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      minlength: 8,
      validate(value: string) {
        if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
          throw new Error(
            "Password must contain at least one letter and one number"
          );
        }
      },
      private: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);
adminSchema.plugin(toJSONPlugin);
adminSchema.plugin(paginate);

adminSchema.methods.matchPassword = async function (
  enteredPassword: string
): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

adminSchema.statics.isEmailTaken = async function (
  email: string
): Promise<boolean> {
  const admin = await this.findOne({ email });
  return !!admin;
};

adminSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 8);
  }
  next();
});

const Admin = mongoose.model<IAdmin, AdminModel>("Admin", adminSchema);

export default Admin;
