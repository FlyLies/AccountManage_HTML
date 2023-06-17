import axios from 'axios'
import Router from '@/router'
import { removeToken, getToken } from '@/utils/auth'

export const service = axios.create({
  baseURL: 'http://localhost:8080',// process.env.VUE_APP_BASE_API, // url = base url + request url
  withCredentials: true,
  // timeout: 500000
})


// axios请求拦截器
service.interceptors.request.use(
  config => {
    let token = getToken();
    if(token){
      config.headers['token'] = token;
    }
    return config;
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)


//axios响应拦截器
service.interceptors.response.use(res=>{
    if (res.data.code === 0 && res.data.msg === 'NOT_LOGIN') {// 返回登录页面
        removeToken();
        Router.replace('/login');
        this.$message({
          message: '用户未登录, 跳转至登录页面',
          type: 'error',
          center: true
        });
        return res;
      } else {
        return res;
      }
    },
    
    error => {
      console.log('err' + error)
      let { message } = error;
      if (message == "Network Error") {
        message = "后端接口连接异常";
      }
      else if (message.includes("timeout")) {
        message = "系统接口请求超时";
      }
      else if (message.includes("Request failed with status code")) {
        message = "系统接口" + message.substr(message.length - 3) + "异常";
      }
      return Promise.reject(error)

})

export default service
