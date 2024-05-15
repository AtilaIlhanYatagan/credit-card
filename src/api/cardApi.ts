import axios from 'axios';

export const getCards = async () => {
    try {
        const response = await axios.get('http://localhost:3000/api/cards');
        return response.data;
    } catch (error) {
        console.error('Error fetching cards:', error);
    }
};

export const getCard = async (id: string) => {
    try {
        const response = await axios.get(`http://localhost:3000/api/cards/${id}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching card:', error);
    }
};

export const updateCardLimit = async (id: string, amount: number) => {
    try {
        const response = await axios.post(`http://localhost:3000/api/cards/updateCardLimit`, {
            id,
            amount
        });
        return response.data;
    } catch (error) {
        console.error('Error updating card limit:', error);
        throw error; // Rethrow the error to handle it at the caller's level if needed
    }
};
