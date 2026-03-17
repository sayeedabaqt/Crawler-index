export default async function handler(req, res) {
    const EC2_API = 'http://65.2.181.66:8000';

    try {
        const response = await fetch(`${EC2_API}/status`);
        const data = await response.json();
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ status: 'error', error: `EC2 connection failed: ${err.message}` });
    }
}
