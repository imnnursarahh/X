import { config } from "../config.mjs";
import Mongoose from "mongoose";

export async function connectDB() {
  return Mongoose.connect(config.db.host, {
    dbName: "xdb",
  });
}

export function userVirtualId(schema) {
  schema.virtual("id").get(function () {
    return this._id.toString();
  });
  schema.set("toJSON", { virtual: true });
  schema.set("toObject", { virtual: true });
}
