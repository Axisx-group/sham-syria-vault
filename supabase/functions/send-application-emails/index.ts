
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
  action?: 'approve' | 'reject';
  adminNotes?: string;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { applicationToken, customerName, customerEmail, accountType, action, adminNotes }: EmailData = await req.json()

    console.log('معالجة طلب إرسال إيميل:', { applicationToken, customerName, customerEmail, accountType, action })

    // تحديد نوع الرسالة بناءً على الإجراء
    let subject = '';
    let customerMessage = '';
    let adminMessage = '';

    if (action === 'approve') {
      subject = 'تم قبول طلب فتح الحساب - مبروك!';
      customerMessage = `
        <div dir="rtl" style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2 style="color: #28a745;">مبروك! تم قبول طلبكم</h2>
          <p>عزيزي/عزيزتي <strong>${customerName}</strong></p>
          <p>نتشرف بإعلامكم أنه تم قبول طلبكم لفتح حساب ${accountType} بنجاح.</p>
          <p><strong>رقم الطلب:</strong> ${applicationToken}</p>
          ${adminNotes ? `<p><strong>ملاحظات الإدارة:</strong> ${adminNotes}</p>` : ''}
          <p>سيتم التواصل معكم قريباً لإكمال الإجراءات المطلوبة.</p>
          <p>نشكركم لاختياركم بنكنا ونتطلع لخدمتكم.</p>
          <hr style="margin: 20px 0;">
          <p style="color: #666; font-size: 12px;">
            فريق خدمة العملاء<br>
            البنك الرقمي
          </p>
        </div>
      `;
      adminMessage = `تم قبول طلب فتح الحساب للعميل ${customerName}`;
    } else if (action === 'reject') {
      subject = 'بخصوص طلب فتح الحساب';
      customerMessage = `
        <div dir="rtl" style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2 style="color: #dc3545;">بخصوص طلب فتح الحساب</h2>
          <p>عزيزي/عزيزتي <strong>${customerName}</strong></p>
          <p>نشكركم على اهتمامكم بخدماتنا المصرفية.</p>
          <p><strong>رقم الطلب:</strong> ${applicationToken}</p>
          <p>نأسف لإعلامكم أنه لم يتم قبول طلبكم لفتح حساب ${accountType} في الوقت الحالي.</p>
          ${adminNotes ? `<p><strong>السبب:</strong> ${adminNotes}</p>` : ''}
          <p>يمكنكم التواصل معنا لمزيد من التوضيحات أو إعادة تقديم الطلب لاحقاً.</p>
          <p>نشكركم لتفهمكم.</p>
          <hr style="margin: 20px 0;">
          <p style="color: #666; font-size: 12px;">
            فريق خدمة العملاء<br>
            البنك الرقمي
          </p>
        </div>
      `;
      adminMessage = `تم رفض طلب فتح الحساب للعميل ${customerName}`;
    } else {
      // رسالة استلام الطلب الأولية
      subject = 'تم استلام طلب فتح الحساب';
      customerMessage = `
        <div dir="rtl" style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2>تم استلام طلبكم بنجاح</h2>
          <p>عزيزي/عزيزتي <strong>${customerName}</strong></p>
          <p>تم استلام طلبكم لفتح حساب ${accountType} بنجاح.</p>
          <p><strong>رقم الطلب:</strong> ${applicationToken}</p>
          <p>سيتم مراجعة طلبكم من قبل فريقنا وسنتواصل معكم قريباً.</p>
          <p>شكراً لاختياركم بنكنا.</p>
          <hr style="margin: 20px 0;">
          <p style="color: #666; font-size: 12px;">
            يمكنكم متابعة حالة طلبكم من خلال الرابط التالي:<br>
            <a href="${Deno.env.get('SITE_URL') || 'https://example.com'}/application-status?token=${applicationToken}">
              متابعة حالة الطلب
            </a>
          </p>
        </div>
      `;
      adminMessage = `طلب فتح حساب جديد من العميل ${customerName}`;
    }

    // محاولة إرسال الإيميل للعميل
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    
    if (!resendApiKey) {
      console.error('RESEND_API_KEY غير متوفر');
      return new Response(
        JSON.stringify({ 
          error: 'Email service not configured',
          success: false,
          customerEmailSent: false,
          adminEmailSent: false 
        }),
        {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
          status: 500,
        },
      )
    }

    let customerEmailSent = false;
    let adminEmailSent = false;

    // إرسال إيميل للعميل
    try {
      const customerEmailResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'نظام البنك <noreply@bank.com>',
          to: [customerEmail],
          subject: subject,
          html: customerMessage,
        }),
      })

      customerEmailSent = customerEmailResponse.ok;
      console.log('حالة إرسال إيميل العميل:', customerEmailSent);
    } catch (error) {
      console.error('خطأ في إرسال إيميل العميل:', error);
    }

    // إرسال إيميل للإدارة
    try {
      const adminEmailResponse = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${resendApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'نظام البنك <noreply@bank.com>',
          to: ['admin@bank.com'],
          subject: action ? `${action === 'approve' ? 'قبول' : 'رفض'} طلب فتح حساب` : 'طلب فتح حساب جديد',
          html: `
            <div dir="rtl" style="font-family: Arial, sans-serif; line-height: 1.6;">
              <h2>${adminMessage}</h2>
              <p><strong>اسم العميل:</strong> ${customerName}</p>
              <p><strong>البريد الإلكتروني:</strong> ${customerEmail}</p>
              <p><strong>نوع الحساب:</strong> ${accountType}</p>
              <p><strong>رقم الطلب:</strong> ${applicationToken}</p>
              ${adminNotes ? `<p><strong>ملاحظات:</strong> ${adminNotes}</p>` : ''}
              ${!action ? '<p>يرجى مراجعة الطلب في لوحة الإدارة.</p>' : ''}
            </div>
          `,
        }),
      })

      adminEmailSent = adminEmailResponse.ok;
      console.log('حالة إرسال إيميل الإدارة:', adminEmailSent);
    } catch (error) {
      console.error('خطأ في إرسال إيميل الإدارة:', error);
    }

    return new Response(
      JSON.stringify({ 
        success: true, 
        customerEmailSent,
        adminEmailSent,
        message: 'تم معالجة طلب الإيميل'
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )

  } catch (error) {
    console.error('خطأ في دالة إرسال الإيميلات:', error);
    return new Response(
      JSON.stringify({ 
        error: error.message,
        success: false,
        customerEmailSent: false,
        adminEmailSent: false 
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})
