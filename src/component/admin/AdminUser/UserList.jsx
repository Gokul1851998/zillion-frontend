import React, { useEffect, useState } from 'react'
import { getUsers, statusAdmin, statusUser, statusUserAdmin } from '../../../apiCall/admin'
import { toast } from 'react-hot-toast'


export default function UserList() {
    const [users,setUsers] = useState([])
    const [change,setChange] = useState(false)
    useEffect(()=>{
    const fetchData =async()=>{
        const response = await getUsers()
        if(response.success){
            setUsers(response.data)
        }else{
            toast.error('Somthing went wrong')
        }
    }
    fetchData()
    },[change])



    const handleAdmin=async(userId)=>{
        setChange(true)
       const response = await statusAdmin(userId)
       if(response.success){
        setUsers(response.data)
        setChange(false)
       }
    }
    const handleUserAdmin=async(userId)=>{
        setChange(true)
        const response = await statusUserAdmin(userId) 
        if(response.success){
            setUsers(response.data)
            setChange(false)
           }
    }
    const handleUser=async(userId)=>{
        setChange(true)
        const response = await statusUser(userId)
        if(response.success){
            setUsers(response.data)
            setChange(false)
           }
    }
 
  return (
    <div className='m-3'>
    <div className="flex justify-between mb-3 mt-1">
<h2 className="font-bold text-lg uppercase px-3 py-2">
 Users 
</h2>
   <button  className='bg-green-600 hover:bg-green-500 text-white font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded'>add</button>
   </div>
   <div className="overflow-x-auto" >
<table className="table-auto min-w-full divide-y divide-gray-300" style={{ border: "0.5px solid black" }}>
   <thead className="bg-gray-900 text-white">
     <tr>
       <th className="px-6 py-4 text-center font-semibold uppercase">No</th>
       <th className="px-6 py-4 text-center font-semibold uppercase">User Name</th>
       <th className="px-6 py-4 text-center font-semibold uppercase">Email</th>
       {/* <th className="px-6 py-4 text-center font-semibold uppercase">Description</th>
       <th className="px-6 py-4 text-center font-semibold uppercase">Price</th>
       <th className="px-6 py-4 text-center font-semibold uppercase">Discount</th> */}
       <th className="px-6 py-4 text-center font-semibold uppercase">Action</th>
       <th className="px-6 py-4 text-center font-semibold uppercase">status</th>
       <th className="px-6 py-4" />
     </tr>
   </thead>
   <tbody className="divide-y divide-gray-200">
      {users.map((user,index)=>(
 <tr  >
 <td className="px-6 py-4 whitespace-nowrap">
   {index + 1}
 </td>
 <td className="px-6 py-4 whitespace-nowrap">
  {user.signName}
 </td>
 <td className="px-6 py-4 whitespace-nowrap">
 {user.signEmail}
 </td>
 
 <td className="px-6 py-4 whitespace-nowrap">
 <div className="relative w-full lg:max-w-sm">
  <select

    className="w-full p-2.5 text-white bg-success border rounded-md outline-none appearance-none focus:border-indigo-600"
    onChange={(e) => {
        const selectedStatus = e.target.value;
        if (selectedStatus === 'admin') {
            handleAdmin(user._id)
        } else if (selectedStatus === 'useradmin') {
            handleUserAdmin(user._id)
        } else {
            handleUser(user._id)
        }
      }}
   
  >
          <option className=' text-black' >Option</option>
          <option className='bg-white text-black' value='user'>User</option>
          <option className='bg-white text-black' value="admin">Admin</option>
        <option className='bg-white text-black' value="useradmin">User Admin</option>
     
    
    
  </select>
</div>
 </td> 
 <td className="px-6 py-4 whitespace-nowrap">
 {user.status}
 </td>
</tr>
      ))}
      
    
   </tbody>
 </table>

</div>
</div>
  )
}
