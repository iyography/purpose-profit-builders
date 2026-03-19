import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const { to, fullName, result } = await request.json();

    if (!to || !fullName || !result) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const firstName = fullName.split(' ')[0];

    const emailHtml = buildResultsEmail({
      firstName,
      profileName: result.profileName,
      profileEmoji: result.profileEmoji,
      primaryChallenge: result.primaryChallenge,
      whatsWorking: result.summary.whatsWorking,
      needsAttention: result.summary.needsAttention,
      nextSteps: result.nextSteps,
      ctaPrimary: result.cta.primary,
      ctaSecondary: result.cta.secondary,
    });

    const { data, error } = await resend.emails.send({
      from: 'Purpose & Profit Builders <info@purposeprofitbuilders.com>',
      to: [to],
      subject: `${firstName}, Your Clarity Quiz Results: You're a ${result.profileName} ${result.profileEmoji}`,
      html: emailHtml,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json({ error: 'Failed to send email' }, { status: 500 });
    }

    return NextResponse.json({ success: true, id: data?.id });
  } catch (error) {
    console.error('Email send error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

interface EmailData {
  firstName: string;
  profileName: string;
  profileEmoji: string;
  primaryChallenge: string;
  whatsWorking: string[];
  needsAttention: string[];
  nextSteps: string[];
  ctaPrimary: { label: string; url: string };
  ctaSecondary?: { label: string; url: string };
}

function buildResultsEmail(data: EmailData): string {
  const whatsWorkingHtml = data.whatsWorking
    .map(item => `<tr><td style="padding:6px 0;color:#a3e635;font-size:16px;width:24px;vertical-align:top;">&#10003;</td><td style="padding:6px 0;color:#d4d0c8;font-size:15px;line-height:1.5;">${item}</td></tr>`)
    .join('');

  const needsAttentionHtml = data.needsAttention
    .map(item => `<tr><td style="padding:6px 0;color:#d4a017;font-size:16px;width:24px;vertical-align:top;">&#9679;</td><td style="padding:6px 0;color:#d4d0c8;font-size:15px;line-height:1.5;">${item}</td></tr>`)
    .join('');

  const nextStepsHtml = data.nextSteps
    .map((step, i) => `
      <tr>
        <td style="padding:8px 0;vertical-align:top;width:32px;">
          <div style="background:linear-gradient(135deg,#d4a017,#b8860b);color:#000;border-radius:50%;width:28px;height:28px;text-align:center;line-height:28px;font-weight:bold;font-size:13px;">${i + 1}</div>
        </td>
        <td style="padding:8px 0;color:#d4d0c8;font-size:15px;line-height:1.5;">${step}</td>
      </tr>
    `)
    .join('');

  const secondaryCtaHtml = data.ctaSecondary
    ? `<a href="${data.ctaSecondary.url}" style="display:inline-block;margin-top:12px;padding:14px 32px;border:2px solid rgba(212,160,23,0.4);color:#d4a017;border-radius:50px;font-weight:600;font-size:16px;text-decoration:none;">${data.ctaSecondary.label}</a>`
    : '';

  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background-color:#1a1a2e;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;">
  <div style="max-width:600px;margin:0 auto;padding:24px 16px;">

    <!-- Header -->
    <div style="text-align:center;padding:32px 24px;background:linear-gradient(135deg,#1a1a2e 0%,#2d2d44 100%);border-radius:16px 16px 0 0;border:1px solid rgba(212,160,23,0.15);border-bottom:none;">
      <div style="font-size:48px;margin-bottom:12px;">${data.profileEmoji}</div>
      <div style="font-size:11px;letter-spacing:3px;color:#d4a017;text-transform:uppercase;margin-bottom:8px;">Your Builder Profile</div>
      <h1 style="margin:0 0 8px;font-size:32px;background:linear-gradient(135deg,#d4a017,#b8860b);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;">${data.profileName}</h1>
      <p style="margin:0;color:rgba(212,208,200,0.6);font-size:16px;">${data.primaryChallenge}</p>
    </div>

    <!-- Body -->
    <div style="background:#2d2d44;padding:0;border:1px solid rgba(212,160,23,0.15);border-top:none;border-radius:0 0 16px 16px;">

      <!-- Greeting -->
      <div style="padding:28px 28px 0;">
        <p style="color:#d4d0c8;font-size:16px;line-height:1.6;margin:0;">
          Hey ${data.firstName},<br><br>
          Thanks for taking the Clarity Quiz! Here are your personalized results based on where you are in your faith-driven business journey.
        </p>
      </div>

      <!-- What's Working -->
      <div style="margin:24px 28px;padding:20px;background:rgba(34,120,34,0.12);border:1px solid rgba(74,222,128,0.2);border-radius:12px;">
        <h3 style="margin:0 0 12px;color:#4ade80;font-size:17px;font-weight:bold;">What's Working</h3>
        <table style="width:100%;border-collapse:collapse;">${whatsWorkingHtml}</table>
      </div>

      <!-- Needs Attention -->
      <div style="margin:24px 28px;padding:20px;background:rgba(212,160,23,0.06);border:1px solid rgba(212,160,23,0.15);border-radius:12px;">
        <h3 style="margin:0 0 12px;color:#d4a017;font-size:17px;font-weight:bold;">Needs Attention</h3>
        <table style="width:100%;border-collapse:collapse;">${needsAttentionHtml}</table>
      </div>

      <!-- Next Steps -->
      <div style="margin:24px 28px;padding:20px;background:rgba(212,208,200,0.04);border:1px solid rgba(212,208,200,0.08);border-radius:12px;">
        <h3 style="margin:0 0 12px;color:#f5f5f0;font-size:17px;font-weight:bold;">Your Next Steps</h3>
        <table style="width:100%;border-collapse:collapse;">${nextStepsHtml}</table>
      </div>

      <!-- CTAs -->
      <div style="text-align:center;padding:28px;">
        <a href="${data.ctaPrimary.url}" style="display:inline-block;padding:16px 40px;background:linear-gradient(135deg,#d4a017,#b8860b);color:#000;border-radius:50px;font-weight:bold;font-size:17px;text-decoration:none;">${data.ctaPrimary.label}</a>
        <br>
        ${secondaryCtaHtml}
      </div>

    </div>

    <!-- Footer -->
    <div style="text-align:center;padding:24px 16px;">
      <p style="color:rgba(212,208,200,0.35);font-size:12px;margin:0;line-height:1.6;">
        Purpose & Profit Builders<br>
        Building Kingdom businesses with faith, clarity, and systems.
      </p>
    </div>

  </div>
</body>
</html>
`;
}
