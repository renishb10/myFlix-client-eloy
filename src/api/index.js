import axios from "axios";

const getAuthToken = localStorage.getItem('token')
const setAuthToken = (token) => localStorage.setItem('token', token)

export const headers = () => ({
  Authroization: `Bearer ${getAuthToken()}`
})

export const AddToFavourites = async () => {
  await axios.post('', {}, headers)
} 
