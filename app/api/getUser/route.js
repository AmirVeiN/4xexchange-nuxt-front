import axios from 'axios';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';


export async function GET(request) {
    const access = await request.headers.get('Authorization')
    try {

        const response = await axios.get('http://localhost:8000/api/v1/users/me/', {
            headers: {
                Authorization: "JWT " + access,
            },
        });
        return NextResponse.json(response.data);
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: error.response?.status || 500 });
    }
}

