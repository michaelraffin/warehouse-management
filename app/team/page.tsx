// pages/user-management.tsx
"use client";
import * as React from "react";
import Sample from "./sample";
import SideNavigation from "@/app/SideNavigation";
import HeaderPage from "@/app/LocalComponents/HeaderPage";
import AddUser from "@/app/LocalComponents/addUserPopup";
import UserValidation from "@/app/LocalComponents/UserValidation";
import ViewUserSheet from "@/app/LocalComponents/UserAccountSheet";
import AvatarUser from "@/app/LocalComponents/AvatarUser";
import { getAllUserProfile } from "@/Utils/serviceLogin";
import { create, validateUser } from "@/Utils/auth";
import { signUpUser, updateUser, deleteUser } from "@/Utils/supabaseService";
import { addAgentProfile } from "@/Utils/serviceCrud";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { Toaster, toast } from "sonner";
import { cookies } from "next/headers";
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
import { Exo_2 } from "next/font/google";
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
    agentID: String;
    applicantType?: String;
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
  applicantType?: String;
  userType?: String;
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
    getUsers();
  }, []);
  const getUsers = () => {
    const services = () => {
      const data = async () => {
        try {
          let users: UserInfo[] = (await getAllUserProfile()) || [];
          create("Xaxadsadsa");
          setUsers(users);
          validateUser().then((response) => {
            console.log(response);
          });
        } catch (error) {}
      };
      data();
    };
    services();
  };
  const dismissedCallBack = async () => {};
  const updateuserLevel = (fromUser: UserInfo, toUser: UserInfo) => {
    if (fromUser.application_info) {
      fromUser.application_info.applicantType = toUser.applicantType;
    }
    if (fromUser.userLevel) {
      fromUser.userType = toUser.userType;
    }
    console.log(fromUser);
    const service = async () => {
      const userUpdate = await updateUser(fromUser, true);
      setUsers([]);
      getUsers();
      return userUpdate;
    };
    service().then((status) => {
      toast.warning(
        status ? "Account has been updated" : "Account has been updated",
      );
    });
  };
  const updateUserStatus = (e: UserInfo, status: boolean) => {
    const service = async () => {
      // e.application_info.accountStatus = status;
      const userUpdate = await updateUser(e, status);
      setUsers([]);
      getUsers();
      return userUpdate;
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
            className=" mb-2 text-xs border font-normal rounded-sm border-green-600 text-green-800"
          >
            Active
          </Badge>
        );
      } else {
        return (
          <Badge
            variant="destructive"
            className=" mb-2 text-xs font-normal rounded-sm"
          >
            Disabled
          </Badge>
        );
      }
    } catch (error) {
      return (
        <Badge
          variant="destructive"
          className=" mb-2 text-xs font-normal rounded-sm"
        >
          In-Active
        </Badge>
      );
    }
  };

  const getTypeOfUser = () => {
    switch (userType) {
      case "admin":
        return 0;
      case "agent":
        return 1;
      case "stockman":
        return 2;
      default: {
        return 3;
      }
    }
  };
  function generateRandomString(length = 6) {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let result = "AIL-";
    for (let i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }
  const setupData = async () => {
    let data = {
      name: fullName,
      userName: username,
      logisticName: "Lai-Warehouse",
      applicantType: userType,
      contactNumber: mobileNumber,
      userLevel: getTypeOfUser(),
      branch: branch,
    };
    const service = async () => {
      try {
        let user = await signUpUser(data);
        let agentID = generateRandomString();
        let agentData = {
          fullName: fullName,
          agentID: agentID,
          email: username,
          onHandProducts: [],
          agentLogs: [],
        };

        await addAgentProfile(agentData);

        if (user != null) {
          let users: UserInfo[] = (await getAllUserProfile()) || [];
          let thisUser = users.filter((person) => person.id == user?.user?.id);
          thisUser[0].userLevel = {
            access: [],
            userType: getTypeOfUser(),
          };
          thisUser[0].application_info.agentID = agentID;
          let newUser = await updateUser(thisUser[0], null);
          setDismissAdduser(true);
          return newUser;
        } else {
          return null;
        }
      } catch (error) {
        return null;
      }
    };

    try {
      // Show loading toast
      const toastId = toast.loading("Loading...");
      // Execute the service and get the actual data
      const result = await service();
      // Update toast with success
      toast.success(`${fullName} Item has been added`, { id: toastId });

      // Now you have access to the result
      console.log("data updated response", result);

      // Return or use the result
      // dismissedCallBack();
      return result;
    } catch (error) {
      toast.error("Error");
      throw error;
    }
  };
  function capitalizeFirst(str: String) {
    if (!str) return ""; // handle empty string
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  const deleteThis = async (id: string) => {
    try {
      const toastId = toast.loading("Loading...");
      // Execute the service and get the actual data
      const result = await deleteUser(id);
      // Update toast with success
      toast.success(`user has been deleted`, { id: toastId });

      // Now you have access to the result
      console.log("data updated response", result);
      getUsers();
    } catch (error) {}
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
          User Management{" "}
          <span className="text-red-500">{allUsers.length}</span>
        </h1>
        {/* <Button className="flex items-center gap-2 rounded-full">
          <Plus className="h-4 w-4" />
          Add User
        </Button> */}

        <AddUser
          buttonTitle="Add user"
          dimissed={dismissedCallBack}
          didSelectAccount={(e: string) => setUserType(e)}
          username={(e: string) => setUsername(e)}
          name={(e: string) => setFullName(e)}
          didSelect={(e: string) => setSelectedBranch(e)}
          mobileNumberUser={(e: string) => setMobile(e)}
          didSave={setupData}
        />

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="w-[90%]  text-left text-sm">
            <thead>
              <tr className="bg-gray-50 border-b">
                <th className="px-4 py-2">User name</th>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Type</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {allUsers.map((user: UserInfo) => (
                <tr key={user.id} className="border-b">
                  <td className="px-4 py-2">#{user.id.slice(-6)} </td>
                  <td className="px-4 py-2">
                    {user.application_info?.email}
                    <AvatarUser name={user.application_info?.name} />
                  </td>
                  <td className="px-4 py-2">
                    {capitalizeFirst(user.application_info?.applicantType)}
                  </td>
                  <td className="px-4 py-2">{getBadgeType(user)}</td>
                  <td className="px-4 py-2">
                    <ViewUserSheet
                      userRole={(e: UserInfo) => updateuserLevel(user, e)}
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
                    <Button
                      onClick={() => deleteThis(user.id)}
                      variant="outline"
                      className="text-xs font-light rounded-full"
                    >
                      Delete
                    </Button>
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
      {/*<UserValidation />*/}
      {/*<Sample />*/}
    </div>
  );
}
