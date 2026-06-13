"use client";

interface DashboardHeaderProps {
    onRefresh: () => void;
    onSignOut: () => void;
}

export default function DashboardHeader({ onRefresh, onSignOut }: DashboardHeaderProps) {
    return (
        <div className="bg-[#1B4332] text-white px-6 py-4">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-serif font-bold">Hiking Seekers</h1>
                    <p className="text-white/70 text-sm">Admin Dashboard</p>
                </div>
                <div className="flex items-center gap-4">
                    <button
                        onClick={onRefresh}
                        className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-sm font-medium transition-colors"
                    >
                        Refresh
                    </button>
                    <button
                        onClick={onSignOut}
                        className="px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-sm font-medium transition-colors"
                    >
                        Sign Out
                    </button>
                </div>
            </div>
        </div>
    );
}