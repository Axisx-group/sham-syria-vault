
import React, { useState } from 'react';
import { 
  Home, 
  CreditCard, 
  TrendingUp, 
  Users, 
  Settings, 
  MessageSquare,
  Bell,
  Menu,
  X,
  ChevronRight,
  Sun,
  Moon
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ComponentType<any>;
  href?: string;
  badge?: number;
  children?: SidebarItem[];
}

interface ModernSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  items: SidebarItem[];
  collapsed?: boolean;
  onToggleCollapse?: () => void;
}

const ModernSidebar: React.FC<ModernSidebarProps> = ({
  activeTab,
  onTabChange,
  items,
  collapsed = false,
  onToggleCollapse
}) => {
  const { theme, toggleTheme } = useTheme();
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleExpanded = (itemId: string) => {
    setExpandedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const renderSidebarItem = (item: SidebarItem, level = 0) => {
    const Icon = item.icon;
    const isActive = activeTab === item.id;
    const isExpanded = expandedItems.includes(item.id);
    const hasChildren = item.children && item.children.length > 0;

    return (
      <div key={item.id} className="w-full">
        <Button
          variant={isActive ? "secondary" : "ghost"}
          className={cn(
            "w-full justify-start gap-3 h-12 transition-all duration-200",
            level > 0 && "mr-4 ml-6",
            collapsed && "justify-center px-2",
            isActive && "bg-primary/10 border-r-2 border-primary",
            "hover:bg-accent/50 hover:scale-[1.02]"
          )}
          onClick={() => {
            if (hasChildren) {
              toggleExpanded(item.id);
            } else {
              onTabChange(item.id);
            }
          }}
        >
          <Icon className={cn(
            "h-5 w-5 transition-colors",
            isActive && "text-primary"
          )} />
          {!collapsed && (
            <>
              <span className="flex-1 text-right font-medium">{item.label}</span>
              {item.badge && (
                <span className="bg-red-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] h-5 flex items-center justify-center">
                  {item.badge}
                </span>
              )}
              {hasChildren && (
                <ChevronRight className={cn(
                  "h-4 w-4 transition-transform",
                  isExpanded && "rotate-90"
                )} />
              )}
            </>
          )}
        </Button>
        
        {hasChildren && isExpanded && !collapsed && (
          <div className="mt-1 space-y-1">
            {item.children?.map(child => renderSidebarItem(child, level + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={cn(
      "h-screen bg-card border-l border-border transition-all duration-300 flex flex-col",
      collapsed ? "w-16" : "w-72"
    )} dir="rtl">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          {!collapsed && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <CreditCard className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-lg">البنك الرقمي</h2>
                <p className="text-sm text-muted-foreground">نظام الإدارة</p>
              </div>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleCollapse}
            className="hover:bg-accent"
          >
            {collapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Navigation Items */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {items.map(item => renderSidebarItem(item))}
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-border space-y-2">
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-start gap-3 h-12",
            collapsed && "justify-center px-2"
          )}
          onClick={toggleTheme}
        >
          {theme === 'light' ? (
            <Moon className="h-5 w-5" />
          ) : (
            <Sun className="h-5 w-5" />
          )}
          {!collapsed && (
            <span className="flex-1 text-right">
              {theme === 'light' ? 'الوضع الداكن' : 'الوضع الفاتح'}
            </span>
          )}
        </Button>
        
        {!collapsed && (
          <div className="text-center text-xs text-muted-foreground pt-2">
            النسخة 2.1.0
          </div>
        )}
      </div>
    </div>
  );
};

export default ModernSidebar;
