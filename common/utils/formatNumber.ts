const formatNumber = (x: number): string => (x ? x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ') : '')

export default formatNumber
