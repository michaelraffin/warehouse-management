
export const UserProfile = async(parameter)=>{
  try {
    let user_profilez = await localStorage.getItem('user_profile')
    console.log('user_profilez user_profilez',user_profilez)
     
    return  user_profilez
  } catch (error) {
    console.log('UserProfile error' , error)
    return null
  }
  }