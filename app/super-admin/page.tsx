'use client'
import Super_Admin from "@/components/super-admin/Super_Admin";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

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
            <Super_Admin />
        </>
    )
}
