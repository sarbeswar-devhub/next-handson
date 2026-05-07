import Cookies from "js-cookie";

type ApiOptions = {
    method?: string,
    body?: any, 
    headers?: HeadersInit
}

const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function apiFetch(endpoint: string, options: ApiOptions = {}) {

    const token = Cookies.get("access_token");

    const url = `${apiUrl}/${endpoint}`;

    const response = await fetch(url, {
        method: options.method || "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": token ? `Bearer ${token}` : "",
            ...options.headers
        },
        body: options.body ? JSON.stringify(options.body) : undefined
    });


    /*
        Auto logout if token invalid
    */
    if (response.status === 401) {

        Cookies.remove("access_token")

        window.location.href = "/login"
    }

    return response;


}