import { NextResponse } from 'next/server';
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('query')?.toLowerCase();
    
    // Create a Supabase client with auth context
    const supabase = createRouteHandlerClient({ 
      cookies: cookies 
    });

    let dbQuery = supabase
      .from('saved_calculations')
      .select('id, property_details, created_at');

    if (query) {
      dbQuery = dbQuery.or(`
        property_details->>'address'.ilike.%${query}%,
        property_details->>'propertyType'.ilike.%${query}%,
        property_details->>'status'.ilike.%${query}%,
        property_details->>'price'.ilike.%${query}%,
        property_details->>'beds'.ilike.%${query}%,
        property_details->>'baths'.ilike.%${query}%,
        property_details->>'sqft'.ilike.%${query}%
      `);
    }

    const { data, error } = await dbQuery.order('created_at', { ascending: false });

    if (error) {
      throw error;
    }

    // Transform the data to match the expected format
    const properties = data.map(item => ({
      id: item.id,
      ...item.property_details,
    }));

    return NextResponse.json(properties);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to fetch properties';
    console.error('Error fetching properties:', errorMessage);
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    // Create a Supabase client with auth context
    const supabase = createRouteHandlerClient({ 
      cookies: cookies 
    });

    // Get the authenticated user
    const { data: { user }, error: authError } = await supabase.auth.getUser();
    
    if (authError || !user) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const body = await request.json();
    
    const { data, error } = await supabase
      .from('saved_calculations')
      .insert({
        user_id: user.id,
        name: body.address || 'New Property',
        property_details: {
          id: crypto.randomUUID(),
          ...body,
          source: {
            name: 'User Input',
            fetchDate: new Date().toISOString(),
          },
        },
        mortgage_info: body.mortgage_info || {},
        commission_structure: body.commission_structure || {},
        additional_fees: body.additional_fees || {}
      })
      .select('id, property_details')
      .single();

    if (error) {
      console.error('Database error:', error);
      throw error;
    }

    return NextResponse.json(data.property_details);
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Failed to create property';
    console.error('Error creating property:', errorMessage);
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}