import axios from 'axios';

export const getTransactionsWithCardId = async (cardId: string) => {
    try {
        const response = await axios.get(`http://localhost:3000/api/transactions/${cardId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching transactions:', error);
    }
};
