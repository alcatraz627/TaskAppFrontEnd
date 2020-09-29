export const getDate = (dateString) => {
    const d = new Date(dateString)
    return d.toDateString() + ", " + d.toLocaleTimeString()
}
