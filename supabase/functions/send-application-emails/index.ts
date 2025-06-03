
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface EmailData {
  applicationToken: string;
  customerName: string;
  customerEmail: string;
  accountType: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { applicationToken, customerName, customerEmail, accountType }: EmailData = await req.json()

    // إرسال إيميل للعميل
    const customerEmailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('RESEND_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'نظام البنك <noreply@bank.com>',
        to: [customerEmail],
        subject: 'تم استلام طلب فتح الحساب',
        html: `
          <div dir="rtl" style="font-family: Arial, sans-serif;">
            <h2>عزيزي/عزيزتي ${customerName}</h2>
            <p>تم استلام طلبكم لفتح حساب ${accountType} بنجاح.</p>
            <p><strong>رقم الطلب:</strong> ${applicationToken}</p>
            <p>سيتم مراجعة طلبكم من قبل فريقنا وسنتواصل معكم قريباً.</p>
            <p>شكراً لاختياركم بنكنا.</p>
            <hr>
            <p style="color: #666; font-size: 12px;">
              يمكنكم متابعة حالة طلبكم من خلال الرابط التالي:<br>
              <a href="${Deno.env.get('SITE_URL')}/application-status?token=${applicationToken}">
                متابعة حالة الطلب
              </a>
            </p>
          </div>
        `,
      }),
    })

    // إرسال إيميل للإدارة
    const adminEmailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${Deno.env.get('RESEND_API_KEY')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'نظام البنك <noreply@bank.com>',
        to: ['admin@bank.com'],
        subject: 'طلب فتح حساب جديد',
        html: `
          <div dir="rtl" style="font-family: Arial, sans-serif;">
            <h2>طلب فتح حساب جديد</h2>
            <p><strong>اسم العميل:</strong> ${customerName}</p>
            <p><strong>البريد الإلكتروني:</strong> ${customerEmail}</p>
            <p><strong>نوع الحساب:</strong> ${accountType}</p>
            <p><strong>رقم الطلب:</strong> ${applicationToken}</p>
            <p>يرجى مراجعة الطلب في لوحة الإدارة.</p>
          </div>
        `,
      }),
    })

    return new Response(
      JSON.stringify({ 
        success: true, 
        customerEmailSent: customerEmailResponse.ok,
        adminEmailSent: adminEmailResponse.ok 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )

  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})
