import axios from "axios";
import { Payment } from "../types/payment.type";

export const postPayment = async (paymentData: Payment) => {
    try {
        const response = await axios.post('http://localhost:3000/api/payments', paymentData);
        return response.data;
    } catch (error) {
        console.error('Error creating payment:', error);
        throw error;
    }
};