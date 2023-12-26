export default function replaceSpacesWithHyphensAndLowerCase(str) {
    return str?.replace(/\s+/g, '-').toLowerCase()
}
