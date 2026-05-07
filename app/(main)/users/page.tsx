"use client";

import { useEffect, useState } from "react";
import { getUsers } from "@/services/user.service";
import GridList from "../components/GridList";
import { User } from "@/types/user.type";



export default function Users() {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        async function fetchUsers() {
            const result = await getUsers();
            setUsers(result.result);
        }
        fetchUsers();
    }, []);
    


    return (
        <>
            <div className="">
                <h1>Users</h1>
                <GridList data={users} />
            </div>
        </>
    )
}