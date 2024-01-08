function numberToWords(num) {
    const ones = ['Zero', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine']
    const teens = ['Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen']
    const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety'];

    if (num < 10) return ones[num]
    if (num < 20) return teens[num - 11] // Adjusted for index
    if (num < 100) return tens[Math.floor(num / 10)] + (num % 10 !== 0 ? '-' + ones[num % 10] : '')
    if (num < 1000) return ones[Math.floor(num / 100)] + ' Hundred' + (num % 100 !== 0 ? ' and ' + numberToWords(num % 100) : '')
    if (num < 1000000) return numberToWords(Math.floor(num / 1000)) + ' Thousand' + (num % 1000 !== 0 ? ' ' + numberToWords(num % 1000) : '')
    if (num < 1000000000) return numberToWords(Math.floor(num / 1000000)) + ' Million' + (num % 1000000 !== 0 ? ' ' + numberToWords(num % 1000000) : '')
    if (num < 1000000000000) return numberToWords(Math.floor(num / 1000000000)) + ' Billion' + (num % 1000000000 !== 0 ? ' ' + numberToWords(num % 1000000000) : '');

    return 'Number out of range'
}

export default numberToWords
