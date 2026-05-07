"use client"

import { ThemeProvider } from "@/context/ThemeContext";
import { Provider } from 'react-redux';
import { store } from "./redux/store";


export default function({children}: {children: React.ReactNode}) {
    return (
        <>
            <Provider store={store}>
                <ThemeProvider>
                    {children}
                </ThemeProvider>
            </Provider>
        </>
    )
}