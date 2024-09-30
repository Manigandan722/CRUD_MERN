import axios from 'axios'

const API_URL = 'http://localhost:3001/api/users'


export const getUser = ()=>axios.get(API_URL);

export const updateUser = (id,data)=>axios.put(`${API_URL}/${id}`,data);

export const createUser = (data)=>axios.post(API_URL,data);

export const deleteUser = (id)=>axios.delete(`${API_URL}/${id}`);