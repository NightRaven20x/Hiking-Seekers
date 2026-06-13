import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Image from "next/image";

export default function TermsPage() {
    const sections = [
        {
            title: "1. Bookings & Reservations",
            content: [
                "All bookings are subject to availability. A booking is only confirmed once you receive a confirmation message from our team via WhatsApp.",
                "To complete a booking, you must provide a valid national ID photo for each participant. Bookings submitted without valid ID photos will not be confirmed.",
                "We reserve the right to refuse a booking at our discretion without providing a reason.",
            ],
        },
        {
            title: "2. Payment",
            content: [
                "Payment is made in cash on the day of the trip at the meeting point. We do not accept online payments at this time.",
                "The full amount per person must be paid before boarding the transport.",
                "Prices are listed in Algerian Dinars (DZD) and are per person unless stated otherwise.",
            ],
        },
        {
            title: "3. Cancellations & Refunds",
            content: [
                "If you need to cancel your booking, you must notify us at least 48 hours before the trip departure time via WhatsApp.",
                "Cancellations made less than 48 hours before departure are non-refundable.",
                "In the event that Hiking Seekers cancels a trip due to weather conditions, safety concerns, or insufficient participants, you will be offered a full refund or the option to reschedule.",
                "No refunds will be issued for participants who arrive late and miss the departure.",
            ],
        },
        {
            title: "4. Health & Fitness Requirements",
            content: [
                "Participants must be in good physical health and have a fitness level appropriate for the chosen trip difficulty.",
                "It is your responsibility to assess whether the trip difficulty is suitable for your fitness level.",
                "We strongly recommend consulting a doctor before participating if you have any medical conditions, heart conditions, or respiratory issues.",
                "Pregnant women and individuals with serious medical conditions should not participate without medical clearance.",
                "Participants under the age of 16 must be accompanied by a parent or legal guardian.",
            ],
        },
        {
            title: "5. Safety & Conduct",
            content: [
                "All participants must follow the instructions of the guide at all times. Failure to comply may result in removal from the trip without a refund.",
                "Hiking Seekers reserves the right to turn back or exclude any participant who poses a risk to themselves or the group.",
                "Participants are responsible for bringing appropriate clothing, footwear, food, water, and any personal medication.",
                "Alcohol and illegal substances are strictly prohibited on all trips.",
            ],
        },
        {
            title: "6. Weather & Trip Modifications",
            content: [
                "Hiking Seekers reserves the right to modify or cancel any trip due to adverse weather conditions, safety concerns, or circumstances beyond our control.",
                "In cases of bad weather, the decision to proceed, modify, or cancel the trip rests solely with the lead guide on the day.",
                "We are not liable for any losses incurred due to weather-related cancellations or modifications.",
            ],
        },
        {
            title: "7. Liability",
            content: [
                "Participation in outdoor activities carries inherent risks including but not limited to physical injury, illness, or death.",
                "By booking with Hiking Seekers, you acknowledge and accept these risks.",
                "Hiking Seekers, its guides, and its staff are not liable for any injury, loss, damage, or death arising from participation in any trip.",
                "Participants are strongly encouraged to obtain personal travel and accident insurance before participating.",
            ],
        },
        {
            title: "8. Photography",
            content: [
                "Hiking Seekers may photograph or film participants during trips for use on our website and social media channels.",
                "By booking with us, you consent to being photographed or filmed during the trip.",
                "If you do not wish to be photographed, please inform your guide at the start of the trip.",
            ],
        },
        {
            title: "9. Changes to These Terms",
            content: [
                "Hiking Seekers reserves the right to update these Terms and Conditions at any time.",
                "The most current version will always be available on our website.",
                "Continued use of our services after any changes constitutes acceptance of the updated terms.",
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
                        alt="Terms and Conditions"
                        fill
                        className="object-cover rounded-b-3xl"
                        priority
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent z-0" />
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-4">
                    <h1 className="font-playfair font-medium italic text-white text-5xl md:text-6xl mb-4 drop-shadow-lg">
                        Terms & Conditions
                    </h1>
                    <p className="font-montserrat text-white text-lg max-w-2xl drop-shadow-md">
                        Please read these terms carefully before booking a trip with us
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
                        Welcome to Hiking Seekers. By booking any trip or using our services,
                        you agree to be bound by the following Terms and Conditions. These terms
                        exist to ensure the safety, enjoyment, and fair treatment of all
                        participants. If you have any questions, please contact us before booking.
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
                                    <span className="shrink-0 w-1.5 h-1.5 rounded-full bg-[#FF7B29] mt-2" />
                                    {point}
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}

                {/* Contact */}
                <div className="bg-[#1B4332] rounded-2xl p-8 text-white text-center">
                    <h2 className="font-serif text-2xl font-bold mb-3">
                        Questions About These Terms?
                    </h2>
                    <p className="text-white/80 mb-6">
                        Reach out to us on WhatsApp or by email and we'll be happy to clarify anything.
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