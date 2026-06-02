"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";

export default function AdminLogin() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError("");

        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError("Invalid email or password");
            setIsLoading(false);
            return;
        }

        // Small delay to ensure session is stored
        await new Promise(resolve => setTimeout(resolve, 500));
        window.location.href = "/admin/dashboard";
    };

    return (
        <main className="min-h-screen bg-[#F3F4F6] flex items-center justify-center px-4">
            <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">

                {/* Logo / Title */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-serif font-bold text-[#1B4332] mb-1">
                        Hiking Seekers
                    </h1>
                    <p className="text-gray-500 text-sm">Admin Dashboard</p>
                </div>

                {/* Form */}
                <form onSubmit={handleLogin} className="space-y-5">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={e => setEmail(e.target.value)}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B4332] focus:border-transparent outline-none transition-all"
                            placeholder="admin@hikingseekers.com"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            required
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#1B4332] focus:border-transparent outline-none transition-all"
                            placeholder="••••••••"
                        />
                    </div>

                    {error && (
                        <p className="text-red-500 text-sm text-center">{error}</p>
                    )}

                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full py-3 rounded-full font-bold text-white transition-all ${isLoading
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-[#1B4332] hover:bg-[#153526] hover:scale-105"
                            }`}
                    >
                        {isLoading ? "Signing in..." : "Sign In"}
                    </button>
                </form>
            </div>
        </main>
    );
}