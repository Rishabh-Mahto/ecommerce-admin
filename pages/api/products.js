import { Product } from "@/models/Products";
import { mongooseConnect } from "@/lib/mongoose";

export default async function handle(req, res) {
  const {method} = req;
  await mongooseConnect();

  if (method === "GET") {
    res.json(await Product.find());
  }

  if (method === 'POST') {
    const {title, summary, price} = req.body;
    const productDoc = await Product.create({
      title,
      summary,
      price,
    })
    res.json(productDoc);
  }
}
