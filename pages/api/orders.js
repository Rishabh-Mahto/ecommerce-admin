import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
// import { isAdminRequest } from "./auth/[...nextauth]";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();

  if (method === "GET") {
    if (req.query?.id) {
      res.json(await Order.findOne({ _id: req.query.id }));
    } else {
      res.json(await Order.find());
    }
  }

  if (method === "PUT") {
    const { status, _id } = req.body;
    await Order.updateOne(
      { _id },
      {
        status,
      }
    );
    res.json(true);
  }

  if (method === "DELETE") {
    if (req.query?.id) {
      await Order.deleteOne({ _id: req.query?.id });
      res.json(true);
    }
  }
}
