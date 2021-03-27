import axios, { AxiosRequestConfig, AxiosResponse, Method } from 'axios'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import { message } from 'antd'

axios.interceptors.request.use((config: AxiosRequestConfig) => {
  Nprogress.start()
  return config
})

axios.interceptors.response.use((response: AxiosResponse) => { 
  Nprogress.done()
  return response
})

axios.defaults.baseURL = 'http://localhost:4000'
axios.defaults.withCredentials = true

export { axios }

const MethodType = ['post', 'put', 'patch']
export default function http(url: string, data = {}, method: Method = 'get'): Promise<any> {
  return new Promise(resolve => {
    let res: Promise<any>
    if (MethodType.includes(method)) {
      res = axios({ url, method, data })
    } else {
      res = axios({ url, method, params: data })
    }
    res.then((res: AxiosResponse) => {
      // 如果请求成功
      resolve(res.data)
    }).catch(() => {
      // 如果请求失败
      message.error('请求出错，请重试')
    })
  })  
}