
export const second = 1000
export const minute = 60 * second
export const hour = 60 * minute
export const day = 24 * hour

export function parseTime(D, format = 'yyyy年MM月dd日') {
    const year = D.getFullYear()
    const month = D.getMonth() + 1
    const date = D.getDate()
    const hours = D.getHours()
    const minutes = D.getMinutes()
    const seconds = D.getSeconds()
    let str = format
    function replace(tpl, val) {
        if (new RegExp(tpl).test(str)) {
            str = str.replace(tpl, val)
        }
    }
    replace('yyyy', year)
    replace('MM', month)
    replace('M', month)
    replace('dd', (date))
    replace('d', date)
    replace('hh', (hours))
    replace('h', hours)
    replace('HH', (hours))
    replace('H', hours)
    replace('mm', (minutes))
    replace('m', minutes)
    replace('ss', (seconds))
    replace('s', seconds)
    return str
}
export function unique(arr, val) {
    const res = new Map()
    return arr.filter((item) => !res.has(item[val]) && res.set(item[val], 1))
}
export function countMax(arr, key) {
    return Math.max.apply(Math, arr.map(item => { return item[key] }))
}
export function countMin(arr, key) {
    return Math.min.apply(Math, arr.map(item => { return item[key] }))
}

