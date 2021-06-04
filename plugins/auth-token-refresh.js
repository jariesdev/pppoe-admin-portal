export default function ({ $auth }) {
  const refreshToken = () => {
    if (!$auth.loggedIn) { return }
    const expired = $auth.strategy.token.status().expired()
    if (expired) {
      $auth.refreshTokens()
    }
  }

  setInterval(refreshToken, 1000)
}
