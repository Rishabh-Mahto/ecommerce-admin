import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Spinner from "./spinner";
import { ReactSortable } from "react-sortablejs";

export default function ProductForm({
    _id,
    title:existingTitle, 
    summary:existingSummary, 
    price:existingPrice, 
    images: existingImages,
    category: assignedCategory,
    subCategory: assignedSubCategory,
    discount: assignedDiscount,
    languages: assignedLanguages,
    count: assignedCount,
}) {
    const [title, setTitle] = useState(existingTitle || '');
    const [summary, setSummary] = useState(existingSummary || '');
    const [price, setPrice] = useState(existingPrice || '');
    const [images, setImages] = useState(existingImages || []);
    const [goToProducts, setGoToProducts] = useState(false);
    const [isUploading, setIsUploading] = useState(false);
    const [selectedCategories, setSelectedCategories] = useState(
      assignedCategory || []
    );
    const [selectedSubCategories, setSelectedSubCategories] = useState(
      assignedSubCategory || []
    );
    const [languages, setLanguages] = useState(assignedLanguages || []);
    const [discount, setDiscount] = useState(assignedDiscount || '');
    const [count, setCount] = useState(assignedCount || '');
    const categories = ['Horror', 'Mystery', 'Crime', 'Romance', 'Thriller', 'Suspense', 'Fantasy', 'Mythology', 'Self help', 'Buisness', 'StartUp', 'Investing', 'Trading', 'Parenting', 'Poems', 'Geo political', 'Kids books', 'Autobiography', 'Health', 'Mental' ];
    const subCategories = ['Rent', 'Buy'];
    const router = useRouter();
    
    async function saveProduct(ev) {
      ev.preventDefault();
      const data = {
        title,
        summary, 
        price, 
        images, 
        category: selectedCategories, 
        subCategory: selectedSubCategories, 
        languages, 
        discount, 
        count,
      };
      if (_id) {
        //update
        await axios.put('/api/products/', {...data,_id});
      } else {
        //create
        await axios.post('/api/products', data);
      }
      setGoToProducts(true);
    }
    if (goToProducts) {
        router.push('/products');
    }
    async function uploadImages(ev) {
      const files = ev.target?.files;
      if (files?.length > 0) {
        setIsUploading(true);
        const data = new FormData();
        for (const file of files) {
          data.append('file', file);
        }
        const res = await axios.post('/api/upload', data);
        setImages(oldImages => {
          return [...oldImages, ...res.data.links];
        });
        setIsUploading(false);
      }
    }
    function updateImageOrder(images) {
      setImages(images);
    }

    function handleCatChange(event) {
      const selectedOptions = [...event.target.options]
      .filter(option => option.selected)
      .map(option => option.value);
      setSelectedCategories(selectedOptions);
   };

   function handleSubCatChange(event) {
    const selectedOptions = [...event.target.options]
      .filter(option => option.selected)
      .map(option => option.value);
    setSelectedSubCategories(selectedOptions);
  }

    return (
      <form onSubmit={ saveProduct }>
        <label>Product Name</label>
        <b><input 
          type="text" 
          placeholder="product name" 
          value={title} 
          onChange={ev => setTitle(ev.target.value)}/></b>

          <label>Category</label>
          <select multiple value={selectedCategories} onChange={handleCatChange}>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
          

        <label>Sub Category</label>
        <select multiple value={selectedSubCategories} onChange={handleSubCatChange}>
          {subCategories.map((subCategory, index) => (
            <option key={index} value={subCategory}>
              {subCategory}
            </option>
        ))}
        </select>


        <label>
          Photos
        </label>
        <div className="mb-2 flex flex-wrap gap-2">
        <ReactSortable 
        list={images} 
        className="flex flex-wrap gap-1"
        setList = {updateImageOrder}>
        {!!images?.length && images.map(link => (
          <div key={link} className="h-24 bg-white p-4 shadow-sm rounded-sm border border-gray-200">
            <img src={link} alt="" className="rounded-lg"/>
          </div>
        ))}
        </ReactSortable>
        {isUploading && (
          <div className="h-24 flex items-center">
            <Spinner />
          </div>
        )}
          <label className="w-24 h-24 cursor-pointer text-center flex flex-col items-center justify-center text-sm gap-1 text-primary rounded-sm bg-white shadow-sm border border-primary">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
            </svg>        
            <div>
              Add image
            </div>
            <input type="file" onChange={uploadImages} className="hidden"/>
          </label>
        </div>
        
        <label>Language</label>
        <input 
          type="text"
          placeholder="languages"
          value={languages} 
          onChange={ev => setLanguages(ev.target.value)}/>
        <label>About</label>
        <input 
          placeholder="Book Summary"
          value={summary} 
          onChange={ev => setSummary(ev.target.value)}/>
        <label>Price (in Rupees)</label>
        <input
          type="number" 
          placeholder="price"
          value={price}
          onChange={ev => setPrice(ev.target.value)}/>
        <label>Discount</label>
        <input 
          type="number" 
          placeholder="discount"
          value={discount}
          onChange={ev => setDiscount(ev.target.value)}/>
        <label>Count</label>
        <input 
          type="number" 
          placeholder="count"
          value={count}
          onChange={ev => setCount(ev.target.value)}/>
        <button 
          type="submit"
          className="btn-primary">
          Save
        </button>
      </form>
    )
}