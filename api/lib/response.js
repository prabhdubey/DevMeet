/**
 *  CreateResponse method to create response body
 *
 * @param data Data
 * @param msg Message
 * @param error Error
 *
 * @returns {{data: *, msg: *, error: *}}
 */
export function createResponse(data = null, msg = null, error = null, status = 200) {
    return {
        'data': data,
        'msg': msg,
        'errors': error,
        'status': status
    }
}
