/**
 * 桌面消息通知
 */

export default function notifyMe(title, options) {
  options.dir = 'auto' // 文字方向
  // options.requireInteraction = true // 不自动关闭通知

  // 先检查浏览器是否支持
  if (!window.Notification) {
    console.log('浏览器不支持通知')
  } else {
    // 检查用户曾经是否同意接受通知
    if (Notification.permission === 'granted') {
      let notice = new Notification(title, options) // 显示通知
      notice.onclick = function(e) { window.open('http://www.baidu.com', '_bbank') }
      // setTimeout(() => { notice.close() }, 3000)
    } else if (Notification.permission === 'default') {
      // 用户还未选择，可以询问用户是否同意发送通知
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          console.log('用户同意授权')
          let notice = new Notification(title, options) // 显示通知
          notice.onclick = function(e) { console.log(e) }
          // setTimeout(() => { notice.close() }, 3000) // 延时后关闭消息通知(关闭后通知栏就不显示)
        } else if (permission === 'default') {
          console.warn('用户关闭授权 未刷新页面之前 可以再次请求授权')
        } else {
          // denied
          console.log('用户拒绝授权 不能显示通知')
        }
      })
    } else {
      // denied 用户拒绝
      console.log('用户曾经拒绝显示通知')
    }
  }
}
