
import { NextResponse } from 'next/server';
import { getSupabaseClient } from '@/lib/supabase';

export async function GET() {
    const supabase = getSupabaseClient();
    if (!supabase) {
        return NextResponse.json(
            { error: 'Database configuration missing' },
            { status: 500 }
        );
    }

    try {
        const { data: products, error } = await supabase
            .from('products')
            .select('*');

        if (error) {
            console.error('Error fetching products:', error);
            return NextResponse.json(
                { error: 'Failed to fetch products' },
                { status: 500 }
            );
        }

        return NextResponse.json(products || []);
    } catch (err) {
        console.error('Unexpected error in /api/products:', err);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}

export async function POST(request: Request) {
    const supabase = getSupabaseClient();
    if (!supabase) {
        return NextResponse.json(
            { error: 'Database configuration missing' },
            { status: 500 }
        );
    }

    try {
        const body = await request.json();

        // Basic validation
        if (!body.name || !body.slug || !body.price) {
            return NextResponse.json(
                { error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const { data, error } = await supabase
            .from('products')
            .insert(body)
            .select()
            .single();

        if (error) {
            console.error('Error creating product:', error);
            return NextResponse.json(
                { error: 'Failed to create product' },
                { status: 500 }
            );
        }

        return NextResponse.json(data);
    } catch (err) {
        console.error('Unexpected error in POST /api/products:', err);
        return NextResponse.json(
            { error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
