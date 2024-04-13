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