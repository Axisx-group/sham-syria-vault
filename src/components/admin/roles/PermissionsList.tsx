
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield } from "lucide-react";
import { allPermissions } from "@/data/adminRoleData";

const PermissionsList = () => {
  return (
    <div className="space-y-6">
      {Object.entries(
        allPermissions.reduce((acc, permission) => {
          if (!acc[permission.category]) acc[permission.category] = [];
          acc[permission.category].push(permission);
          return acc;
        }, {} as Record<string, typeof allPermissions>)
      ).map(([category, permissions]) => (
        <Card key={category}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              {category}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {permissions.map((permission) => (
                <div key={permission.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <span className="font-medium">{permission.name}</span>
                  <Badge variant="outline">{permission.id}</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default PermissionsList;
