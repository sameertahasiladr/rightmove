const https = require('https');

// --- PASTE YOUR DATA BELOW ---
const myCert = `-----BEGIN CERTIFICATE-----
MIIExDCCA6ygAwIBAgICAtEwDQYJKoZIhvcNAQELBQAwgaMxCzAJBgNVBAYTAkdC
MQ8wDQYDVQQIDAZMb25kb24xDTALBgNVBAcMBFNvaG8xEjAQBgNVBAoMCVJpZ2h0
bW92ZTETMBEGA1UECwwKT3BlcmF0aW9uczEgMB4GA1UEAwwXUlRERiBUZXN0IElz
c3VpbmcgQ0EgdjQxKTAnBgkqhkiG9w0BCQEWGm9wZXJhdGlvbnNAcmlnaHRtb3Zl
LmNvLnVrMB4XDTI2MDEwODE1MTIzN1oXDTMxMDEwNzE1MTIzN1owazELMAkGA1UE
BhMCR0IxDzANBgNVBAgTBkxvbmRvbjENMAsGA1UEBxMEU29obzESMBAGA1UEChMJ
UmlnaHRtb3ZlMQ0wCwYDVQQLEwRSVERGMRkwFwYDVQQDExBhbnlob3VzZXNvbGR0
ZXN0MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA5QPxX4Ema5ikuxsN
pZ6PJpQDAbW/T9/6tYj0/pk8mOw4NrXVwIPftJQHj40g+5tOgH3o+eAq2/tDaUfZ
AFYeK5KCd/ZkExCDvcRvT4hBSmLOciF60+snnlJIUfWXkSiT+yUPnlIpJDsVHwuo
joYC+KV7anvZj920ZTFxtyv+5pdCEnji+DS5rZ53uZ4QP+qklyOsYXUcrfD5274U
7fMRRi8ui7p6QFHW4BcYh49f8ApwaYUvYG1BoML/YM3XREi3QWl6L/FvHLTZcgKL
oaqZqcaV4YMJxmTGFTaaspNqFmlnifsqwb7mOVKCAqVPyeTrGMe8voPjyhwMo7PG
PSezOwIDAQABo4IBNzCCATMwCQYDVR0TBAIwADAsBglghkgBhvhCAQ0EHxYdT3Bl
blNTTCBHZW5lcmF0ZWQgQ2VydGlmaWNhdGUwHQYDVR0OBBYEFP3FZt8/UHibc6k+
jT7pPXs5ZWkAMIHYBgNVHSMEgdAwgc2AFJk/QW9YKfIQbKQ3f7j6xauutq4XoYGp
pIGmMIGjMQswCQYDVQQGEwJHQjEPMA0GA1UECAwGTG9uZG9uMQ0wCwYDVQQHDART
b2hvMRIwEAYDVQQKDAlSaWdodG1vdmUxEzARBgNVBAsMCk9wZXJhdGlvbnMxIDAe
BgNVBAMMF1JUREYgVGVzdCBJc3N1aW5nIENBIHY0MSkwJwYJKoZIhvcNAQkBFhpv
cGVyYXRpb25zQHJpZ2h0bW92ZS5jby51a4IJAJP9OztcFR+OMA0GCSqGSIb3DQEB
CwUAA4IBAQC+JYuWx7maiLYfbHXf6TEiLcX6Sj59DOjUf/Vfxh240izpfZNfj6h7
TUxxrsRfmRnMC/N/9PdsRmRo39/k4NHGXpEksocqt/rpINhfarZiZKqsTup8r4Ad
0oHUq/pY/YKSEnUBXih/OmAnxoU9BVx3V6bRSmpBgTmVHyrUKER2YxwjJjIlyrrH
mT2gvEO/GC19BMXdOj8KqVqZNeanM1Fa0P6etk9hqRtj461oeg2allZqzT9DbMa0
qzFAtA2Uyn0WRkBYZufykJK1GggSjlC2iXesNvuojiVXkuOcrGZvEwnqnMNquYY2
Y2emKd91f88zlyKpEbJBGRmEJhdS0E/b
-----END CERTIFICATE-----`;

