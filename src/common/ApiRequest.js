import axios from 'axios'
import APIPath from './APIPath'
import { ApiResponseErrorHandler } from './ApiResponseErrorHandler'

/**
 * To make API request (GET,POST,PUT,PATCH,DELETE)
 *
 * Parameter must be object type and must be following format
 * @param{
 *          "method": "post",               // api request method (get, post, put, patch, delete)
 *          "url": "api/user/lists",        // api url
 *          "params": { "key" : "value" }   // parameter object to pass api request
 *          "type": "blob"                  // (optional) use this when you need api response as blob type data
 *       }
 * @returns success:
 *              api response object
 *          error:
 *              error message with following format
 *              {
 *                "flag": false,   // to know api response has error
 *                "message": []    // api response error message as array
 *              }
 */
export const ApiRequest = async (value) => {
  let result,
    responseType,
    parameter,
    message,
    path = APIPath.path,
    data

  // Set the AUTH token for any request
  axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('TOKEN')
    config.headers.Authorization = token ? `Bearer ${token}` : ''
    config.headers.Accept = 'application/json'
    return config
  })

  // handle error
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      // if status is 401 unauthenticated, remove session and redirect to login page
      if (error.response.status === 401) {
        window.location.href = `${window.location.origin}/401`
      }
      // if status is 500
      else if (error.response.status === 500) {
        // window.location.href = `${window.location.origin}/${ApiPath.customerName}/hr/500`;
      }
      // if not 401 AND 500 AND 422, send error response to user page
      else if (
        error.response.status !== 500 &&
        error.response.status !== 401 &&
        error.response.status !== 422
      ) {
        window.location.href = `${window.location.origin}/500`
      } else {
        throw error
      }
    },
  )

  // to decide responseType is exists or not
  value.type !== undefined ? (responseType = value.type) : (responseType = '')

  if (
    value.method === 'post' ||
    value.method === 'patch' ||
    value.method === 'put' ||
    value.method === 'delete'
  ) {
    parameter = { baseURL: path, method: value.method, url: value.url, data: data, responseType }
  } else {
    parameter = { baseURL: path, method: value.method, url: value.url, params: data, responseType }
  }

  // calling api
  await axios(parameter)
    .then(async (response) => {
      // call api response error handler
      message = await ApiResponseErrorHandler(response)
      message === true
        ? (result = response)
        : (result = { flag: false, message: message, data: response })
    })
    .catch(async (error) => {
      // call api response error handler
      message = await ApiResponseErrorHandler(error.response)
      result = { flag: false, message: message, data: error.response }
    })
  //check view permission = null
  if (value.url.includes(APIPath.employeeByViewPermission)) {
    if (result.flag === false) {
      window.location.href = `${window.location.origin}/401`
    }
  }
  return result
}
