/* global startApp */
import { isAndroidApp } from './platform'

const cordovaPluginIsInstalled = () => global.startApp

/**
 * Normalize startApp params for Android and iOS
 */
const getParams = ({ appId, uri }) => {
  if (isAndroidApp()) {
    return {
      package: appId
    }
  } else {
    return uri
  }
}

const exported = {}

/**
 * Start an application if it is installed on the phone
 * @returns Promise - False if the application was not able to be started
 */
exported.startApp = async appInfo => {
  const isAppInstalled = await exported.checkApp(appInfo)
  if (isAppInstalled) {
    const params = getParams(appInfo)
    return new Promise((resolve, reject) => {
      if (!cordovaPluginIsInstalled()) {
        reject(
          new Error(`Cordova plugin 'com.lampa.startapp' is not installed.`)
        )
        return
      }

      global.startApp.set(params).start(resolve, reject)
    })
  } else {
    return false
  }
}

/**
 * Check that an application is installed on the phone
 * @returns Promise - Promise containing information on the application
 *
 * @example
 * > checkApp({ appId: 'io.cozy.drive.mobile', uri: 'cozydrive://' })
 * Promise.resolve({
 *  versionName: "0.9.2",
 *  packageName: "io.cozy.drive.mobile",
 *  versionCode: 902,
 *  applicationInfo: "ApplicationInfo{70aa0ef io.cozy.drive.mobile}"
 * })
 */
exported.checkApp = async appInfo => {
  const params = getParams(appInfo)
  return new Promise((resolve, reject) => {
    if (!cordovaPluginIsInstalled()) {
      reject(new Error(`Cordova plugin 'com.lampa.startapp' is not installed.`))
      return
    }

    startApp.set(params).check(
      infos => {
        resolve(infos === 'OK' ? true : infos)
      },
      error => {
        if (error === false || error.indexOf('NameNotFoundException') === 0) {
          // Plugin returns an error 'NameNotFoundException' on Android and
          // false on iOS when an application is not found.
          // We prefer to always return false
          resolve(false)
        } else {
          reject(error)
        }
      }
    )
  })
}

export default exported