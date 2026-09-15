import { NextResponse } from 'next/server';
import { submitContactForm } from '../../../lib/supabase';

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, request_type, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields (name, email, message).' },
        { status: 400 }
      );
    }

    const payload = {
      name: String(name).trim().slice(0, 100),
      email: String(email).trim().toLowerCase().slice(0, 150),
      request_type: String(request_type || 'General Inquiry').slice(0, 100),
      message: String(message).trim().slice(0, 3000),
      source_page: 'portfolio_api',
      created_at: new Date().toISOString()
    };

    // Save directly to Supabase database contacts table (with offline fallback)
    const result = await submitContactForm(payload);

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json(
      { error: 'Internal server processing error.' },
      { status: 500 }
    );
  }
}
