import React from 'react'
import { useState } from "react";
import { UserCircleIcon } from "@heroicons/react/24/solid";

function NavBar({ setSearchTerm }) {
    const [input, setInput] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.trim() !== "") { 
            setSearchTerm(input.trim());
            setInput("");
        }
    };
    const inputChange = (e) => {
        setInput(e.target.value)
    }

    return (
        <>
        <div className="flex justify-between items-center p-2 bg-slate-700 text-white">
            <div className="text-white p-4">
                <h1 className="text-2xl font-bold">🎬 Movie Finder</h1>
            </div>
            <form onSubmit={handleSubmit} className="flex gap-2">
                <input type="text" placeholder="Search for a movie..." value={input}
                    onChange={inputChange} className="p-2 rounded text-white" />
                <button className="bg-blue-500 text-white p-2 rounded cursor-pointer">Search</button>
            </form>
            <button type='button' aria-label="uers-menu"className="rounded-full cursor-pointer p-1">
                <UserCircleIcon className="h-10 w-10 text-wihte-700" />
            </button>
        </div>
        </>
    )
}

export default NavBar
