// clean commas
function clean_commaS(val) {
    let clean = val === 0 ? 0 : val ? Number(val.toString().replace(/,|^\$/g, "")) : NaN;
    return clean;
}


// add commas
function add_commaS(val, approx) {
    let approx_clean = approx ? approx : 0;
    let commaed = clean_commaS(val).toFixed(approx_clean).toString().replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
    return commaed;
}


// is number
function isNumber(n) {
    if (isNaN(n)) {
        return false;
    } else if (!isNaN(parseFloat(n)) && isFinite(n)) {
        return true;
    }
}
