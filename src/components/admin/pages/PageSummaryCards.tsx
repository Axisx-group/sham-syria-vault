
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  FileText,
  Eye,
  TrendingUp,
  Smartphone
} from "lucide-react";

interface PageSummaryCardsProps {
  pages: any[];
}

const PageSummaryCards = ({ pages }: PageSummaryCardsProps) => {
  const totalViews = pages.reduce((total, page) => total + parseInt(page.views.replace(',', '')), 0);
  const avgSeoScore = Math.round(pages.reduce((total, page) => total + page.seoScore, 0) / pages.length);
  const mobileOptimizedCount = pages.filter(page => page.mobileOptimized).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">إجمالي الصفحات</CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{pages.length}</div>
          <p className="text-xs text-muted-foreground">
            صفحة نشطة
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">إجمالي المشاهدات</CardTitle>
          <Eye className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {totalViews.toLocaleString()}
          </div>
          <p className="text-xs text-muted-foreground">
            +8% من الشهر الماضي
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">متوسط SEO</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {avgSeoScore}%
          </div>
          <p className="text-xs text-muted-foreground">
            جيد جداً
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">محسن للهاتف</CardTitle>
          <Smartphone className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {mobileOptimizedCount}/{pages.length}
          </div>
          <p className="text-xs text-muted-foreground">
            صفحة محسنة
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default PageSummaryCards;
