// pages/user-management.tsx
"use client";
import * as React from "react";
import SideNavigation from "@/app/SideNavigation";
import HeaderPage from "@/app/LocalComponents/HeaderPage";
import { getAllUserProfile } from "@/Utils/serviceLogin";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
interface UserInfo {
  id: string;
  created_at: string;
  member_details: {
    level: string;
  };
  application_info: {
    iss: string;
    sub: string;
    name: string;
    email: string;
    picture: string;
    full_name: string;
    avatar_url: string;
    provider_id: string;
    email_verified: boolean;
  };
  user_details: {
    name?: string;
    logisticName?: string;
    applicantType?: string;
    contactNumber?: string;
  };
  warehouse: null | unknown; // Update 'unknown' if you know the type of warehouse
  team_info: null | unknown; // Update 'unknown' if you know the type of team_info
  company_info: null | unknown; // Update 'unknown' if you know the type of company_info
  userLevel: null | unknown; // Update 'unknown' if you know the type of userLevel
}

const users = [
  {
    id: 1,
    name: "Amélie Laurent",
    email: "amelie@untitledui.com",
    lastActive: "Mar 4, 2024",
    dateAdded: "July 4, 2022",
    permissions: {
      superAdmin: false,
      admin: true,
      dataExport: true,
      dataImport: false,
      account: true,
    },
  },
  // Add more users here...
];

export default function UserManagement() {
  const [selectedUser, setSelectedUser] = React.useState(null);
  const [allUsers, setUsers] = React.useState<UserInfo[]>([]);

  React.useEffect(() => {
    const services = () => {
      const data = async () => {
        try {
          let users: UserInfo[] = (await getAllUserProfile()) || [];
          console.log("userss", users);
          setUsers(users);
        } catch (error) {}
      };
      data();
    };
    services();
  }, []);
  return (
    <div className="">
      <SideNavigation />
      <HeaderPage title={`Good morning! 👋 `} subtitle="" />

      <div className="p-6 ml-20">
        <h1 className="text-2xl font-bold mb-4">User Management</h1>
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="w-[90%]  text-left text-sm">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="px-4 py-2">User name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Last active</th>
                <th className="px-4 py-2">Date added</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {allUsers.map((user: UserInfo) => (
                <tr key={user.id} className="border-b">
                  <td className="px-4 py-2">{user.id}</td>
                  <td className="px-4 py-2">{user.user_details?.name}</td>
                  <td className="px-4 py-2">
                    {user.user_details?.contactNumber}
                  </td>
                  <td className="px-4 py-2">
                    {user.user_details?.contactNumber}
                  </td>
                  <td className="px-4 py-2">
                    <Button>Manage</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {selectedUser && (
          <Sheet
            open={!!selectedUser}
            onOpenChange={() => setSelectedUser(null)}
          >
            {/* <SheetContent >
              <SheetHeader>
                <SheetTitle>{selectedUser?.user}</SheetTitle>
                <SheetDescription>{selectedUser?.email}</SheetDescription>
              </SheetHeader>
              <div className="mt-4 space-y-4">
                <div className="flex items-center justify-between">
                  <span>Super Admin</span>
                  <Switch checked={selectedUser.permissions.superAdmin} />
                </div>
                <div className="flex items-center justify-between">
                  <span>Admin</span>
                  <Switch checked={selectedUser.permissions.admin} />
                </div>
                <div className="flex items-center justify-between">
                  <span>Data Export</span>
                  <Switch checked={selectedUser.permissions.dataExport} />
                </div>
                <div className="flex items-center justify-between">
                  <span>Data Import</span>
                  <Switch checked={selectedUser.permissions.dataImport} />
                </div>
                <div className="flex items-center justify-between">
                  <span>Account</span>
                  <Switch checked={selectedUser.permissions.account} />
                </div>
              </div>
              <div className="mt-6 flex justify-between">
                <Button variant="destructive">Delete user</Button>
                <Button onClick={() => setSelectedUser(null)}>
                  Save changes
                </Button>
              </div>
            </SheetContent> */}
          </Sheet>
        )}
      </div>
    </div>
  );
}
