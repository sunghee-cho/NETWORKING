import axios from 'axios';

export const fetchJobListings = async () => {
    try {
        const response = await axios.get(`http://localhost:8080/api/external/data`);
        return response.data;
    } catch (error) {
        console.error('Error fetching job listings:', error);
        throw error;
    }
};