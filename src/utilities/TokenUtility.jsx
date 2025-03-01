export const isTokenExpired = ()=> {
    const tokenExpiration = localStorage.getItem('authTokenExpiration')
    
    if (!tokenExpiration) return true // No expiration time, consider expired
    
    const currentTime = Date.now()
    return currentTime > parseInt(tokenExpiration) // If current time is greater than expiration time, token is expired
}