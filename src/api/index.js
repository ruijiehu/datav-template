import axios from 'axios'
import router from '@/router/index'
import qs from 'qs'
const baseURL =
  process.env.NODE_ENV === 'development'
    ? `http://${window.document.location.host}/`
    : `http://${window.document.location.host}/`

axios.defaults.withCredentials = true
axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded;charset=UTF-8' // 配置请求头
axios.defaults.baseURL = baseURL
window.__axiosPromiseArr = []
// POST传参序列化(添加请求拦截器)
axios.interceptors.request.use(
  (config) => {
    if (config.method === 'post' && config.needsQs !== 2) {
      config.data = qs.stringify(config.data)
    }
    // 使用全局的cancalToken，切换路由后取消请求
    config.cancelToken = new axios.CancelToken((cancel) => {
      window.__axiosPromiseArr.push({ cancel })
    })
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 取消所有的请求
function cancelToken () {
  window.__axiosPromiseArr.forEach((ele, index) => {
    ele.cancel()
    delete window.__axiosPromiseArr[index]
  })
}

// 返回状态判断（添加响应拦截器）
axios.interceptors.response.use(
  (res) => {
    if (res.data) {
      switch (res.data.status) {
        case 401:
          router.push({ name: 'login' })
          break
        case 404:
        case 400:
        case 500:
          break
        default:
      }
    }
    return res
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 过滤参数
function filterParam (params) {
  if (params) {
    const paramsCopy = JSON.parse(JSON.stringify(params))
    for (var i in paramsCopy) {
      if (!paramsCopy[i] && paramsCopy[i] !== 0) {
        delete paramsCopy[i]
      }
    }
    return paramsCopy
  } else {
    return Object.create(null)
  }
}

function post (url, params) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, params)
      .then(
        (response) => {
          resolve(response.data)
        },
        (err) => {
          reject(err)
        }
      )
      .catch((error) => {
        reject(error)
      })
  })
}

// json参数上传
function postJson (url, params) {
  return new Promise((resolve, reject) => {
    axios({
      url: url,
      method: 'post',
      baseURL: baseURL,
      data: params,
      withCredentials: true,
      headers: {
        'Content-type': 'application/json;charset=UTF-8'
      },
      needsQs: 2
    })
      .then(
        (response) => {
          resolve(response.data)
        },
        (err) => {
          reject(err)
        }
      )
      .catch((error) => {
        reject(error)
      })
  })
}
// 删除方法
function del (url, params) {
  return new Promise((resolve, reject) => {
    axios
      .delete(url, {
        data: filterParam(params)
      })
      .then(
        (response) => {
          resolve(response.data)
        },
        (err) => {
          reject(err)
        }
      )
      .catch((error) => {
        reject(error)
      })
  })
}

// restful请求方式
function restFulApi (url, method, params) {
  return new Promise((resolve, reject) => {
    axios({
      url: url,
      method,
      baseURL: baseURL,
      data: params,
      withCredentials: true,
      headers: {
        'Content-type': 'application/json;charset=UTF-8'
      },
      needsQs: 2
    })
      .then(
        (response) => {
          resolve(response.data)
        },
        (err) => {
          reject(err)
        }
      )
      .catch((error) => {
        reject(error)
      })
  })
}
// 参数处理
function serialize (obj) {
  const ary = []
  for (const p in obj) {
    // eslint-disable-next-line no-prototype-builtins
    if (obj.hasOwnProperty(p) && (obj[p] || obj[p] === 0)) {
      ary.push(encodeURIComponent(p) + '=' + encodeURIComponent(obj[p]))
    }
  }
  return ary.join('&')
}

function get (url, params) {
  const paramFilter = filterParam(params)
  let urlFilter
  if (paramFilter && Object.keys(paramFilter).length !== 0) {
    if (url.indexOf('?') === -1) {
      urlFilter = url + '?' + serialize(paramFilter)
    } else {
      urlFilter = url + '&' + serialize(paramFilter)
    }
  } else {
    urlFilter = url
  }
  return new Promise((resolve, reject) => {
    axios
      .get(urlFilter)
      .then(
        (response) => {
          resolve(response.data)
        },
        (err) => {
          reject(err)
        }
      )
      .catch((error) => {
        reject(error)
      })
  })
}
// 新增方法
function put (url, params) {
  return new Promise((resolve, reject) => {
    axios
      .put(url, params)
      .then(
        (response) => {
          resolve(response.data)
        },
        (err) => {
          reject(err)
        }
      )
      .catch((error) => {
        reject(error)
      })
  })
}
export default {
  // 可视化界面获取数据
  async getDataFromIOC (ename, param) {
    return get('/uomc/biz/legend/' + ename, param)
  }
}
export {
  post,
  get,
  postJson,
  restFulApi,
  axios,
  cancelToken,
  del,
  put,
  baseURL
}
