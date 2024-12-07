"use server";
import { cookies } from "next/headers";

export async function create(data) {
  try {
    localStorage.setItem("x-auth-ID", JSON.stringify(data));
    return true;
  } catch (error) {}
}
export async function validateUser() {
  try {
    const apiData = localStorage.getItem("x-auth-ID");
    return apiData ? JSON.parse(apiData) : null;
  } catch (error) {
    console.log("invalid-user", error);
    return "invalid-user";
  }
}
