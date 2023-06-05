import React, { useEffect, useRef, useState } from 'react'
import './AdminProduct.css'
import axios from 'axios'
import { adminUrl } from '../../../../apiLink/apiLink'
import { toast } from 'react-hot-toast'

import { deleteProduct, getNewCategory, getProduct } from '../../../apiCall/admin'


export default function AdminProduct() {
    const inputRef = useRef();
   
    const [showModal,setShowModal] = useState(false)
    const [productName,setProductName] = useState()
    const [description,setDescription] = useState()
    const [price,setPrice] = useState()
    const [discount,setDiscount] = useState()
    const [category,setCategory] = useState()
    const [image,setImage] = useState([])
    const [selectedImage,setSelectedImage] = useState(null)
    const [previewUrl, setPreviewUrl] = useState(null);
    const [products,setProducts] = useState([])
    const [dropDown,setDropDown] = useState([])
    const productData={
        productName,
        description,
        price,
        discount,
        category,
    }
    useEffect(()=>{
      const fetchData = async()=>{
      const response = await getProduct()
      if(response.success){
      setProducts(response.data)
      }
      const response2 = await getNewCategory()
      if(response2.success){
        setDropDown(response2.data)
        }
      }
      fetchData()
    },[])
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setSelectedImage(file);
        if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
            setPreviewUrl(reader.result);
          };
          reader.readAsDataURL(file);
        }
      };

    const addProduct =async(e)=>{
        e.preventDefault()
        let imageData
        const reader = new FileReader()
        reader.readAsDataURL(image)
        reader.onloadend = () => {
          imageData = reader.result
          axios.post(`${adminUrl}post-product`, { productData, imageData })
            .then((response) => {
                console.log(response);
                setShowModal(false)
               if(response.data.success){
                setProducts(response.data.data)
               }else{
                toast.error('somthing went wrong')
               }
               
            }).catch(() => {
              toast.error('An Error Occured')
            })
        }
    }

    const handleDelete = async(productId)=>{
        const response = await deleteProduct(productId)
        if(response.success){
            setProducts(response.data)
        }
    }
  return (
    <div className='m-3'>
         <div className="flex justify-between mb-3 mt-1">
    <h2 className="font-bold text-lg uppercase px-3 py-2">
      Shows 
    </h2>
        <button onClick={()=>setShowModal(true)} className='bg-green-600 hover:bg-green-500 text-white font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'>add</button>
        </div>
        <div className="overflow-x-auto" >
    <table className="table-auto min-w-full divide-y divide-gray-300" style={{ border: "0.5px solid black" }}>
        <thead className="bg-gray-900 text-white">
          <tr>
            <th className="px-6 py-4 text-center font-semibold uppercase">No</th>
            <th className="px-6 py-4 text-center font-semibold uppercase"></th>
            <th className="px-6 py-4 text-center font-semibold uppercase">Product</th>
            <th className="px-6 py-4 text-center font-semibold uppercase">Category</th>
            <th className="px-6 py-4 text-center font-semibold uppercase">Description</th>
            <th className="px-6 py-4 text-center font-semibold uppercase">Price</th>
            <th className="px-6 py-4 text-center font-semibold uppercase">Discount</th>
            <th className="px-6 py-4 text-center font-semibold uppercase">Status</th>
            <th className="px-6 py-4 text-center font-semibold uppercase">Action</th>
            <th className="px-6 py-4" />
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {products.map((pro, index) => (
            <tr key={pro._id} >
              <td className="px-6 py-4 whitespace-nowrap">
                { index + 1}
              </td>
              <td className=" py-4 whitespace-nowrap">
              <img src={pro.images} alt='ID Proof'  className="cursor-pointer w-20 h-"/>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
               {pro.productName}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
               {pro.category}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
               {pro.description}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
               {pro.price}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
               {pro.discount}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
               {pro.status}
              </td>
        
              <td className="px-6 py-4 whitespace-nowrap">
              <button
                    onClick={()=>handleDelete(pro._id)}
                    
                    type="button"
                    className="inline-block rounded bg-danger px-6 pt-2.5 pb-2 text-sm font-bold uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)]">
                       Delete
                  </button>
              </td> 
            </tr>
          ))}
        </tbody>
      </table>
     
    </div>
        {showModal?(
             <form className='relative z-50' onSubmit={addProduct}>
             <div className="formcontainer" style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)",minWidth:'50vh', backgroundColor: "#fefefe", padding: "20px", borderRadius: "5px", boxShadow: "0 0 20px rgba(0,0,0,0.3)", zIndex: 1 }}>
               
             <h1 className='font-semibold large-heading pb-2'>Add Product</h1>
               <hr/>
               <div className='mt-2'>
        <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Product Name</label>
        <input onChange={(e)=>setProductName(e.target.value)} type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-black-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required />
      </div>
      <div className='mt-2'>
        <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Description</label>
        <input onChange={(e)=>setDescription(e.target.value)}  type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-black-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required />
      </div>
      <div className='mt-2'>
        <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Price in Rupees</label>
        <input onChange={(e)=>setPrice(e.target.value)}  type="number" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-black-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required />
      </div>
      <div className='mt-2'>
        <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Discount in %</label>
        <input onChange={(e)=>setDiscount(e.target.value)}  type="number" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-black-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required />
      </div>
      <div className='mt-2'>
        <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Category</label>
        <select
      
  className="w-full p-2.5 text-black border rounded-md outline-none appearance-none focus:border-indigo-600"
  value={category}
  onChange={(e) => setCategory(e.target.value)}
>
  {dropDown.map((list) => (
    <option value={list}  className='bg-white text-black' key={list} ref={inputRef} >{list}</option>
  ))}
</select>


      </div>
      <div className='mt-2'>
        <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Image</label>
        <input onChange={(e)=>(setImage(e.target.files[0]),handleImageUpload(e))}  type="file" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-black-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required />
        {previewUrl && <img className='m-2 w-20 h-20' src={previewUrl} alt="Preview" />}
      </div>
               <div className="flex justify-center mt-4">
                 <button type='submit' className="bg-green-600 hover:bg-green-500 text-white font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mr-4">
                   Add
                 </button>
                 <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 border border-gray-700 rounded" onClick={() => setShowModal(false)}>
                   Cancel
                 </button>
               </div>
             </div>
           </form>
        ):null}
    </div>
  )
}
