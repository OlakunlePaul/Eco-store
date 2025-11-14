import axios from 'axios';

const API_URL = import.meta.env.VITE_STRIPE_API_URL || 'http://localhost:5001/your-project-id/us-central1/createCheckoutSession';

export const createCheckoutSession = async (cartItems, userId) => {
  try {
    const response = await axios.post(API_URL, {
      items: cartItems,
      userId: userId
    });
    return response.data;
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
};

