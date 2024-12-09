import { createClient } from "@supabase/supabase-js";
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
);
function generateRandomString(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}
export const signUpUser = async (config, identifier) => {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: config.userName,
      password: generateRandomString(7),
      options: {
        data: {
          name: config.name,
          logisticName: config.logisticName,
          applicantType: config.applicantType,
          contactNumber: config.contactNumber,
          branch: config.branch,
        },
      },
    });
    return data;
  } catch (error) {}
};
export const updateUser = async (user, status) => {
  try {
    const { data, error } = await supabase
      .from("profile")
      .update(user)
      .eq("id", user.id)
      .select();
    return data;
  } catch (error) {
    return null;
  }
};
export const siginWithUsername = async (payload) => {
  // : {
  //   username: any;
  //   password: any;
  // }
  console.log(payload);
  const { data, error } = await supabase.auth.signInWithPassword(payload);
  if (error) {
    console.log("error siginWithUsername", error);
    // check if its accountStatus if agree
    throw error;
  } else return data;
};
