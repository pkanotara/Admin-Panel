import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import Admin from "../models/adminModel.js";

dotenv.config();

async function createAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    const existing = await Admin.findOne({ username: "admin" });
    if (existing) {
      console.log("⚠️ Admin already exists");
    } else {
      const hashed = await bcrypt.hash("abc123", 10);
      await Admin.create({ username: "admin", password: hashed });
      console.log("✅ Admin user created");
    }
  } catch (err) {
    console.error("❌ Error:", err.message);
  } finally {
    mongoose.connection.close();
  }
}

createAdmin();
