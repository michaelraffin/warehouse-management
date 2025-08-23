"use client";

import React, { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface SubBranch {
  branchID: number;
  branchDisplayName: string;
  status: boolean;
}

export interface Branch {
  branchID: number;
  city: string;
  subBranches: SubBranch[];
}
export interface LeeaseBranches {
  _id: string;
  branches: Branch[];
}
import { axiosV2Local, url, axiosV2, axios } from "../../Utils/axios";
export function DropdownBranches(props: any) {
  const [branches, setBranches] = useState<Branch[]>([]);

  React.useEffect(() => {
    fetchBranches();
  }, []);

  const fetchBranches = async () => {
    try {
      let data = {
        local_id: "e",
        queryType: "all",
        storeOwner: "storeOwner",
        isAPI: true,
        referenceOrder: "e",
        number: 20,
        showLimit: true,
        // queryData: { status: "orderStatus", userReference: "e" },
      };
      let productList = await axiosV2("dsadsa").post(
        `${url}/store/LesseConfig`,
      );
      setBranches(productList.data.results[0].branches);
      // setProductsReference(productList.data.results);
      // setStatus(false);
    } catch (error) {
      console.log("error Product", error);
    }
  };
  const didSelect = (e: string) => {
    console.log(e);
    props.didSelect(e);
  };

  return (
    <Select onValueChange={(e) => didSelect(e)}>
      <SelectTrigger className="w-full mt-2">
        <SelectValue placeholder="Select " className="w-full " />
      </SelectTrigger>
      <SelectContent>
        {branches.map((group: Branch, index) => (
          <SelectGroup key={index}>
            <SelectLabel key={group.branchID}>{group.city}</SelectLabel>
            {group.subBranches.map((option: SubBranch, index) => (
              <SelectItem
                onChange={() => alert("s")}
                key={option.branchID}
                value={`${group.city}-${option.branchDisplayName}`}
              >
                {option.branchDisplayName}
              </SelectItem>
            ))}
          </SelectGroup>
        ))}
      </SelectContent>
    </Select>
  );
}
