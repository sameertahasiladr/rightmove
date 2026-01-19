const https = require('https');

export default async function handler(req, res) {
    try {
        if (req.method !== 'POST') {
            return res.status(405).json({ error: 'Method Not Allowed' });
        }

        // Clean up formatting for Vercel environment variables
        const cert = process.env.RM_CERT.replace(/\\n/g, '\n');
        const key = process.env.RM_KEY.replace(/\\n/g, '\n');
        const passphrase = process.env.RM_PASS;

        const options = {
            hostname: 'adfapi.adftest.rightmove.com',
            path: '/v1/property/sendpropertydetails',
            method: 'POST',
            // Attach the cert, the encrypted key, and the password
            cert: cert,
            key: key,
            passphrase: passphrase, 
            headers: { 'Content-Type': 'application/json' },
            timeout: 15000 
        };

        const remoteRequest = https.request(options, (remoteRes) => {
            let body = '';
            remoteRes.on('data', (chunk) => body += chunk);
            remoteRes.on('end', () => {
                // Return Rightmove's actual response to Zoho
                res.status(remoteRes.statusCode).send(body);
            });
        });

        remoteRequest.on('error', (err) => {
            res.status(500).json({ 
                error: 'Rightmove Handshake Failed', 
                message: err.message 
            });
        });

        remoteRequest.write(JSON.stringify(req.body));
        remoteRequest.end();

    } catch (error) {
        res.status(500).json({ 
            error: 'Vercel Server Error', 
            message: error.message 
        });
    }
}