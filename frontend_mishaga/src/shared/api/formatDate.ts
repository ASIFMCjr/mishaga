export const formatDate = (date: string | Date | undefined) => {
    if (typeof date === "undefined") return ''
    return new Date(date)
        .toLocaleString()
        .substring(0, new Date(date).toLocaleString().length - 3)
        .replace(',', '')
        .replaceAll('/', '.')
        .split(' ')
        .reverse()
        .join(' ')
}