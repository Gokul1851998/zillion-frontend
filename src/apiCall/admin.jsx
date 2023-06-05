import axios from "axios";
import { adminUrl } from "../../apiLink/apiLink";

export const getProduct = async()=>{
    try {
        const response = await axios.get(`${adminUrl}get-product`)
        return response.data
    } catch (error) {
        return error.response
    }
}

export const pendingProduct = async()=>{
    try {
        const response = await axios.get(`${adminUrl}pending-products`)
        return response.data
    } catch (error) {
        return error.response
    }
}

export const deleteProduct = async(payload)=>{
    try {
        const response = await axios.get(`${adminUrl}delete-product/${payload}`)
        return response.data
    } catch (error) {
        return error.response
    }
}

export const getUsers = async()=>{
    try {
        const response = await axios.get(`${adminUrl}get-users`)
        return response.data
    } catch (error) {
        return error.response
    }
}

export const statusAdmin = async(payload)=>{
    try {
        const response = await axios.get(`${adminUrl}status-admin/${payload}`)
        return response.data
    } catch (error) {
        return error.response
    }
}

export const statusUserAdmin = async(payload)=>{
    try {
        const response = await axios.get(`${adminUrl}status-userAdmin/${payload}`)
        return response.data
    } catch (error) {
        return error.response
    }
}

export const statusUser = async(payload)=>{
    try {
        const response = await axios.get(`${adminUrl}status-user/${payload}`)
        return response.data
    } catch (error) {
        return error.response
    }
}

export const productApproval = async(payload)=>{
    try {
        const response = await axios.get(`${adminUrl}product-approval/${payload}`)
        return response.data
    } catch (error) {
        return error.response
    }
}

export const postCategory = async(payload)=>{
    try {
        const response = await axios.post(`${adminUrl}post-category`,(payload))
        return response.data
    } catch (error) {
        return error.response
    }
}

export const getCategory = async()=>{
    try {
        const response = await axios.get(`${adminUrl}get-category`)
        return response.data
    } catch (error) {
        return error.response
    }
}

export const getSubCategory = async(payload)=>{
    try {
        const response = await axios.post(`${adminUrl}get-subCategory`,(payload))
        return response.data
    } catch (error) {
        return error.response
    }
}

export const getNewCategory = async()=>{
    try {
        const response = await axios.get(`${adminUrl}get-newcategory`)
        return response.data
    } catch (error) {
        return error.response
    }
}

export const deleteCategory = async(payload)=>{
    try {
        const response = await axios.get(`${adminUrl}delete-category/${payload}`)
        return response.data
    } catch (error) {
        return error.response
    }
}

export const deleteSubCategory = async(payload)=>{
    try {
        const response = await axios.post(`${adminUrl}delete-subCategory`,(payload))
        return response.data
    } catch (error) {
        return error.response
    }
}