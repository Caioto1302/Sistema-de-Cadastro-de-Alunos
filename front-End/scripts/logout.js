document.addEventListener('DOMContentLoaded', () => {
  const logoutLink = document.getElementById('logout-link')
  if (logoutLink) {
    logoutLink.addEventListener('click', function (event) {
      event.preventDefault()
      localStorage.removeItem('token')
      window.location.href = '/index.html'
    })
  }
})
