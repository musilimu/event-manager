export const useToken = () => {
    const token = localStorage.getItem('jwt')
    return { token }
}