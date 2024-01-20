import { mongooseConnect } from "@/lib/mongoose";
import { User } from "@/models/User";
// import { isAdminRequest } from "./auth/[...nextauth]";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();

  if (method === "GET") {
    const { email } = req.query;
    res.json(await User.findOne({ email }));
  }
}
