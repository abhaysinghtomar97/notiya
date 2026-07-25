// src/app/api/pdf/route.js
import { NextResponse } from 'next/server';

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const targetUrl = searchParams.get('url');

    if (!targetUrl) {
        return new NextResponse('Missing URL', { status: 400 });
    }

    try {
        // Fetch the PDF from the external server
        const response = await fetch(targetUrl, {
            headers: {
                // Pretend to be a normal browser navigating directly
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
                'Accept': 'application/pdf'
            }
        });

        if (!response.ok) {
            return new NextResponse('External server blocked the request', { status: response.status });
        }

        // Get the raw PDF binary data
        const arrayBuffer = await response.arrayBuffer();

        // Send it to your frontend
        return new NextResponse(arrayBuffer, {
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': 'inline', // 'inline' tells the browser to display it, not download it
            }
        });
    } catch (error) {
        return new NextResponse('Error fetching PDF', { status: 500 });
    }
}