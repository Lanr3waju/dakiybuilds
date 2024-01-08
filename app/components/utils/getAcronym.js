export function getAcronym(name) {
    const words = name?.split(' ')
    const acronym = words?.map(word => word.charAt(0)).join('')
    return acronym?.toUpperCase()
}
