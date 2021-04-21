import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, Method } from 'axios'
import Nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import { message } from 'antd'
const regExp = /\/search\/suggest/
axios.interceptors.request.use((config: AxiosRequestConfig) => {
  if (!regExp.test(config.url!)) Nprogress.start()
  return config
})

axios.interceptors.response.use((response: AxiosResponse) => { 
  Nprogress.done()
  return response
})

axios.defaults.baseURL = 'http://localhost:4000'
// axios.defaults.baseURL = 'https://autumnfish.cn'
axios.defaults.withCredentials = true

const MethodType = ['post', 'put', 'patch']
interface allRequest {
  url: string,
  method?: Method
  data?: Data
}

export default function http(url: string, data = {}, method: Method = 'get'): Promise<Data> {
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
    }).catch((err: AxiosError) => {
      // 如果请求失败
      message.error(err.response?.data.msg)
    })
  })  
}

http.all = function(requests: Array<allRequest>): Promise<Data> {
  return new Promise(resolve => {
    const arr: Array<Promise<any>> = []
    requests.forEach(value => {
      arr.push(http(value.url, value.data, value.method))
    })
    const res = Promise.all(arr)
    res.then(res => resolve(res))
       .catch(() => message.error('请求出错，请重试'))
  })
}