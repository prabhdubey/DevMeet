export function createResponse(data = null, msg = null, error = null) {
    return {
        'data': data,
        'msg': msg,
        'error': error
    }
}
