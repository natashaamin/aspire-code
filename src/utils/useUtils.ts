import numeral from 'numeral'
import moment from 'moment'

export const useUtils = () => {
    const formatMoney = (value: any) => {
        return numeral(value).format('0,0[.]00')
    }

    const formatDates = (value: any, format = 'DD MMM YYYY') => {
        return moment(value).format(format);
    }

    return { formatMoney, formatDates }
}