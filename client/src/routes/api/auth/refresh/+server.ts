import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ fetch, cookies }) => {
    const response = await fetch("http://localhost:8080/api/auth/refresh", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "refreshToken" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InBob25nLm5nbzEyM0BoY211dC5lZHUudm4iLCJpZCI6ImNsanI3emFhNTAwMDFzYm51dHkxcWpjZ3MiLCJyb2xlIjoidXNlciIsImRpc3BsYXlOYW1lIjoiTmdvIEdpYSBQaG9uZyIsImF2YXRhciI6Imh0dHBzOi8vY2RuLmRpc2NvcmRhcHAuY29tL2F0dGFjaG1lbnRzLzExMjYzMjEzNzUzMzA2OTcyNzgvMTEyNjMzNzg3NzI0MDk3MTMwNC9raXNzcG5nLW5pbmphLWNvbXB1dGVyLWljb25zLWF2YXRhci1zYW11cmFpLWFuZ2xlLTViNDc5MGY2YzM5ODkxLnBuZyIsInN0YXR1cyI6MSwiaWF0IjoxNjg5MTQ1MDUxLCJleHAiOjE2ODkyMzE0NTF9.syubCm6Ly2ER4tU15sSF7HruxkuSSMPp6TDTbKWE3-c"
        })
    })
    const result = await response.json();
    if (result.error) {
        // throw error(500, result.error.response)
    }
    cookies.set("accessToken", result.data.accessToken, {
        path: '/',
    });
    cookies.set("refreshToken", result.data.refreshToken, {
        path: '/'
    });
    return json(result);
}
