import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    // Kontrollera om API-nyckel är satt
    if (!process.env.RESEND_API_KEY) {
      console.error('RESEND_API_KEY is not set');
      return NextResponse.json(
        { error: 'E-posttjänsten är inte konfigurerad. Kontakta administratören.' },
        { status: 500 }
      );
    }

    const body = await request.json();
    const { name, email, company, message } = body;

    // Validering
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Namn, e-post och meddelande är obligatoriska fält.' },
        { status: 400 }
      );
    }

    // Validera e-postformat
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Ogiltig e-postadress.' },
        { status: 400 }
      );
    }

    // Skicka e-post till mohamed@southbase.se
    // Använd Resends testdomän för utveckling, eller verifierad domän för produktion
    const fromEmail = process.env.NODE_ENV === 'production' 
      ? 'Southbase <noreply@southbase.se>'
      : 'Southbase <onboarding@resend.dev>';
    
    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: ['mohamed@southbase.se'],
      replyTo: email,
      subject: `Ny förfrågan från ${name}${company ? ` - ${company}` : ''}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #083050;">Ny förfrågan från webbplatsen</h2>
          
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Namn:</strong> ${name}</p>
            <p><strong>E-post:</strong> <a href="mailto:${email}">${email}</a></p>
            ${company ? `<p><strong>Företag:</strong> ${company}</p>` : ''}
          </div>
          
          <div style="margin: 20px 0;">
            <h3 style="color: #083050;">Meddelande:</h3>
            <p style="white-space: pre-wrap; line-height: 1.6;">${message}</p>
          </div>
          
          <hr style="border: none; border-top: 1px solid #e0e0e0; margin: 30px 0;">
          
          <p style="color: #666; font-size: 12px;">
            Detta meddelande skickades från kontaktformuläret på southbase.se
          </p>
        </div>
      `,
      text: `
Ny förfrågan från webbplatsen

Namn: ${name}
E-post: ${email}
${company ? `Företag: ${company}` : ''}

Meddelande:
${message}
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Ett fel uppstod vid skickande av e-post. Försök igen senare.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: 'Tack! Din förfrågan har skickats. Vi återkommer så snart som möjligt.' },
      { status: 200 }
    );
  } catch (error) {
    console.error('API error:', error);
    return NextResponse.json(
      { error: 'Ett oväntat fel uppstod. Försök igen senare.' },
      { status: 500 }
    );
  }
}

