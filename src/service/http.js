import axios from 'axios'

// api拦截器模块
axios.interceptors.request.use(config => {
  if (config.url.indexOf('?') !== -1) {
    config.url = config.url + '&_=' + new Date().getTime()
  } else {
    config.url = config.url + '?_=' + new Date().getTime()
  }
  let url = config.url
  // 请求参数处理
  if (config.params) {
    if (url.indexOf('?') === -1) {
      url += '?'
    } else {
      url += '&'
    }
    for (let key in config.params) {
      // 数组处理
      if (config.params[key] && config.params[key] instanceof Array) {
        for (let param in config.params[key]) {
          url += key + '=' + encodeURI(config.params[key][param]) + '&'
        }
      } else {
        // 字符串处理
        if (config.params[key] !== undefined) {
          // 非空
          url += key + '=' + encodeURI(config.params[key]) + '&'
        }
      }
    }
    url = url.substring(0, url.length - 1)

    url = url.replace(/%20/g, '+')

    config.noEncode && (url = url.replace(/"/g, '%22').replace(/\'/g, '%27'))
  }

  var lang = ''
  if (window.defaultConfig.locales && !window.defaultConfig.locales['lang']) {
    lang = 'zh-CN'
  } else {
    lang = (window.defaultConfig.locales && window.defaultConfig.locales['lang'].toLowerCase() === 'zh-cn' ? 'zh-CN' : 'en')
  }
  config.headers['Accept-Language'] = lang
  // 显示指定内容编码类型
  config.headers['Content-Type'] = 'application/json;charset=utf-8'

  if (config.needAppId) {
    config.headers['sdp-app-id'] = window['sdp-app-id']
  }
  if (config.unAuth) {

  } else {
    config.headers['Authorization'] = config.notAdmin && window.isIndependentDeployment ? window.JsMAF.getAuthHeader(url, config.method) : getAuthorization(url, config.method)
    // config.headers['Authorization'] = config.notAdmin && window.isIndependentDeployment ? window.JsMAF.getAuthHeader('http:' + url, config.method) : getAuthorization(url, config.method)
  }

  // if (config.url.indexOf(window.defaultConfig.gateway) !== -1 || config.url.indexOf(window.defaultConfig.gateway) != -1) {
  //   // config.headers['X-Gaea-Authorization'] = utils.getGaeaId()
  // }
  let CORSCustom = window.CORSCustom
  if (CORSCustom.isIELower() && !CORSCustom.isHtml(config.url) && CORSCustom.isXDomain(config.url)) {
    let host = [config.url.split('//')[0], '//', config.url.split('/')[2]].join('')
    config.headers['Host'] = host.replace('http://', '').replace('https://', '')
    config.data = CORSCustom.encodeData(config.method, config.data, config.headers)
  }

  return Promise.resolve(config)
}, function (error) {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  return response
}, (error) => {
  if (error.response &&
    (error.response.status === 403 || error.response.status === 401)) {
    // TODO 未授权，退出登录
  } else if (error.response && error.response.data && error.response.data.message) {
    if (!(error.config && error.config.ignoreErrorCodes && error.config.ignoreErrorCodes.indexOf(error.response.data.code) !== -1)) {
      if (
        error.response.data.code === 'BAIKE/WORD_EXIST' ||
        error.response.data.code === 'WAF/URI_NOT_FOUND' ||
        error.response.data.code === 'BAIKE/WORD_NOT_PUBLISHED') {

      } else {
        // notification.error({ message: '提示' || error.response.status, description: error.response.data.message, duration: 3 })
      }
    }
  }
  // message.error(error.response.data.message) // 异常提示
  return Promise.reject(error)
})

