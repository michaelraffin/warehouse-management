
export const UserProfile = async(parameter)=>{
    let user_profilez = localStorage.getItem('user_profile')
    let convertProfile = JSON.parse(user_profilez)
    return  convertProfile
  }