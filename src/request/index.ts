import axios, { Axios, AxiosResponse, AxiosRequestConfig } from "axios";

//创建 axios 实例
const service = axios.create({
  baseURL: '/api',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/form-data;charset=UTF-8'
  }
});

// 添加请求拦截
service.interceptors.request.use((config) => {
  if(localStorage.getItem('token')){
    config.headers.token = localStorage.getItem('token') || '';
  }
  return config
});

// 添加响应拦截器
service.interceptors.response.use((response) => {
  const code:number = response.data.code;
  if(code != 200){
    return Promise.reject(response.data);
  }
  return response.data;
}, (error) => {
  console.log("error",error);
});

export default service;