const myKey = `-----BEGIN ENCRYPTED PRIVATE KEY-----
MIIFLTBXBgkqhkiG9w0BBQ0wSjApBgkqhkiG9w0BBQwwHAQItuueKNfyOsoCAggA
MAwGCCqGSIb3DQIJBQAwHQYJYIZIAWUDBAEqBBA98f7FBeEBGlc9fF/lH0FTBIIE
0H9OAw2dyL1+Ob2GiSsMZcKywFmRSQacFOFi0aEBZrNGP1adnBIRC9A4SxswIWFX
e1WIJh9OBIb5QespAYpa6l6RrGWE1PVlD9+Frskvd3ErsiPB/xc4ZdbzthPEUIa8
s601qng3wfyIYosI9JAKcVIdayaHQZ0p1nopwXaERtsHvsizqkBttntPnQGLgaGO
/2p41xExyap5vBeeKLbPRnTqGeBsdMHnbJSkAKPI/sLogt+om/QDP+y8GK/tnodz
Mb6zDjWcG5QY334B/nLvyCzQ/NlePihGsNM/Hfs09mL2rGPnX2tyhQT7sXlvR+6s
ERWDbUmBOaExorCkV/VHzkbC7rvYnEkXNJqmKBzTrwriVMQeW7NbOMOHw4FGdaTn
oaLc799yp0H9BczbjqLifjizIh1Fpiu1yxgXxW3qMa5Cd/anNfIgGyjwY79dby0b
gMMx95Yo2SuVOPeWuuxI3WqaxSQIG841jV1QbU0Ck+BqdT50Dj6O1/tQ/BP3sG91
sTNM9n3wbJwwOgZuVEYXa5zvPPpo9RiIrfMhUb1OuR38P2CsYhysAYxVEdX3pKjm
ZMkYedvSGv4IxN9IJ4gwbEGuDGEspfxAQwgyakmTyRdOwRkhAB11uUptkpMk10Tm
fYz/Rif3fuAoMyx3bGr4PSi7jbkGpkgXPtX/S9D1oUKdHqbku7ETH4rswGuSWvAj
jkgJUnT7k0OpSmScHi0q6JXn9ACBIPEI1QPNbJ+UZXBBtbhK/O1lRTBcXXX6y5vQ
MBCAUXVQlhdTwMmZU076KE0amR/mUxEXwwslyn1FIq2ctNAchhtEFzxu+tjy7qxz
3hmxGWxDqzwcUjaFDu2B0QCpmUnMOViueAQvWdN3qZKYV4GS1/3St0TDdHcmgcLL
GR6afswa8W1qKk+ps8XNN8qudSvh4Fxw/VaLCjY43fhdMeloqjtw/u7LRnOXajxj
OOD0VjMQSJnX7wr4YmBOT1Xeci43QewLupN0tmBsn5NjIwI01lXBCdB2Juo6jHuh
rnpzix6FeQoGmIgeD7PDAnvRTqQSiqYeuXgm0tjsT3tEbQfurOio9o6lZRBBrPqA
4pV9zh2azRBp52fggYKfoguU3j99RGW7lhCh9I5yj2T+sqH5BX7pIRcWrVsrHJfm
ZAcPrl77gwunXtvpns9EHgInXh+0BSUQMKwefsDVImF4PqvdQ8GeoY2BER2OWOQR
K6nFuO4BoAqf/bGrLvQjCh4ynQUuGT1INYDsx5cwkM7ymFej+yGJrzMcUaUQXxsU
nOPIDHDYb7yXXX94EeOrFL3TnvUPGaV/n5ARERlIhSpBnPc7gxjIV2mxuhL/AVIF
DYacpwGyJzIZAYub1dozIagJy8wplgYxgoQ/Vx/nyWc4aSjsZbSpPtSByXKskHfD
RJSOhcCmJ1SvmCA91zZdwKByHYL8GflQbgsxT1ApTsIFNrrbaDF0nL7CKP8Ja92r
Sd+PA4QPo9+M9treWQoMnuRTX3yr46TbwBeFKDj/iAj/+HA8apYuChA+j4f6Zxxe
/Py3uHxLH1MooGZuiDhNhtE6ZRbPCL8Hvxr9jnL8d2AXQKiVC9lzADgrjUmR1ZRg
b0pnchIn5epMV+nWS5t0DGz3yJAKJvtlryPhNTGjCRGd
-----END ENCRYPTED PRIVATE KEY-----`;

const myPass = 'k8RyJDOCUN';
// --- END PASTE ---

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Use POST' });
    }

    const options = {
        hostname: 'adfapi.adftest.rightmove.com',
        path: '/v1/property/sendpropertydetails',
        method: 'POST',
        cert: myCert,
        key: myKey,
        passphrase: myPass,
        headers: { 'Content-Type': 'application/json' }
    };

    const remoteRequest = https.request(options, (remoteRes) => {
        let body = '';
        remoteRes.on('data', (chunk) => body += chunk);
        remoteRes.on('end', () => res.status(remoteRes.statusCode).send(body));
    });

    remoteRequest.on('error', (err) => {
        res.status(500).json({ error: 'Handshake Error', details: err.message });
    });

    remoteRequest.write(JSON.stringify(req.body));
    remoteRequest.end();
}