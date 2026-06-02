import { NextRequest, NextResponse } from 'next/server';
import { supabaseServer } from '../../lib/supabase-server';

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();
        const { tripId, tripTitle, seats, persons } = body;

        // Generate booking ref
        const bookingRef = "HS-" + String(Date.now()).slice(-6);

        // Insert booking
        const { data: booking, error: bookingError } = await supabaseServer
            .from("bookings")
            .insert({
                booking_ref: bookingRef,
                trip_id: tripId,
                trip_title: tripTitle,
                seats,
                payment_method: "cash",
                status: "pending"
            })
            .select()
            .single();

        if (bookingError) {
            return NextResponse.json({ success: false, error: bookingError.message }, { status: 500 });
        }

        // Insert each person
        for (let i = 0; i < persons.length; i++) {
            const person = persons[i];

            const { error: personError } = await supabaseServer
                .from("persons")
                .insert({
                    booking_id: booking.id,
                    name: person.name,
                    phone: i === 0 ? person.phone : null,
                    id_photo_url: person.photoPath || null,
                    is_contact: i === 0
                });

            if (personError) {
                return NextResponse.json({ success: false, error: personError.message }, { status: 500 });
            }
        }

        return NextResponse.json({ success: true, bookingRef });

    } catch (error) {
        return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
    }
}