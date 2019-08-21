/**
 * @summary validate
 * @author xiao.guo
 *
 * Created at     : 2019-08-17 15:16:52 
 * Last modified  : 2019-08-21 16:25:36
 */

 /**
  * @param {String} str 
  * @returns {Boolean}
  */
export function validUsername (str) {
  const validMap = ['admin', 'editor', 'viewer']
  return validMap.includes(str.trim())
}
