import React, { useEffect, useRef, useState } from 'react'
import { deleteCategory, deleteSubCategory, getCategory, getSubCategory, postCategory } from '../../../apiCall/admin'
import { toast } from 'react-hot-toast'


export default function Category() {
    const inputRef = useRef();
    const [showModal,setShowModal] = useState(false)
    const [category,setCatagory] = useState('')
    const [newCategory,setNewCategory] = useState([])
    const [list,setlist] = useState([])
    const [input,setInput] = useState('')
    const [status,setStatus] = useState(false)
    useEffect(()=>{
        const fetchData = async()=>{
            
         const response = await getCategory()
         if(response.success){
            setlist(response.data)
         }
        }
        fetchData()
    },[status])

   
     
    const handleCategory = async(e)=>{
        e.preventDefault()
        const response = await postCategory({category})
        if(response.success){
            setStatus(!status)
            setShowModal(false)
            setlist(response.data)
        }else{
            toast.error(response.message)
        }
    }

    const handledelete = async(id)=>{
        const response = await deleteCategory(id)
        if(response.success){
            setStatus(!status)
                    setlist(response.data)
        }else{
            toast.error('Something went wrong')
        }
    }

    const handlesubdelete = async(sub,listId)=>{
       const response = await deleteSubCategory({sub,listId})
       if(response.success){
        setStatus(!status)
                setlist(response.data)
    }else{
        toast.error('Something went wrong')
    }
    }

    const subCategory = async(e)=>{
        e.preventDefault()
            const value = inputRef.current.value;
                const response = await getSubCategory({input,value})
                if(response.success){
                    setStatus(!status)
                    setlist(response.data)
                } 
    }
  return (
    <div className='m-3'>
         <div className="flex justify-between mb-3 mt-1">
    <h2 className="font-bold text-lg uppercase px-3 py-2">
      Category
    </h2>
    <button onClick={()=>setShowModal(true)} className='bg-green-600 hover:bg-green-500 text-white font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'>add</button>
        </div>
        {showModal?(
             <form className='relative z-50' onSubmit={handleCategory} >
             <div className="formcontainer" style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%, -50%)",minWidth:'50vh', backgroundColor: "#fefefe", padding: "20px", borderRadius: "5px", boxShadow: "0 0 20px rgba(0,0,0,0.3)", zIndex: 1 }}>
               
             <h1 className='font-semibold large-heading pb-2'>Add Category</h1>
               <hr/>
               <div className='mt-2'>
        <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-black">Category Name</label>
        <input onChange={(e)=>setCatagory(e.target.value)} type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-black-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="book" required />
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
        {list.map((list,index)=>(
             <form onSubmit={subCategory} className='card  m-2'>
  <div className="flex m-3  ">
  <span  className="inline-flex items-center  px-4 text-md text-white-900  border border-r-0  rounded-l-md dark:bg-gray-200 ">
   {list.category}
  </span>
  <input ref={inputRef}  type="text" id="website-admin" hidden className="rounded-none rounded-r-lg  bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5   " value={list._id} />
  <input onChange={(e)=>setInput(e.target.value)} type="text" id="website-admin" className="rounded-none rounded-r-lg  bg-gray-50 border text-gray-900 focus:ring-blue-500 focus:border-blue-500 block flex-1 min-w-0 w-full text-sm border-gray-300 p-2.5   " placeholder="elonmusk" />
  <button type='submit' className="ml-1 bg-blue-400 hover:bg-blue-500 text-white font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded mr-4">
                   Add
                 </button>
<button type="button" onClick={()=>handledelete(list._id)}  className=" text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm py-2 px-4  dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</button>

</div>
<table className=" mb-5   divide-gray-300" >
        
        <tbody className=" divide-gray-200">
          {list.subCategory.map((list2,index)=>(
            <tr  >
               
            <td className="px-6 py-1 whitespace-nowrap">
             {index + 1}  {list2}
            </td>
            <td className="px-6 py-1 whitespace-nowrap">
             <button onClick={()=>handlesubdelete(list2,list._id)} className='bg-danger rounded px-3 py-1 text-white'><i className="fa fa-trash bg"></i></button>
            </td>
          </tr>
          ))}
            
    
        </tbody>
      </table>

</form>
        ))}
          
       
        
        </div>
  )
}
