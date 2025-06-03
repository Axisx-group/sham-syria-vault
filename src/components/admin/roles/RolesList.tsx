
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Key, Edit, Trash2 } from "lucide-react";
import { roles } from "@/data/adminRoleData";

const RolesList = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {roles.map((role) => (
        <Card key={role.id} className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-lg flex items-center justify-center">
                  <Key className="h-5 w-5 text-white" />
                </div>
                <div>
                  <CardTitle className="text-lg">{role.name}</CardTitle>
                  <Badge className={role.color}>{role.level}</Badge>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button size="sm" variant="outline" className="text-red-600">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">{role.description}</p>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">عدد المستخدمين:</span>
                <Badge variant="outline">{role.usersCount}</Badge>
              </div>
              
              <div>
                <p className="text-sm font-medium mb-2">الصلاحيات ({role.permissions.length}):</p>
                <div className="flex flex-wrap gap-1">
                  {role.permissions.slice(0, 3).map((permission, index) => (
                    <Badge key={index} variant="outline" className="text-xs">
                      {permission}
                    </Badge>
                  ))}
                  {role.permissions.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{role.permissions.length - 3} المزيد
                    </Badge>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default RolesList;
