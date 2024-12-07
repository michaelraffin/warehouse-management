// pages/user-management.tsx
"use client";
import * as React from "react";
import SideNavigation from "@/app/SideNavigation";
import HeaderPage from "@/app/LocalComponents/HeaderPage";
import AddUser from "@/app/LocalComponents/addUserPopup";
import ViewUserSheet from "@/app/LocalComponents/UserAccountSheet";
import { getAllUserProfile } from "@/Utils/serviceLogin";
import { signUpUser, updateUser } from "@/Utils/supabaseService";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Toaster, toast } from "sonner";
import { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
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
    accountStatus?: boolean;
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
function InlineWrapperWithMargin({ children }: { children?: ReactNode }) {
  return <div style={{ marginRight: "0.5rem" }}>{children}</div>;
}
interface User {
  fullName: string; // Full name of the user
  username: string; // Username
  logisticName: string; // Name of the logistic, e.g., "Lai-Warehouse"
  userType: string; // Type of the applicant
  mobileNumber: string; // Contact number
  branch: string; // Branch name
}
export default function UserManagement() {
  const [selectedUser, setSelectedUser] = React.useState(null);
  const [allUsers, setUsers] = React.useState<UserInfo[]>([]);
  const [username, setUsername] = React.useState<string>("");
  const [fullName, setFullName] = React.useState<string>("");
  const [branch, setSelectedBranch] = React.useState<string>("");
  const [userType, setUserType] = React.useState<string>("");
  const [mobileNumber, setMobile] = React.useState<string>("");
  const [isDimissed, setDismissAdduser] = React.useState<boolean>(false);
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
  const dismissedCallBack = async () => {};
  const updateUserStatus = (e: UserInfo, status: boolean) => {
    const service = async () => {
      e.application_info.accountStatus = status;
      return await updateUser(e, status);
    };
    service().then((status) => {
      toast.warning(
        status ? "Account has been turned on" : "Account has beened turn off",
      );
    });
  };
  const getBadgeType = (e: UserInfo) => {
    try {
      if (e.application_info?.accountStatus) {
        return (
          <Badge
            variant="outline"
            className=" mb-2 text-xs border border-green-600 text-green-800"
          >
            Active
          </Badge>
        );
      } else {
        return (
          <Badge variant="destructive" className=" mb-2 text-xs">
            Disabled
          </Badge>
        );
      }
    } catch (error) {
      return (
        <Badge variant="destructive" className=" mb-2 text-xs">
          In-Active
        </Badge>
      );
    }
  };
  const setupData = async () => {
    let data = {
      name: fullName,
      userName: username,
      logisticName: "Lai-Warehouse",
      applicantType: userType,
      contactNumber: mobileNumber,
      branch: branch,
    };
    const service = async () => {
      try {
        await signUpUser(data);
        setDismissAdduser(true);
      } catch (error) {
        alert("error");
      }
    };
    //service();

    toast.promise(service, {
      loading: "Loading...",
      success: (data) => {
        console.log("data updated response", data);
        return `${fullName} Item has been added`;
      },
      error: "Error",
    });
  };
  return (
    <div className="">
      <SideNavigation />
      <HeaderPage title={`Good morning! 👋 `} subtitle="" />
      {/* <Button
        onClick={(invoice) => signUpUser()}
        variant="outline"
        className="bg-white border-white ml-40"
        size="icon"
      >
        <svg
          className="w-4 h-4  dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="4"
          height="4"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z"
          />
        </svg>
      </Button> */}
      <div className="p-6 ml-20">
        <h1 className="text-2xl font-bold mb-4">
          User Management {allUsers.length}
        </h1>
        {/* <Button className="flex items-center gap-2 rounded-full">
          <Plus className="h-4 w-4" />
          Add User
        </Button> */}

        <AddUser
          dimissed={dismissedCallBack}
          didSelectAccount={(e: string) => setUserType(e)}
          username={(e: string) => setUsername(e)}
          name={(e: string) => setFullName(e)}
          didSelect={(e: string) => setSelectedBranch(e)}
          mobileNumberUser={(e: string) => setMobile(e)}
          didSave={() => setupData()}
        />
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="w-[90%]  text-left text-sm">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="px-4 py-2">User name</th>
                <th className="px-4 py-2">Email</th>
                <th className="px-4 py-2">Last active</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {allUsers.map((user: UserInfo) => (
                <tr key={user.id} className="border-b">
                  <td className="px-4 py-2">{user.id.slice(-6)} </td>
                  <td className="px-4 py-2">{user.application_info?.name}</td>
                  <td className="px-4 py-2">
                    {user.user_details?.contactNumber}
                  </td>
                  <td className="px-4 py-2">{getBadgeType(user)}</td>
                  <td className="px-4 py-2">
                    <ViewUserSheet
                      didSwitch={(e: boolean) => updateUserStatus(user, e)}
                      data={user}
                      didSelect={(e: string) => console.log(e)}
                      buttonTitle={"View Settings"}
                      upload_here={() => console.log("s")}
                      image_file={(e: any) => console.log(e)}
                      title={(e: any) => console.log(e)}
                      quantity={(e: any) => console.log(e)}
                      didSubmit={(e: any) => console.log()}
                      contactNumber={(e: any) => console.log(e)}
                    />
                    {/* <Button
                      variant="outline"
                      className="text-xs font-light rounded-full"
                    >
                      Manage
                    </Button> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>{" "}
          {allUsers.length === 0 ? (
            <Skeleton
              count={5}
              wrapper={InlineWrapperWithMargin}
              inline
              width={"90%"}
            />
          ) : null}
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
      <Toaster />
    </div>
  );
}
