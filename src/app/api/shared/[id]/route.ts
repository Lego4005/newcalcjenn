import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createRouteHandlerClient({ cookies });

    const { data: calculation, error } = await supabase
      .rpc('get_shared_calculation', {
        p_share_id: params.id
      });

    if (error) {
      return NextResponse.json(
        { error: 'Failed to fetch shared calculation' },
        { status: 500 }
      );
    }

    if (!calculation || calculation.length === 0) {
      return NextResponse.json(
        { error: 'Shared calculation not found' },
        { status: 404 }
      );
    }

    return NextResponse.json(calculation[0]);
  } catch (error) {
    console.error('Error fetching shared calculation:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}