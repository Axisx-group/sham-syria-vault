
import React from 'react';
import { Button } from "@/components/ui/button";
import { Key, UserPlus } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AdminRoleStats from "@/components/admin/roles/AdminRoleStats";
import CreateAdminModal from "@/components/admin/roles/CreateAdminModal";
import CreateRoleModal from "@/components/admin/roles/CreateRoleModal";
import AdminsList from "@/components/admin/roles/AdminsList";
import RolesList from "@/components/admin/roles/RolesList";
import PermissionsList from "@/components/admin/roles/PermissionsList";

const AdminRoleManagement = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">إدارة الأدوار والصلاحيات</h2>
          <p className="text-gray-600">إدارة المشرفين وتحديد صلاحياتهم</p>
        </div>
        <div className="flex gap-2">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant="outline">
                <Key className="h-4 w-4 mr-2" />
                دور جديد
              </Button>
            </DialogTrigger>
            <CreateRoleModal />
          </Dialog>
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <UserPlus className="h-4 w-4 mr-2" />
                مشرف جديد
              </Button>
            </DialogTrigger>
            <CreateAdminModal />
          </Dialog>
        </div>
      </div>

      <AdminRoleStats />

      <Tabs defaultValue="admins" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="admins">المشرفين</TabsTrigger>
          <TabsTrigger value="roles">الأدوار</TabsTrigger>
          <TabsTrigger value="permissions">الصلاحيات</TabsTrigger>
        </TabsList>

        <TabsContent value="admins">
          <AdminsList />
        </TabsContent>

        <TabsContent value="roles">
          <RolesList />
        </TabsContent>

        <TabsContent value="permissions">
          <PermissionsList />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminRoleManagement;
