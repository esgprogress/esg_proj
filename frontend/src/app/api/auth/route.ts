import {auth0} from '@/lib/auth/auth0'

export async function GET(req: Request) {
    try {
        const accessToken = await auth0.getAccessToken({
            audience: process.env.AUTH0_API_AUDIENCE
        });

        return new Response(JSON.stringify({accessToken}));
    } catch (err) {
        console.error(err);
        return new Response("Failed to get access token", { status: 500 });
    }
}