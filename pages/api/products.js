import { Product } from "@/models/Products";
import { mongooseConnect } from "@/lib/mongoose";
import { isAdminRequest } from "./auth/[...nextauth]";

export default async function handle(req, res) {
  const { method } = req;
  await mongooseConnect();
  await isAdminRequest(req, res);

  if (method === "GET") {
    if (req.query?.id) {
      res.json(await Product.findOne({ _id: req.query.id }));
    } else {
      res.json(await Product.find());
    }
  }

  if (method === "POST") {
    const {
      title,
      summary,
      price,
      images,
      category,
      subCategory,
      languages,
      discount,
      count,
    } = req.body;
    const productDoc = await Product.create({
      title,
      summary,
      price,
      images,
      category,
      subCategory,
      languages,
      discount,
      count,
    });
    res.json(productDoc);
  }

  if (method === "PUT") {
    const {
      title,
      summary,
      price,
      images,
      category,
      subCategory,
      languages,
      discount,
      count,
      _id,
    } = req.body;
    await Product.updateOne(
      { _id },
      {
        title,
        summary,
        price,
        images,
        category,
        subCategory,
        languages,
        discount,
        count,
      }
    );
    res.json(true);
  }

  if (method === "DELETE") {
    if (req.query?.id) {
      await Product.deleteOne({ _id: req.query?.id });
      res.json(true);
    }
  }
}
