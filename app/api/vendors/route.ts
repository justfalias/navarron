import { NextResponse } from 'next/server'
import { getVendors } from '@/lib/vendors'

export async function GET() {
  try {
    const vendors = await getVendors()
    return NextResponse.json(vendors)
  } catch (error) {
    console.error('Error fetching vendors:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}

