export function getSetting(auth, onSuccess, onFail) {
  mpvue.getSetting({
    success(res) {
      if (res.authSetting[`scope.${auth}`]) {
        onSuccess(res)
      } else {
        onFail(res)
      }
    },
    fail(res) {
      console.log(res)
    }
  })
}

export function getUserInfo(onSuccess, onFail) {
  mpvue.getUserInfo({
    success(res) {
      console.log(res) // 获得userInfo
      const { userInfo } = res
      if (userInfo) {
        onSuccess(userInfo)
      } else {
        onFail(res)
      }
    },
    fail(res) {
      console.log(res) // 直接抛出异常
    }
  })
}
