// Packages
module.exports = ({ title, body, url, onClick }) => {
  const icon = 'main/static/icon.ico'
  const specs = {
    title,
    body,
    icon,
    silent: true
  }

  if (url || onClick) {
    notification.on('click', () => {
      if (onClick) {
        return onClick()
      }

      window.remote.shell.openExternal(url)
    })
  }

  notification.show()
  console.log(`[Notification] ${title}: ${body}`)
}