"use client"

import { useTheme } from "@/context/ThemeContext";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, incrementByAmount } from "@/app/redux/features/counterSlice";
import type { RootState } from "@/app/redux/store";

export default function DashboardPage() {

    const {theme, toggleTheme} = useTheme();

    const count = useSelector((state: RootState) => state.counter.value);
    const dispatch = useDispatch();

    return (
        <>
            <div className="space-y-4">
                <h1 className="text-2xl font-semibold">Dashboard page</h1>
                <div className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm dark:border-zinc-700 dark:bg-zinc-800">
                    <h1 className="mb-3 font-medium">{ theme } Mode</h1>

                    <button onClick={toggleTheme} className="rounded-lg bg-blue-500 px-3 py-2 text-white hover:bg-blue-600">
                        Toggle Theme
                    </button>
                </div>
                <div className="">
                    <div className="m-3">
                        <h1>{count}</h1>
                    </div>
                    <button onClick={() => dispatch(increment())} className="rounded-lg bg-blue-500 px-3 py-2 text-white hover:bg-blue-600">
                        Increment
                    </button>
                    <button onClick={() => dispatch(decrement())} className="rounded-lg bg-blue-500 px-3 py-2 text-white hover:bg-blue-600">
                        Decrement
                    </button>
                    <button onClick={() => dispatch(incrementByAmount(33))} className="rounded-lg bg-blue-500 px-3 py-2 text-white hover:bg-blue-600">
                        Increment by Amount 33
                    </button>
                </div>
            </div>
        </>
    )
}