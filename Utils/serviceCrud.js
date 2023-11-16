import { createClient } from '@supabase/supabase-js'
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL,process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)

const networkService = async (callback,identifier)=>{
        try {
            return   await callback()
        } catch (error) {
            console.log (' ERROR ','----', identifier,'----' , error)
        }
}

const getURL = () => {
    let url =
      process?.env?.NEXT_PUBLIC_SITE_URL ?? // Set this to your site URL in production env.
      process?.env?.NEXT_PUBLIC_VERCEL_URL ?? // Automatically set by Vercel.
      'http://localhost:3000/authLogin'
    // Make sure to include `https://` when not localhost.
    url = url.includes('http') ? url : `https://${url}`
    // Make sure to include a trailing `/`.
    url = url.charAt(url.length - 1) === '/' ? url : `${url}/`
    return url
  }

export const getSession = async ()=>{
  const {data,error}  = await networkService(()=> {
      return supabase.auth.refreshSession()
  })
  }
  export const updatProfile = async(parameter)=>{
    const {data,error}  = await networkService(()=> {
        return supabase
        .from('profile')
        .update(parameter)
        .eq('id', parameter.id)
        .select()
    })
  }
export const signinAuth= async()=>{
   const {data,error}  = await networkService(()=> {
        return supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo:getURL(),
              }
          },)}
          ,'signInWithOAuth')

}
