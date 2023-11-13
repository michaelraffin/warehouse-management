"use client" 
import React, { useEffect } from 'react';

import { useRouter ,useSearchParams} from 'next/navigation'
export default function Auth() {
    const data = useRouter();
    function Component() {
        // { basePath: 'https://www.example.com/docs' }
     }
    useEffect(() => {
        console.log(data)
        // const urlSearchParams = new URLSearchParams(callbackUrl.split('?')[1]);
        // const stateParam = urlSearchParams.get('state');
        // const codeParam = urlSearchParams.get('code');
        
    })

    return (<>Loading..</>)
}
