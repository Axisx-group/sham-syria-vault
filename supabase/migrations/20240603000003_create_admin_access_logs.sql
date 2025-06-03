
-- إنشاء جدول لتسجيل محاولات الوصول للإدارة
create table if not exists public.admin_access_logs (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade,
  access_type text not null,
  ip_address text,
  user_agent text,
  timestamp timestamp with time zone default now(),
  additional_data jsonb,
  created_at timestamp with time zone default now()
);

-- إنشاء فهرس للبحث السريع
create index idx_admin_access_logs_user_id on public.admin_access_logs(user_id);
create index idx_admin_access_logs_timestamp on public.admin_access_logs(timestamp);
create index idx_admin_access_logs_access_type on public.admin_access_logs(access_type);

-- تفعيل Row Level Security
alter table public.admin_access_logs enable row level security;

-- سياسة للسماح للمديرين فقط بالقراءة
create policy "Admins can view access logs"
  on public.admin_access_logs
  for select
  to authenticated
  using (
    exists (
      select 1 from public.profiles 
      where profiles.id = auth.uid() 
      and profiles.role = 'admin'
    )
  );

-- سياسة للسماح بالإدراج (للتسجيل)
create policy "Allow logging access attempts"
  on public.admin_access_logs
  for insert
  to authenticated
  with check (true);

-- إضافة تعليقات للوضوح
comment on table public.admin_access_logs is 'سجل محاولات الوصول للبوابة الآمنة للإدارة';
comment on column public.admin_access_logs.access_type is 'نوع محاولة الوصول (success, failed, logout, etc.)';
comment on column public.admin_access_logs.ip_address is 'عنوان IP للمستخدم';
comment on column public.admin_access_logs.user_agent is 'معلومات المتصفح والجهاز';
