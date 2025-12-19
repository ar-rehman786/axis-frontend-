'use client'
import Admin from '@/components/admin/Admin'
import { useRouter } from "next/navigation";
import { useEffect } from 'react';

export default function page() {
    const router = useRouter();

    // useEffect(() => {
    //     const auth = localStorage.getItem("auth");

    //     if (auth !== "super-admin") {
    //         router.replace("/login");
    //     }
    // }, []);
    return (
        <>
            <Admin />
        </>
    )
}
