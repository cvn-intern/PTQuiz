import { error, json, redirect } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ cookies }) => {
    cookies.delete("accessToken", {
        path: '/'
    });
    cookies.delete("refreshToken", {
        path: '/'
    });
    return new Response(JSON.stringify({ message: "Logout success" }), {
        status: 200,
    })
}
