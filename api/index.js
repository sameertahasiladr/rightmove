const https = require('https');

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).send('Use POST');
    }

    // These values come from your Vercel Environment Variables
    const cert = process.env.RM_CERT.replace(/\\n/g, '\n');
    const key = process.env.RM_KEY.replace(/\\n/g, '\n');

    const options = {
        hostname: 'adfapi.adftest.rightmove.com',
        path: '/v1/property/sendpropertydetails',
        method: 'POST',
        cert: cert,
        key: key,
        headers: { 'Content-Type': 'application/json' }
    };

    const remoteRequest = https.request(options, (remoteRes) => {
        let body = '';
        remoteRes.on('data', (chunk) => body += chunk);
        remoteRes.on('end', () => res.status(remoteRes.statusCode).send(body));
    });

    remoteRequest.on('error', (err) => res.status(500).send(err.message));
    remoteRequest.write(JSON.stringify(req.body));
    remoteRequest.end();
}