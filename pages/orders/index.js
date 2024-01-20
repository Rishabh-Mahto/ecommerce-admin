import Layout from "@/components/Layout";
import Link from "next/link";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

export default function Order() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    axios.get("/api/orders").then((response) => {
      setOrders(response.data);
    });
  }, []);
  return (
    <Layout>
      <table className="basic mt-2">
        <thead>
          <tr>
            <td>orders name</td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order.status}</td>
              <td>
                <Link className="btn-default" href={"/orders/" + order._id}>
                  See Order
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
}
