import React, { useEffect, useState } from 'react'
import { Fragment } from 'react'

import { getUserProduct, postChart } from '../../apiCall/user'


export default function () {
    const [products,setProducts] = useState([])
    const [user,setUser] = useState('')
    useEffect(()=>{
        const fetchData = async()=>{
            const userName = localStorage.getItem("userName")
            setUser(userName)
            const response = await getUserProduct()
            if(response.success){
            setProducts(response.data)
            }

            }
            fetchData()
    },[])

    const addToChart=async(productId)=>{
          const response = await postChart({productId,user})
          console.log(response);
    }
  return (
    <Fragment>
    <div className="relative pb-4 pl-6 pt-10 flex w-full max-w-[26rem] flex-col rounded-xl bg-transparent bg-clip-border text-gray-700 shadow-none">
      <h1 className="text-black  " style={{ fontWeight: 'bold',fontSize:'24px',fontFamily:'Arial, sans-serif' }}>
       Available Products
     </h1> 
    </div>
 
  <div className="flex flex-wrap justify-center">
{products.map((pro)=>(
    <div className="w-full md:w-1/2 lg:w-1/5 p-4">
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <a  >
        <img src={pro.images}
          className="w-full h-full object-cover object-center"
        />
        <div className="text-center pt-1" style={{background:"#1f2937",minHeight: '90px'}}>
        <h6 
  className="mt-2  text-1xl font-semibold text-white cursor-pointer"
>
  {pro.productName}
</h6>
<div className='mt-1 '  >
<span className="text-yellow-400 ">
<svg className="inline-block w-4 h-4 " viewBox="0 0 20 20" fill="currentColor">
 
</svg>
<span className="text-sm pl-1 text-2xl">Rs.{pro.price}</span>
</span>
<p className='text-xs text-white pt-2'>{pro.category}</p>
<p className='text-xs text-white pt-2 pb-2'>{pro.description}</p>
<button onClick={()=>addToChart(pro._id)} className="bg-yellow-600 hover:bg-yellow-800 text-white font-bold py-1 px-2  border-yellow-800 rounded mb-2">
        Add to chart
      </button>
</div>
      </div>
      
      </a>
      
    </div>
  </div>
))}
  



   
</div>
</Fragment>
  )
}
