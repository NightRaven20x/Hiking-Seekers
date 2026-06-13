interface Booking {
    status: string;
}

interface StatsCardsProps {
    bookings: Booking[];
    loading: boolean;
}

export default function StatsCards({ bookings, loading }: StatsCardsProps) {
    const stats = [
        {
            label: "Total Bookings",
            value: bookings.length,
            color: "text-gray-900",
        },
        {
            label: "Pending",
            value: bookings.filter(b => b.status === "pending").length,
            color: "text-yellow-600",
        },
        {
            label: "Approved",
            value: bookings.filter(b => b.status === "approved").length,
            color: "text-green-600",
        },
        {
            label: "Rejected",
            value: bookings.filter(b => b.status === "rejected").length,
            color: "text-red-600",
        },
    ];

    return (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {stats.map((stat, i) => (
                <div key={i} className="bg-white rounded-2xl p-5 shadow-sm">
                    <p className="text-gray-500 text-sm mb-1">{stat.label}</p>
                    {loading ? (
                        <div className="h-9 w-16 bg-gray-200 rounded-full animate-pulse mt-2" />
                    ) : (
                        <p className={`text-3xl font-bold font-serif ${stat.color}`}>
                            {stat.value}
                        </p>
                    )}
                </div>
            ))}
        </div>
    );
}