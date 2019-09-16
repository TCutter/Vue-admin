/**
 * @summary validate
 * @author xiao.guo
 *
 * Created at     : 2019-08-17 15:16:52 
 * Last modified  : 2019-08-21 20:45:18
 */

 /**
  * @param {String} str 
  * @returns {Boolean}
  */
export function validUsername (str) {
  const validMap = ['admin', 'editor', 'viewer']
  return validMap.includes(str.trim())
}

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal (path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}
