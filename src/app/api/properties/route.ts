import { NextResponse } from 'next/server';

// Mock property data
const properties = [
  {
    id: 'demo-1',
    address: '123 Main St, Anytown, USA',
    price: 450000,
    beds: 3,
    baths: 2,
    sqft: 2000,
    yearBuilt: 2010,
    lotSize: 5000,
    propertyType: 'Single Family',
    status: 'Active',
    images: [
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=2075&auto=format&fit=crop',
    ],
    source: {
      name: 'Demo Data',
      fetchDate: new Date().toISOString(),
    },
  },
  // Add more mock properties as needed
];

export async function GET() {
  try {
    return NextResponse.json(properties);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch properties' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newProperty = {
      id: Date.now().toString(),
      ...body,
      source: {
        name: 'User Input',
        fetchDate: new Date().toISOString(),
      },
    };
    properties.push(newProperty);
    return NextResponse.json(newProperty);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to create property' },
      { status: 500 }
    );
  }
} 