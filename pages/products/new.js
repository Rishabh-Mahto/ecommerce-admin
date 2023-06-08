import Layout from "@/components/Layout";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";

export default function NewProduct() {
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [price, setPrice] = useState('');
    const [goToProducts, setGoToProducts] = useState(false);
    const router = useRouter();
    async function createProduct(ev) {
      ev.preventDefault();
      const data = {title, summary, price}
      await axios.post('/api/products', data);  
      setGoToProducts(true);
    }
    if (goToProducts) {
        router.push('/products');
    }
    return (
        <Layout>
        <form onSubmit={ createProduct }>
        <h1>New Product</h1>
        <label>Product Name</label>
        <b><input 
        type="text" 
        placeholder="product name" 
        value={title} 
        onChange={ev => setTitle(ev.target.value)}/></b>
        <label>About</label>
        <textarea 
        placeholder="Book Summary"
        value={summary} 
        onChange={ev => setSummary(ev.target.value)}/>
        <label>Price (in Rupees)</label>
        <input
        type="number" 
        placeholder="price"
        value={price}
        onChange={ev => setPrice(ev.target.value)}/>
        <button 
        type="submit"
        className="btn-primary">
        Save
        </button>
        </form>
        </Layout>
    )
}