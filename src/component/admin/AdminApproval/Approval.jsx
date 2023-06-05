import React, { useEffect, useState } from 'react'
import { pendingProduct, productApproval } from '../../../apiCall/admin'

export default function Approval() {
    const [products,setProducts] = useState([])
    useEffect(()=>{
        const fetchData = async()=>{
        const response = await pendingProduct()
        if(response.success){
           setProducts(response.data)
        }
        }
        fetchData()
    },[])
     
   const handleApprove = async(productId)=>{
       const response = await productApproval(productId)
       if(response.success){
        setProducts(response.data)
       }
   }
  return (
    <div className='m-3'>
        {products.length? (
            <>
            <div className="flex justify-between mb-3 mt-1">
            <h2 className="font-bold text-lg uppercase px-3 py-2">
             Product Approval
            </h2>
            
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
                     <td className=" whitespace-nowrap">
                     <img src={pro.images} alt='ID Proof'  className="cursor-pointer w-20 "/>
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
                           onClick={()=>handleApprove(pro._id)}
                           
                           type="button"
                           className="inline-block rounded bg-success px-6 pt-2.5 pb-2 text-sm font-bold uppercase leading-normal text-white shadow-[0_4px_9px_-4px_#14a44d] transition duration-150 ease-in-out hover:bg-success-600 hover:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:bg-success-600 focus:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)] focus:outline-none focus:ring-0 active:bg-success-700 active:shadow-[0_8px_9px_-4px_rgba(20,164,77,0.3),0_4px_18px_0_rgba(20,164,77,0.2)]">
                              Approve
                         </button>
                     </td> 
                   </tr>
                 ))}
               </tbody>
             </table>
            
            </div>
            </>
        ):(
            
            <div className="flex flex-column items-center justify-center">
            <img
              src="https://shop.unicornstore.in/beam/themes/2019/assets/img/cart_empty.png"
              alt="Empty cart"
              className="img-fluid mr-3"
              width={250}
              height={250}
            />
            <h3>
              <strong>No Pending products for approval</strong>
            </h3>
            <h4></h4>
          </div>
          
               
          
        )}
    
</div>
  )
}
