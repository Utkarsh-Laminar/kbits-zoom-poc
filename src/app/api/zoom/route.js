import { getApiKey, getToken } from "@/lib/zoom";

export async function POST(request) {
    const body = await request.json();
    const { meetingNumber} = body;    
    const sdkKey = getApiKey()
    const token = getToken(meetingNumber);
    return Response.json({ sdkKey, token });
};