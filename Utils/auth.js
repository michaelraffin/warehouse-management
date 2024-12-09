"use server";
import { cookies } from "next/headers";

export async function create(data) {
  try {
    localStorage.setItem("x-auth-ID", JSON.stringify(data));
    return true;
  } catch (error) {
    return false;
  }
}
export async function validateUser() {
  try {
    return true;
  } catch (error) {
    console.log(error);
    return "invalid-user";
  }
}
