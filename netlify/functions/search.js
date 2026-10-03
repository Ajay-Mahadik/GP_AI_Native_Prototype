exports.handler = async function (event, context) {
    if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method Not Allowed' };

    const apiKey = process.env.GEMINI_API_KEY;
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;

    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: event.body // Netlify passes the body as a raw string automatically
        });

        const data = await response.text();
        return {
            statusCode: 200,
            headers: { "Content-Type": "application/json" },
            body: data
        };
    } catch (error) {
        return { statusCode: 500, body: JSON.stringify({ error: 'Failed to fetch AI results' }) };
    }
};
