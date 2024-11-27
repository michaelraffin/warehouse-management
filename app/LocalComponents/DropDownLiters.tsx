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
export function DropdownLiters(props: any) {
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
      alert("opss");
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
        <SelectValue placeholder="Select a Branch" />
      </SelectTrigger>
      <SelectContent>
        {/* {branches.map((group: Branch, index) => (
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
        ))} */}
        <SelectGroup>
          <SelectLabel>Tubod</SelectLabel>
          <SelectItem value="gmt">Greenwich Mean Time (GMT)</SelectItem>
          <SelectItem value="cet">Central European Time (CET)</SelectItem>
          <SelectItem value="eet">Eastern European Time (EET)</SelectItem>
          <SelectItem value="west">
            Western European Summer Time (WEST)
          </SelectItem>
          <SelectItem value="cat">Central Africa Time (CAT)</SelectItem>
          <SelectItem value="eat">East Africa Time (EAT)</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Asia</SelectLabel>
          <SelectItem value="msk">Moscow Time (MSK)</SelectItem>
          <SelectItem value="ist">India Standard Time (IST)</SelectItem>
          <SelectItem value="cst_china">China Standard Time (CST)</SelectItem>
          <SelectItem value="jst">Japan Standard Time (JST)</SelectItem>
          <SelectItem value="kst">Korea Standard Time (KST)</SelectItem>
          <SelectItem value="ist_indonesia">
            Indonesia Central Standard Time (WITA)
          </SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>Australia & Pacific</SelectLabel>
          <SelectItem value="awst">
            Australian Western Standard Time (AWST)
          </SelectItem>
          <SelectItem value="acst">
            Australian Central Standard Time (ACST)
          </SelectItem>
          <SelectItem value="aest">
            Australian Eastern Standard Time (AEST)
          </SelectItem>
          <SelectItem value="nzst">New Zealand Standard Time (NZST)</SelectItem>
          <SelectItem value="fjt">Fiji Time (FJT)</SelectItem>
        </SelectGroup>
        <SelectGroup>
          <SelectLabel>South America</SelectLabel>
          <SelectItem value="art">Argentina Time (ART)</SelectItem>
          <SelectItem value="bot">Bolivia Time (BOT)</SelectItem>
          <SelectItem value="brt">Brasilia Time (BRT)</SelectItem>
          <SelectItem value="clt">Chile Standard Time (CLT)</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
