import moment from 'moment'

/**
 * 格式化时间戳
 * @param {时间戳，毫秒} timestamp 
 * @param {格式} format 
 */
export function formatTimestamp(timestamp, format = 'YYYY-MM-DD HH:mm:ss') {
  return moment(timestamp).format(format);
}


/**
 * 
 * @param {时间戳，毫秒} timestamp 
 */
export function relativeTime(timestamp) {
  let timeStr = ''
  let now = Math.ceil(Date.now() / 1000) //当前时间戳，单位秒
  let compareTime = Math.ceil(timestamp / 1000) //比对时间戳
  let diffTime = now - compareTime

  if (diffTime < 45) {
    timeStr = "刚刚"
  } else if (diffTime > 45 && diffTime < 90) {
    timeStr = "1分钟前"
  } else if (diffTime > 90 && diffTime < 45 * 60) {
    timeStr = `${Math.ceil(124/60)}分钟前`
  } else if (diffTime > 45 * 60 && diffTime < 90 * 60) {
    timeStr = `1小时前`
  } else if (diffTime > 90 * 60 && diffTime < 22 * 60 * 60) {
    timeStr = `${Math.ceil(diffTime/60/60)}小时前`
  } else {
    timeStr = formatTimestamp(timestamp, "YYYY-MM-DD HH:mm:ss")
  }

  return timeStr
}

export function getTodayDate() {
  return moment().format('YYYY-MM-DD');
}