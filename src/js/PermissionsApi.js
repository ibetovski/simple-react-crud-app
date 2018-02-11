import permissions from '../data/permissions.json'

// If set to true will pick on random value for setTimeout simulating a low internet
// connection. Max value is 3 seconds.
const SIMULATE_LOW_CONNECTION = false

const getTimeoutValue = () => {
  if (SIMULATE_LOW_CONNECTION) {
    return Math.floor(Math.random() * 3000)
  } else {
    return 0
  }
}

let supportedActions = [
  'read', 'delete', 'update', 'create'
]

let Api = {
  isAllowed(action) {
    // throws an error in case we are looking for non-supported permission
    // this makes the api intuitive and giving a feedback if we are doing something
    // wrong, eg: having a typo in the action name.
    if (!supportedActions.includes(action)) {
      throw Error(`${action} is not supported by the PermissionApi. You might have a typo. Supported actions are: ${supportedActions}`)
    }

    // simulate request to a web server by making the call asynchronous
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(permissions.includes(action))
      }, getTimeoutValue())
    })
  },

  /**
   * Returns a copy of the supported actions because we don't want to amend it
   * accidentally
   * 
   * @return {Array}
   */
  getSupportedActions: () => supportedActions.slice(),

  /**
   * A Convenient way to get all granted permissions.
   * 
   * @return {Array} All granted permissions (Promise)
   */
  getAllAllowedPermissions: () => {
    return new Promise((resolve, reject) => {

      let supported = Api.getSupportedActions()

      // The array to resolve with when everything is checked.
      let allowedPermission = []

      // way to track when every check has finished.
      let promises = []

      supported.forEach((x, i) => {
        promises.push(
          Api.isAllowed(x)
          .then(isAllowed => {
            if (isAllowed) {
              allowedPermission.push(x)
            }
          })
        )
      })

      // at the end when everything is ready, resolve with the built array
      Promise.all(promises)
      .then(() => {
        resolve(allowedPermission)
      })
    })
  }
}

export default Api