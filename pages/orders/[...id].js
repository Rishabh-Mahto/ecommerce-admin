import Layout from "@/components/Layout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductForm from "@/components/ProductForm";

export default function OrderPage() {
  const [orderInfo, setOrderInfo] = useState();
  const [userInfo, setUserInfo] = useState();
  const [productsInfo, setProductsInfo] = useState([]);

  const router = useRouter();
  const { id } = router.query;

  const getAllDetails = async (id) => {
    const orderData = await axios.get("/api/orders?id=" + id);
    setOrderInfo(orderData.data);
    const userData = await axios.get("/api/users", {
      params: {
        email: orderData.data.userEmail,
      },
    });
    setUserInfo(userData.data);

    for (const product of orderData.data.productId) {
      const productData = await axios.get("/api/products?id=" + product);
      setProductsInfo((prev) => [...prev, productData.data]);
    }
  };
  useEffect(() => {
    if (!id) {
      return;
    }
    getAllDetails(id);
  }, [id]);

  return (
    <Layout>
      <h1>Order Detail</h1>
      <div>
        <p>{orderInfo?.isRentOrder ? "Rent Order" : "Buy Order"}</p>
        <h2>Delivery Address -</h2>
        {orderInfo?.deliveryAddress && (
          <div>
            <p>
              {orderInfo.deliveryAddress.streetAddress},{" "}
              {orderInfo.deliveryAddress.city},{" "}
              {orderInfo.deliveryAddress.state}-
              {orderInfo.deliveryAddress.postalCode},{" "}
              {orderInfo.deliveryAddress.country}
            </p>
          </div>
        )}

        <p>{userInfo?.name}</p>
        <p>{userInfo?.phone}</p>
        <hr />
        <div>
          {productsInfo?.map((product) => (
            <p key={product._id}>
              {product?.title} - ₹{product?.price}
            </p>
          ))}
        </div>
      </div>
    </Layout>
  );
}
