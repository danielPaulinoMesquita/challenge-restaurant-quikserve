import axios from 'axios';

const API_URL = 'https://cdn-dev.preoday.com/challenge/menu';

export const fetchData = async () => {
    try {
        const response = await axios.get(`${API_URL}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error; // Rethrow the error for further handling
    }
};