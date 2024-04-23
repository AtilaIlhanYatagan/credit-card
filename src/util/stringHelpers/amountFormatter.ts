// format the raw price to representable version (ex: 1000 -> 10,00₺)
export function getFormattedAmount(amount: number): string {
    const absAmount = Math.abs(amount);
    const strAmount = absAmount.toString();

    const paddedAmount = strAmount.length === 1
        ? `00${strAmount}`
        : strAmount.length === 2
            ? `0${strAmount}`
            : strAmount;

    const s1 = paddedAmount.slice(0, -2);
    const s2 = paddedAmount.slice(-2);

    const formattedAmount = `${s1},${s2} ₺`;

    return amount < 0 ? `-${formattedAmount}` : formattedAmount;
}
