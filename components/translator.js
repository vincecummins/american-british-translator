const americanOnly = require('./american-only.js');
const americanToBritishSpelling = require('./american-to-british-spelling.js');
const americanToBritishTitles = require("./american-to-british-titles.js")
const britishOnly = require('./british-only.js')

class Translator {
    translate(text, locale) {
        let str = text;
        if (locale === 'american-to-british') {
            str = checkTime(text, true);
            let props = Object.keys(americanOnly)
            let values = Object.values(americanOnly)
            for (let i = 0; i < props.length; i++) {
                let re = new RegExp('\\b' + props[i] + '\\b', "gi");
                if (re.test(str)) {
                    str = str.replace(re, '<span class="highlight">' + values[i] + '</span>')
                }
            }
            let titles = Object.keys(americanToBritishTitles)
            let britTitles = Object.values(americanToBritishTitles)
            for (let i = 0; i < titles.length; i++) {
                let re = new RegExp(titles[i], "gi");
                if (re.test(str)) {
                    str = str.replace(re, '<span class="highlight">' + capitalizeFirstLetter(britTitles[i]) + '</span>')
                }
            }
            let spelling = Object.keys(americanToBritishSpelling);
            let britSpelling = Object.values(americanToBritishSpelling)
            for (let i = 0; i < spelling.length; i++) {
                let re = new RegExp('\\b' + spelling[i] + '\\b', "i");
                if (re.test(str)) {
                    str = str.replace(re, '<span class="highlight">' + britSpelling[i] + '</span>')
                }
            }
        }
        if (locale === 'british-to-american') {
            str = checkTime(text, false);
            let props = Object.keys(britishOnly)
            let values = Object.values(britishOnly)
            for (let i = 0; i < props.length; i++) {
                let re = new RegExp('\\b' + props[i] + '\\b', "i");
                if (re.test(text)) {
                    str = str.replace(re, '<span class="highlight">' + values[i] + '</span>')
                }
            }
            let titles = Object.values(americanToBritishTitles)
            let amerTitles = Object.keys(americanToBritishTitles)
            for (let i = 0; i < titles.length; i++) {
                let re = new RegExp('\\b' + titles[i] + '\\b', "i");
                if (re.test(str)) {
                    str = str.replace(re, '<span class="highlight">' + capitalizeFirstLetter(amerTitles[i]) + '</span>')
                }
            }
            let spelling = Object.values(americanToBritishSpelling);
            let amerSpelling = Object.keys(americanToBritishSpelling)
            for (let i = 0; i < spelling.length; i++) {
                let re = new RegExp('\\b' + spelling[i] + '\\b', "gi");
                if (re.test(str)) {
                    str = str.replace(re, '<span class="highlight">' + amerSpelling[i] + '</span>')
                }
            }
        }
        if (str === text) {
            return 'Everything looks good to me!'
        }
        return str
    }
}
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
function checkTime(string, bool) {
    let str = string;
    if (bool) {
        let regex = /\b\d{1,2}:\d{2}\b/g
        let amerTime = string.match(regex)
        let engTime;
        if (amerTime !== null) {
            for (let i = 0; i < amerTime.length; i++) {
                let hours = parseInt(amerTime[i].substr(0, 2))
                let minutes = parseInt(amerTime[i].substr(amerTime[i].length - 2, amerTime[i].length))
                engTime = hours + '.' + minutes
                if (hours < 24 && hours > 0 && minutes >= 0 && minutes <= 60) {
                    str = str.replace(amerTime[i], engTime)
                }
            }
        }
    } else if (!bool) {
        let regexBrit = /\b\d{1,2}\.\d{2}\b/g
        let engTime = string.match(regexBrit)
        let amerTime;
        if (engTime !== null) {
            for (let i = 0; i < engTime.length; i++) {
                let hours = parseInt(engTime[i].substr(0, 2))
                let minutes = parseInt(engTime[i].substr(engTime[i].length - 2, engTime[i].length))
                amerTime = hours + ':' + minutes
                if (hours < 24 && hours > 0 && minutes >= 0 && minutes <= 60) {
                    str = str.replace(engTime[i], amerTime)
                }
            }
        }
    }
    return str
}

module.exports = Translator;