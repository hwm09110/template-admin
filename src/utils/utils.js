import fingerprintjs2 from 'fingerprintjs2'

//获取url参数
export function getUrlParam(name) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
  var r = window.location.search.substr(1).match(reg)
  // if(r != null) return r[2];
  if (r != null) return decodeURIComponent(r[2])
  // if(r != null) return unescape(r[2]);
  return null
}

// 判断是否是正确的手机号码
export function isPhone(phone) {
  return /^1[2,3,4,5,6,7,8,9]\d{9}$/g.test(phone)
}

// base64 转二进制
export function base64ImgToBytes(str) {
  let base64String = str
  let bytes = window.atob(base64String.split(',')[1])
  let array = []
  for (var i = 0; i < bytes.length; i++) {
    array.push(bytes.charCodeAt(i))
  }
  var blob = new Blob([new Uint8Array(array)], {
    type: 'image/jpeg'
  })
  // return 'file' , +blob, Date.now() + '.jpg'
  return blob
}

// file 转base64
export function fileReaderBase64(file) {
  return new Promise((resolve, reject) => {
    let reader = new FileReader()
    reader.readAsDataURL(file) // 读出 base64
    reader.onloadend = () => {
      resolve(reader.result)
    }
  })
}

// 深拷贝
export function deepCopy(source) {
  if (!source && typeof source !== 'object') {
    throw new Error('error')
  }
  var targetObj = source.constructor === Array ? [] : {}
  for (var keys in source) {
    if (source.hasOwnProperty(keys)) {
      if (source[keys] && typeof source[keys] === 'object') {
        targetObj[keys] = source[keys].constructor === Array ? [] : {}
        targetObj[keys] = deepCopy(source[keys])
      } else {
        targetObj[keys] = source[keys]
      }
    }
  }
  return targetObj
}

//获取浏览器指纹
export function getDeviceFinger() {
  return new Promise((resolve, reject) => {
    let device_finger_str = ''
    if (window.requestIdleCallback) {
      requestIdleCallback(function() {
        fingerprintjs2.get({}, function(components) {
          let values = components.map(function(component) {
            return component.value
          })
          device_finger_str = fingerprintjs2.x64hash128(values.join(''), 31)
          resolve(device_finger_str)
        })
      })
    } else {
      setTimeout(function() {
        fingerprintjs2.get({}, function(components) {
          let values = components.map(function(component) {
            return component.value
          })
          device_finger_str = fingerprintjs2.x64hash128(values.join(''), 31)
          resolve(device_finger_str)
        })
      }, 500)
    }
  })
}

// 是否是https访问
export function isHttpsUrl() {
  return window.location.protocol.includes('https')
}
