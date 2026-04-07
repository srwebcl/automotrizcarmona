import { NextResponse } from 'next/server';

export async function GET() {
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://api.automotrizcarmona.cl/api/v1';
    
    try {
        console.log('Testing connection to:', `${API_URL}/brands`);
        const startTime = Date.now();
        const res = await fetch(`${API_URL}/brands`, { 
            cache: 'no-store',
            headers: { 'Accept': 'application/json' }
        });
        const duration = Date.now() - startTime;
        
        const status = res.status;
        const contentType = res.headers.get('content-type');
        let data = null;
        
        if (contentType?.includes('application/json')) {
            data = await res.json();
        } else {
            data = await res.text();
        }

        return NextResponse.json({
            success: res.ok,
            status,
            duration: `${duration}ms`,
            url: `${API_URL}/brands`,
            contentType,
            env_url: process.env.NEXT_PUBLIC_API_URL || 'NOT_SET',
            data: data && typeof data === 'object' ? { count: data.data?.length || 0 } : data
        });
    } catch (e: any) {
        return NextResponse.json({
            success: false,
            error: e.message,
            stack: e.stack,
            url: `${API_URL}/brands`
        }, { status: 500 });
    }
}
