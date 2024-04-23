export type Card = {
    _id: string;
    cardName: string;
    cardNumber: string;
    validThru: string;
    userName: string;
    limit: number;
    currentDebt: number;
    remainingDebt: number;
    debitDate: Date;
};