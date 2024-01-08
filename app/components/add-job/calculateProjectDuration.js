export function getWeeksBetween(date1, date2) {
    // Parse the dates as milliseconds since the Unix Epoch
    const d1 = Date.parse(date1)
    const d2 = Date.parse(date2)

    // Calculate the difference in milliseconds
    const diff = Math.abs(d2 - d1)

    // Convert milliseconds to weeks
    const weeks = diff / (7 * 24 * 60 * 60 * 1000)

    // Round to 2 decimal places
    return `${weeks.toFixed(2)} week(s)`
}

export function getRemainingTime(startDate, endDate) {
    // Parse the dates as milliseconds since the Unix Epoch
    const start = Date.parse(startDate)
    const end = Date.parse(endDate)

    // Get the current date and time
    const current = new Date()

    // Check if the project has started
    if (current < start) {
        return "Project is yet to commence"
    } else if (current === end) {
        return "0 week"
    } else if (current > end) {
        return "Project duration elapsed and project should be completed"
    } else {
        // Calculate the difference in milliseconds
        const diff = Math.abs(end - current)

        // Convert milliseconds to weeks
        const weeks = diff / (7 * 24 * 60 * 60 * 1000)

        // Round to 2 decimal places
        return `${weeks.toFixed(2)} week(s)`
    }
}

export function getLapseTime(startDate, endDate) {
    // Parse the dates as milliseconds since the Unix Epoch
    const start = Date.parse(startDate)
    const end = Date.parse(endDate)

    // Get the current date and time
    const current = new Date()

    // Check if the project has started
    if (current < start) {
        return "0 week"
    } else if (current > start && current < end) {
        return "0 week"
    } else if (current > start && current > end) {
        // Calculate the difference in milliseconds
        const diff = Math.abs(end - start)

        // Convert milliseconds to weeks
        const weeks = diff / (7 * 24 * 60 * 60 * 1000)

        // Round to 2 decimal places
        return `-${weeks.toFixed(2)} week(s)`
    } else if (current > start && current === end) {
        // Calculate the difference in milliseconds
        return "0 week"
    } else if (current === end) {
        return "0 week"
    } else if (current > end) {
        // Calculate the difference in milliseconds
        const diff = Math.abs(end - current)

        // Convert milliseconds to weeks
        const weeks = diff / (7 * 24 * 60 * 60 * 1000)

        // Round to 2 decimal places
        return `-${weeks.toFixed(2)} week(s)`
    }
}
