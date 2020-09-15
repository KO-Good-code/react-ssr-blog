import axios from 'axios'


// 创建axios实例，同时设置20秒延时时间
const ajax = axios.create({
    timeout: 1000 * 20
  });

/**
 * 响应拦截器
 */
ajax.interceptors.response.use(
    response =>
      response.status === 200
        ? Promise.resolve(response.data.data)
        : Promise.reject(response),
    error => {
      const { response } = error;
      return Promise.reject(response);
    }
  )

    /**
     * 封装ajax api接口 @param {api} api数组对象
     */
const ajaxFn = (api) => {
  let result = {}
  api.forEach( (o) => {
    result[o.name] = ({
      params = {},
      body = null
    }) => {
      if(o.type === 'get') {
        return ajax[o.type](o.url, {params})
      } else {
        return ajax[o.type](o.url, body, {params})
      }
    }
  })
  return result
}

export default ajaxFn;

