/**
 * @summary validate
 * @author xiao.guo
 *
 * Created at     : 2019-08-17 15:16:52 
 * Last modified  : 2019-08-17 15:34:04
 */

 /**
  * @param {String} str 
  * @returns {Boolean}
  */
export function validUsername (str) {
  const validMap = ['admin', 'editor']
  return validMap.includes(str.trim())
}
