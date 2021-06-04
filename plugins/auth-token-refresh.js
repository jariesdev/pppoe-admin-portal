export default function ({ $auth }) {
  const refreshToken = () => {
    const timestampMs = $auth.$storage.getCookie('_token_expiration.laravelJWT')
    if (!$auth.loggedIn) { return }
    if (timestampMs * 0.75 < Date.now()) {
      $auth.refreshTokens()
    }
  }

  setInterval(refreshToken, 1000)
}
