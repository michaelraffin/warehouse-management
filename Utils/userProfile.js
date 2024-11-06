export const UserProfile = async (parameter) => {
  try {
    let user_profilez = localStorage.getItem("user_profile");
    if (user_profilez != null) {
      let convertProfile = JSON.parse(user_profilez);
      return convertProfile;
    }
    return null;
  } catch (error) {
    return null;
  }
};
