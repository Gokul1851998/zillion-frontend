import axios from "axios";
import { userUrl } from "../../apiLink/apiLink";

export const userSignin = async(payload)=>{
    try {
        const response = await axios.post(`${userUrl}user-signIn`,(payload))
        return response.data
    } catch (error) {
        return error.response
    }
}

export const userLogin = async(payload)=>{
    try {
        const response = await axios.post(`${userUrl}user-login`,(payload))
        return response.data
    } catch (error) {
        return error.response
    }
}

export const postChart = async(payload)=>{
    try {
        const response = await axios.post(`${userUrl}post-cart`,(payload))
        return response.data
    } catch (error) {
        return error.response
    }
}

export const getUserProduct = async()=>{
    try {
        const response = await axios.get(`${userUrl}user-product`)
        return response.data
    } catch (error) {
        return error.response
    }
}

export const getChart = async(payload)=>{
    try {
        const response = await axios.post(`${userUrl}get-cart`,(payload))
        return response.data
    } catch (error) {
        return error.response
    }
}