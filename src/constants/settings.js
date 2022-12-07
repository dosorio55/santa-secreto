export const serverUrl = 'https://secret-santa-server.onrender.com'
// export const serverUrl = 'http://localhost:4000'

export const fetchData = async (body = null, token, method, url) => {
    return await fetch(`${serverUrl}/${url}`, {
        method,
        headers: {
            'Content-Type': 'application/json',
            Authorization: token ? `Bearer ${token}` : '',
        },
        body: body ? JSON.stringify(body) : null,
    })
}
