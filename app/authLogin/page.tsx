"use client" 
import React, { useEffect } from 'react';
import { useUrl } from 'nextjs-current-url';
import { useRouter ,useSearchParams} from 'next/navigation'
export default function Auth() {
    const { href: currentUrl, pathname } = useUrl() ?? {};
    const router = useRouter();
    useEffect(() => {
        const accessToken =  `${currentUrl}`
        const access_token = new URLSearchParams(accessToken.split('#')[1]).get('access_token');
        const provider_token = new URLSearchParams(accessToken.split('#')[1]).get('provider_token');
        const refresh_token = new URLSearchParams(accessToken.split('#')[1]).get('refresh_token');
        localStorage.clear()
        localStorage.setItem('access_token', `${access_token}`);
        localStorage.setItem('provider_token', `${provider_token}`);
        localStorage.setItem('refresh_token', `${refresh_token}`);
        router.push('/dashboard');
    })

    return (<>Loading..</>)
}
