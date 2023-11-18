"use client" 
import React, { useEffect } from 'react';
import { Loader2 } from "lucide-react"
import { useUrl } from 'nextjs-current-url';
import { useRouter ,useSearchParams} from 'next/navigation'
import {getSession,getProfile} from '../../Utils/serviceLogin'
export default function Auth() {
    const { href: currentUrl, pathname } = useUrl() ?? {};
    const router = useRouter();
    useEffect(() => {

    
    //     getSession().then((e)=>{
    //       console.log(e.data.user.id)
    //       localStorage.setItem('uuid', `${e.data.user.id}`);
    //   })
      
      getProfile().then((e) =>{
        console.log(e.data)
      })
        //Redirect when Profile is empty
        setTimeout(() => {
            // router.push('/onboard');
          }, 3000);
     
    })

    return (<>
    <div className='text-lg col-auto ml-4 '>
    <div className="h-56 grid grid-cols-3 gap-4 content-center place-items-center ">
  <div></div>
  <div className='justify-center place-items-center'> Authenticating.... <Loader2 className="mr-2 h-4 w-4 animate-spin" /></div>
  <div></div>
</div>
​

  
    </div>
    </>)
}
