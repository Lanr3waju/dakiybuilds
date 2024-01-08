export default function replaceSpacesWithHyphensAndLowerCase(str) {
    // Ensure str is defined and convert spaces to hyphens and lowercase
    if (typeof str === 'string') {
        return str.replace(/[\s,.]+/g, '-').toLowerCase()
    }
    return '' // Return an empty string or handle appropriately based on your requirements
}
