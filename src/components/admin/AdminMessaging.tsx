
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { 
  MessageSquare, 
  Send, 
  Bell, 
  Users, 
  User,
  Mail,
  Phone,
  Search,
  Filter,
  Plus,
  Star,
  Clock,
  CheckCircle2,
  AlertCircle,
  Archive,
  Trash2
} from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AdminMessaging = () => {
  const [selectedConversation, setSelectedConversation] = useState<any>(null);
  const [newMessage, setNewMessage] = useState('');
  const [broadcastMessage, setBroadcastMessage] = useState('');

  const conversations = [
    {
      id: 'CONV001',
      customer: {
        name: 'أحمد محمد علي',
        email: 'ahmed.ali@email.com',
        avatar: 'أ',
        status: 'نشط'
      },
      lastMessage: 'أريد الاستفسار عن رسوم التحويل الدولي',
      timestamp: '2024-01-20 14:30',
      unreadCount: 2,
      priority: 'عادي',
      category: 'استفسار',
      status: 'مفتوح',
      assignedTo: 'سارة أحمد'
    },
    {
      id: 'CONV002',
      customer: {
        name: 'فاطمة حسن محمود',
        email: 'fatima.hassan@email.com',
        avatar: 'ف',
        status: 'نشط'
      },
      lastMessage: 'هناك مشكلة في بطاقتي الائتمانية',
      timestamp: '2024-01-20 13:15',
      unreadCount: 0,
      priority: 'عالي',
      category: 'مشكلة تقنية',
      status: 'قيد المعالجة',
      assignedTo: 'محمد خالد'
    }
  ];

  const messages = [
    {
      id: 'MSG001',
      sender: 'customer',
      content: 'السلام عليكم، أريد الاستفسار عن رسوم التحويل الدولي إلى تركيا',
      timestamp: '2024-01-20 13:00',
      read: true
    },
    {
      id: 'MSG002',
      sender: 'admin',
      content: 'وعليكم السلام، بالطبع يمكنني مساعدتك. رسوم التحويل إلى تركيا هي 2% من المبلغ بحد أدنى 50 ليرة تركية',
      timestamp: '2024-01-20 13:05',
      read: true
    },
    {
      id: 'MSG003',
      sender: 'customer',
      content: 'شكراً لك، وما هو الحد الأقصى للتحويل اليومي؟',
      timestamp: '2024-01-20 14:30',
      read: false
    }
  ];

  const broadcastTemplates = [
    { id: 'TEMP001', title: 'إشعار خدمة جديدة', content: 'نحن سعداء لإعلان إطلاق خدمة جديدة...' },
    { id: 'TEMP002', title: 'تحديث أمني', content: 'تم تحديث إجراءات الأمان في تطبيقنا...' },
    { id: 'TEMP003', title: 'صيانة مجدولة', content: 'سيتم إجراء صيانة مجدولة على النظام...' }
  ];

  const SendBroadcastModal = () => (
    <DialogContent className="max-w-2xl" dir="rtl">
      <DialogHeader>
        <DialogTitle>إرسال رسالة جماعية</DialogTitle>
      </DialogHeader>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">اختيار المستلمين</label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="اختر فئة العملاء" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع العملاء</SelectItem>
              <SelectItem value="active">العملاء النشطين</SelectItem>
              <SelectItem value="vip">عملاء VIP</SelectItem>
              <SelectItem value="business">العملاء التجاريين</SelectItem>
              <SelectItem value="individual">العملاء الأفراد</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">نوع الرسالة</label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="اختر نوع الرسالة" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="notification">إشعار</SelectItem>
              <SelectItem value="promotion">عرض ترويجي</SelectItem>
              <SelectItem value="update">تحديث خدمة</SelectItem>
              <SelectItem value="maintenance">إشعار صيانة</SelectItem>
              <SelectItem value="security">تحديث أمني</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">قوالب جاهزة</label>
          <Select onValueChange={(value) => {
            const template = broadcastTemplates.find(t => t.id === value);
            if (template) setBroadcastMessage(template.content);
          }}>
            <SelectTrigger>
              <SelectValue placeholder="اختر قالب جاهز (اختياري)" />
            </SelectTrigger>
            <SelectContent>
              {broadcastTemplates.map((template) => (
                <SelectItem key={template.id} value={template.id}>
                  {template.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">عنوان الرسالة</label>
          <Input placeholder="أدخل عنوان الرسالة..." />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">محتوى الرسالة</label>
          <Textarea 
            value={broadcastMessage}
            onChange={(e) => setBroadcastMessage(e.target.value)}
            placeholder="اكتب محتوى الرسالة هنا..."
            className="min-h-[150px]"
          />
        </div>

        <div className="flex gap-2">
          <Button className="flex-1">
            <Send className="h-4 w-4 mr-2" />
            إرسال الآن
          </Button>
          <Button variant="outline" className="flex-1">
            <Clock className="h-4 w-4 mr-2" />
            جدولة الإرسال
          </Button>
        </div>
      </div>
    </DialogContent>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">نظام المراسلة الداخلية</h2>
          <p className="text-gray-600">إدارة المحادثات والإشعارات مع العملاء</p>
        </div>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Bell className="h-4 w-4 mr-2" />
                رسالة جماعية
              </Button>
            </DialogTrigger>
            <SendBroadcastModal />
          </Dialog>
          <Button variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            محادثة جديدة
          </Button>
        </div>
      </div>

      <Tabs defaultValue="conversations" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="conversations">المحادثات</TabsTrigger>
          <TabsTrigger value="notifications">الإشعارات</TabsTrigger>
          <TabsTrigger value="templates">القوالب</TabsTrigger>
          <TabsTrigger value="analytics">التحليلات</TabsTrigger>
        </TabsList>

        <TabsContent value="conversations">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px]">
            {/* Conversations List */}
            <Card className="lg:col-span-1">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>المحادثات</CardTitle>
                  <Badge variant="secondary">15 غير مقروءة</Badge>
                </div>
                <div className="flex gap-2">
                  <Input placeholder="البحث في المحادثات..." className="flex-1" />
                  <Button size="sm" variant="outline">
                    <Filter className="h-4 w-4" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-1 max-h-[450px] overflow-y-auto">
                  {conversations.map((conv) => (
                    <div 
                      key={conv.id}
                      className={`p-4 border-b cursor-pointer hover:bg-gray-50 ${selectedConversation?.id === conv.id ? 'bg-blue-50 border-blue-200' : ''}`}
                      onClick={() => setSelectedConversation(conv)}
                    >
                      <div className="flex items-start space-x-3 space-x-reverse">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                          {conv.customer.avatar}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <h4 className="font-medium text-sm truncate">{conv.customer.name}</h4>
                            <span className="text-xs text-gray-500">{conv.timestamp.split(' ')[1]}</span>
                          </div>
                          <p className="text-sm text-gray-600 truncate">{conv.lastMessage}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge size="sm" className={
                              conv.priority === 'عالي' ? 'bg-red-100 text-red-800' :
                              conv.priority === 'متوسط' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-gray-100 text-gray-800'
                            }>
                              {conv.priority}
                            </Badge>
                            {conv.unreadCount > 0 && (
                              <Badge size="sm" className="bg-blue-600 text-white">
                                {conv.unreadCount}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Chat Window */}
            <Card className="lg:col-span-2">
              {selectedConversation ? (
                <>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 space-x-reverse">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                          {selectedConversation.customer.avatar}
                        </div>
                        <div>
                          <h3 className="font-semibold">{selectedConversation.customer.name}</h3>
                          <p className="text-sm text-gray-600">{selectedConversation.customer.email}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Badge className={selectedConversation.status === 'مفتوح' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}>
                          {selectedConversation.status}
                        </Badge>
                        <Button size="sm" variant="outline">
                          <Archive className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="flex flex-col h-[400px]">
                    {/* Messages */}
                    <div className="flex-1 overflow-y-auto space-y-4 mb-4">
                      {messages.map((message) => (
                        <div key={message.id} className={`flex ${message.sender === 'admin' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-[70%] p-3 rounded-lg ${
                            message.sender === 'admin' 
                              ? 'bg-blue-600 text-white' 
                              : 'bg-gray-100 text-gray-900'
                          }`}>
                            <p className="text-sm">{message.content}</p>
                            <p className={`text-xs mt-1 ${message.sender === 'admin' ? 'text-blue-100' : 'text-gray-500'}`}>
                              {message.timestamp}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    {/* Message Input */}
                    <div className="flex gap-2">
                      <Input 
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="اكتب رسالتك هنا..."
                        className="flex-1"
                        onKeyPress={(e) => e.key === 'Enter' && setNewMessage('')}
                      />
                      <Button>
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </>
              ) : (
                <CardContent className="flex items-center justify-center h-[500px]">
                  <div className="text-center text-gray-500">
                    <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                    <p>اختر محادثة لبدء المراسلة</p>
                  </div>
                </CardContent>
              )}
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>إدارة الإشعارات</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardContent className="p-6 text-center">
                    <Bell className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                    <h3 className="font-semibold mb-2">إشعارات الأمان</h3>
                    <p className="text-sm text-gray-600 mb-4">تنبيهات تسجيل الدخول والعمليات المشبوهة</p>
                    <Button size="sm">إدارة</Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6 text-center">
                    <Mail className="h-12 w-12 mx-auto mb-4 text-green-600" />
                    <h3 className="font-semibold mb-2">إشعارات المعاملات</h3>
                    <p className="text-sm text-gray-600 mb-4">تأكيدات التحويلات والمدفوعات</p>
                    <Button size="sm">إدارة</Button>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="p-6 text-center">
                    <Star className="h-12 w-12 mx-auto mb-4 text-purple-600" />
                    <h3 className="font-semibold mb-2">إشعارات تسويقية</h3>
                    <p className="text-sm text-gray-600 mb-4">عروض وخدمات جديدة</p>
                    <Button size="sm">إدارة</Button>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="templates">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>قوالب الرسائل</CardTitle>
                <Button>
                  <Plus className="h-4 w-4 mr-2" />
                  قالب جديد
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {broadcastTemplates.map((template) => (
                  <Card key={template.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{template.title}</CardTitle>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">تعديل</Button>
                          <Button size="sm" variant="outline" className="text-red-600">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600 text-sm">{template.content}</p>
                      <Button className="mt-4" size="sm">استخدام القالب</Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">الرسائل المرسلة</p>
                    <p className="text-2xl font-bold text-gray-900">1,234</p>
                  </div>
                  <MessageSquare className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">معدل الاستجابة</p>
                    <p className="text-2xl font-bold text-gray-900">94%</p>
                  </div>
                  <CheckCircle2 className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">متوسط وقت الرد</p>
                    <p className="text-2xl font-bold text-gray-900">4.2 د</p>
                  </div>
                  <Clock className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">رضا العملاء</p>
                    <p className="text-2xl font-bold text-gray-900">4.8/5</p>
                  </div>
                  <Star className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminMessaging;
