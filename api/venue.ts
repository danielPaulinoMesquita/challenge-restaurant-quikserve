import axios from 'axios';

export default async function handler(req: any, res: any) {
    try {
        const response = await axios.get('https://cdn-dev.preoday.com/challenge/challenge/venue/9');
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.status(200).json(response.data);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch data' });
    }
}