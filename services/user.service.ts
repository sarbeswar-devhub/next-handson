import { apiFetch } from "@/lib/api";

export async function getUsers() {
    const response = await apiFetch("user/list");
    
    return response.json();
}