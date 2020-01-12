export const amountFormat = (amount: number | null) => {
    if (amount !== null) {
        return amount.toLocaleString(undefined, {
            minimumFractionDigits: 0
        })
    }

    return ""
}