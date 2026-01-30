const roundNumber = (number: number): string => (Math.round(number * 100) / 100).toFixed(1)

export default roundNumber
