import axios from 'axios'
import qs from 'qs'//引入 qs ，这个库是 axios 里面包含的，不需要再下载了

const service = axios.create({
    // process.env.NODE_ENV === 'development' 来判断是否开发环境
    // easy-mock服务挂了，暂时不使用了
    baseURL: process.env.NODE_ENV === 'development' ? "http://61.153.185.211:9080/" : 'http://61.153.185.211:9080/',
    timeout: 50000
})
//请求拦截器（接口请求之前）
service.interceptors.request.use(
    config => {
        if (config.method === 'post') { // post请求时，处理数据
            config.data = qs.stringify({
                ...config.data //后台数据接收这块需要以表单形式提交数据，而axios中post默认的提交是json数据,所以这里选用qs模块来处理数据，也有其他处理方式，但个人觉得这个方式最简单好用
            })
        }
        config.headers.Authorization = "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJqdGkiOiJmYjUwOThlMy04OGVmLTQ5ZWYtYWUwNy1jYjhlYjY2NzAwNjIiLCJzdWIiOiJzdWJqZWN0IiwiYXVkIjpbIjIiXSwiaXNzIjoiZVVCcElfIiwiaWF0IjoxNjUxODMyMjQwLCJuYmYiOjE2NTE4MzIyNDAsImV4cCI6MTgwOTUxMjI0MH0.gdyRcm-uMUYBOshz-IWLRu0E-TzH3sX31KQDkTWHitJ3DPOKmYvd79Ffkl3YP0Yt_YtPANtVuGbyjJY5bZKU8GzVHY5BrM3hD2aMT1RrmQTMdsYObefEm6d4f2J3bixuplC0HUDS2dF1OM_kmw3t_0k6Vb8Y7rgSHSd4RwzfWq4"
        return config
    },
    error => {
        console.log(error)
        return Promise.reject()
    }
)
//响应拦截器（接口请求之后）
service.interceptors.response.use(
    response => {
        if (response.status === 200 && response.data.state === 1001) {
            return response.data.data
        } else {
            return Promise.reject()
        }
    },
    error => {
        console.log(error)
        return Promise.reject()
    }
)
export default service
