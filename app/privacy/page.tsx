import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Image from "next/image";

export default function PrivacyPage() {
    const sections = [
        {
            title: "1. Information We Collect",
            content: [
                "When you make a booking, we collect the full name and phone number of the primary contact, and the full name of each participant.",
                "We collect a photo of a valid national ID for every participant, used solely for identity verification purposes.",
                "We do not collect payment information online, as all payments are made in cash on the day of the trip.",
            ],
        },
        {
            title: "2. How We Use Your Information",
            content: [
                "Your name and phone number are used to confirm your booking and communicate trip details via WhatsApp.",
                "ID photos are used to verify the identity of participants for safety and insurance purposes, and may be requested by local authorities if required during an emergency.",
                "We do not use your information for marketing purposes without your explicit consent.",
            ],
        },
        {
            title: "3. How Your Information Is Stored",
            content: [
                "All data, including ID photos, is stored securely using Supabase, a cloud database provider with industry-standard security practices.",
                "ID photos are stored in a private storage bucket that is not publicly accessible. Only authorized administrators of Hiking Seekers can view this data through secure, time-limited access links.",
                "Booking and participant information is stored in an encrypted database accessible only to authorized administrators.",
            ],
        },
        {
            title: "4. How Long We Keep Your Data",
            content: [
                "Booking and participant information, including ID photos, is retained for a reasonable period after your trip to handle any post-trip inquiries, disputes, or insurance matters.",
                "If you would like your data deleted sooner, you may contact us and we will remove it, provided there are no outstanding bookings or legal requirements to retain it.",
            ],
        },
        {
            title: "5. Who Has Access to Your Information",
            content: [
                "Only authorized Hiking Seekers administrators have access to your booking details and ID photos.",
                "We do not sell, rent, or share your personal information with third parties for marketing purposes.",
                "Your information may be shared with relevant authorities only if required by law or in the event of a safety emergency during a trip.",
            ],
        },
        {
            title: "6. Your Rights",
            content: [
                "You have the right to request access to the personal information we hold about you.",
                "You have the right to request correction of any inaccurate information.",
                "You have the right to request deletion of your data, subject to any legal or operational requirements (such as active bookings).",
                "To exercise any of these rights, please contact us using the details below.",
            ],
        },
        {
            title: "7. Cookies & Website Usage",
            content: [
                "Our website does not use tracking cookies or third-party advertising trackers.",
                "Basic technical data may be processed to ensure the website functions correctly, but this is not used to identify individual visitors.",
            ],
        },
        {
            title: "8. Changes to This Policy",
            content: [
                "We may update this Privacy Policy from time to time to reflect changes in our practices or for legal reasons.",
                "The most current version will always be available on our website.",
                "Continued use of our services after any changes constitutes acceptance of the updated policy.",
            ],
        },
    ];

    return (
        <main className="min-h-screen bg-[#F3F4F6]">
            <Navbar />

            {/* Hero Section */}
            <section className="relative h-[40vh] min-h-[350px] w-full overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/images/Background1.jpg"
                        alt="Privacy Policy"
                        fill
                        className="object-cover rounded-b-3xl"
                        priority
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-0" />
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4">
                    <h1 className="font-playfair font-medium italic text-white text-5xl md:text-6xl mb-4 drop-shadow-lg">
                        Privacy Policy
                    </h1>
                    <p className="font-montserrat text-white text-lg max-w-2xl drop-shadow-md">
                        How we collect, use, and protect your personal information
                    </p>
                </div>
            </section>

            {/* Last Updated */}
            <section className="max-w-4xl mx-auto px-6 pt-12">
                <p className="text-gray-400 text-sm text-center">
                    Last updated: June 2026
                </p>
            </section>

            {/* Intro */}
            <section className="max-w-4xl mx-auto px-6 py-8">
                <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
                    <p className="text-gray-700 leading-relaxed">
                        At Hiking Seekers, we respect your privacy and are committed to protecting
                        your personal information. This Privacy Policy explains what information
                        we collect when you book a trip with us, why we collect it, how it's
                        stored, and what rights you have over your data.
                    </p>
                </div>
            </section>

            {/* Sections */}
            <section className="max-w-4xl mx-auto px-6 pb-20 space-y-6">
                {sections.map((section, index) => (
                    <div
                        key={index}
                        className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100"
                    >
                        <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">
                            {section.title}
                        </h2>
                        <ul className="space-y-3">
                            {section.content.map((point, i) => (
                                <li key={i} className="flex items-start gap-3 text-gray-700 leading-relaxed">
                                    <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-[#4A7C59] mt-2" />
                                    {point}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}

                {/* Contact */}
                <div className="bg-[#1B4332] rounded-2xl p-8 text-white text-center">
                    <h2 className="font-serif text-2xl font-bold mb-3">
                        Questions About Your Data?
                    </h2>
                    <p className="text-white/80 mb-6">
                        If you'd like to access, correct, or delete your personal information,
                        reach out to us anytime.
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <a
                            href="https://wa.me/2131231231222"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-3 bg-white text-[#1B4332] font-bold rounded-full hover:bg-gray-100 transition-all hover:scale-105"
                        >
                            WhatsApp Us
                        </a>
                        <a
                            href="mailto:Hikingseekers@gmail.com"
                            className="px-6 py-3 bg-white/10 text-white font-bold rounded-full hover:bg-white/20 transition-all hover:scale-105"
                        >
                            Email Us
                        </a>
                    </div>
                </div>
            </section>

            <Footer />
        </main>
    );
}