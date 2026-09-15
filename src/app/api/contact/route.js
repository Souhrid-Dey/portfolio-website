import { NextResponse } from 'next/server';
import { submitContactForm } from '../../../lib/supabase';

// Dynamically import Resend so missing env vars don't crash the server
async function sendEmailNotification(payload) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn('RESEND_API_KEY not set — skipping email notification.');
    return;
  }

  try {
    const { Resend } = await import('resend');
    const resend = new Resend(apiKey);

    const fromEmail = process.env.RESEND_FROM_EMAIL || 'portfolio@deyrdynamicslab.com';
    const toEmail = process.env.CONTACT_NOTIFY_EMAIL || 'dsouhrid@gmail.com';

    await resend.emails.send({
      from: `Portfolio Contact Form <${fromEmail}>`,
      to: toEmail,
      reply_to: payload.email,
      subject: `[Portfolio Inquiry] ${payload.request_type} — from ${payload.name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: auto; padding: 24px; background: #0f0c24; color: #e2e8f0; border-radius: 12px; border: 1px solid rgba(139,92,246,0.3);">
          <div style="border-bottom: 2px solid #8b5cf6; padding-bottom: 16px; margin-bottom: 24px;">
            <h1 style="color: #c4b5fd; font-size: 22px; margin: 0;">📬 New Portfolio Inquiry</h1>
            <p style="color: #94a3b8; margin: 4px 0 0 0; font-size: 14px;">Received from your portfolio contact form</p>
          </div>

          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 10px 0; color: #94a3b8; font-size: 13px; width: 140px; vertical-align: top;">👤 Name</td>
              <td style="padding: 10px 0; color: #f1f5f9; font-weight: 600;">${payload.name}</td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #94a3b8; font-size: 13px; vertical-align: top;">📧 Email</td>
              <td style="padding: 10px 0;"><a href="mailto:${payload.email}" style="color: #a78bfa;">${payload.email}</a></td>
            </tr>
            <tr>
              <td style="padding: 10px 0; color: #94a3b8; font-size: 13px; vertical-align: top;">🎯 Topic</td>
              <td style="padding: 10px 0; color: #f1f5f9;">${payload.request_type}</td>
            </tr>
          </table>

          <div style="margin-top: 20px; background: rgba(139,92,246,0.08); border: 1px solid rgba(139,92,246,0.2); border-radius: 8px; padding: 16px;">
            <p style="color: #94a3b8; font-size: 13px; margin: 0 0 8px 0;">💬 Message</p>
            <p style="color: #e2e8f0; margin: 0; line-height: 1.7; white-space: pre-wrap;">${payload.message}</p>
          </div>

          <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid rgba(255,255,255,0.06); color: #475569; font-size: 12px;">
            Submitted at ${new Date(payload.created_at).toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST via Souhrid's Portfolio Observatory
          </div>
        </div>
      `,
    });

    console.log('Email notification sent via Resend.');
  } catch (err) {
    // Non-fatal — log but don't fail the API response
    console.error('Resend email failed (non-fatal):', err.message);
  }
}

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

    // 1. Save to Supabase (database record)
    const result = await submitContactForm(payload);

    // 2. Send email notification via Resend (non-blocking)
    sendEmailNotification(payload);

    return NextResponse.json({ success: true, result });
  } catch (error) {
    console.error('Contact API Error:', error);
    return NextResponse.json(
      { error: 'Internal server processing error.' },
      { status: 500 }
    );
  }
}
