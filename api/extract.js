// Vercel serverless proxy — calls EC2 API server-side (no CORS/SSL issues)
export default async function handler(req, res) {
    if (req.method === 'OPTIONS') {
        res.status(200).end();
        return;
    }

    if (req.method !== 'POST') {
        res.status(405).json({ error: 'Method not allowed' });
        return;
    }

    const EC2_API = 'http://65.2.181.66:8000';

    try {
        const response = await fetch(`${EC2_API}/extract`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(req.body),
        });

        const data = await response.json();
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json({ status: 'error', data: { error: `EC2 connection failed: ${err.message}` } });
    }
}
