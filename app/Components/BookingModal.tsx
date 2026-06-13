"use client";

import { useState, useEffect, useRef } from "react";
import { supabase } from "../lib/supabase";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  tripTitle: string;
  tripPrice: number;
  tripId: number;
  scheduledTripId: string;
}

interface Person {
  name: string;
  phone: string;
  idPhoto: File | null;
  idPhotoPreview: string | null;
}

export default function BookingModal({ isOpen, onClose, tripTitle, tripPrice, tripId, scheduledTripId }: BookingModalProps) {
  const [seats, setSeats] = useState(1);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [persons, setPersons] = useState<Person[]>([{ name: "", phone: "", idPhoto: null, idPhotoPreview: null }]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const validSeats = Math.max(1, Math.min(10, seats));
    setPersons(prev => {
      const updated = [...prev];
      while (updated.length < validSeats) {
        updated.push({ name: "", phone: "", idPhoto: null, idPhotoPreview: null });
      }
      return updated.slice(0, validSeats);
    });
  }, [seats]);

  const handlePersonChange = (index: number, field: "name" | "phone", value: string) => {
    setPersons(prev => {
      const updated = [...prev];
      updated[index] = { ...updated[index], [field]: value };
      return updated;
    });
    setErrors(prev => ({ ...prev, [`person${index}_${field}`]: "" }));
    setSubmitError("");
  };

  const handleFileChange = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setErrors(prev => ({ ...prev, [`person${index}_idPhoto`]: "File size must be less than 5MB" }));
      return;
    }
    if (!file.type.startsWith("image/")) {
      setErrors(prev => ({ ...prev, [`person${index}_idPhoto`]: "Please upload an image file" }));
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setPersons(prev => {
        const updated = [...prev];
        updated[index] = {
          ...updated[index],
          idPhoto: file,
          idPhotoPreview: reader.result as string
        };
        return updated;
      });
    };
    reader.readAsDataURL(file);
    setErrors(prev => ({ ...prev, [`person${index}_idPhoto`]: "" }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    persons.forEach((person, index) => {
      if (!person.name.trim()) newErrors[`person${index}_name`] = "Name is required";
      if (index === 0) {
        if (!person.phone.trim()) {
          newErrors[`person${index}_phone`] = "Phone is required";
        } else if (!/^\+?[\d]{8,15}$/.test(person.phone.replace(/\s/g, "").replace(/-/g, ""))) {
          newErrors[`person${index}_phone`] = "Enter a valid phone number";
        }
      }
      if (!person.idPhoto) newErrors[`person${index}_idPhoto`] = "ID photo is required";
    });

    if (!agreeTerms) newErrors.agreeTerms = "You must agree to the terms";

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      const firstErrorKey = Object.keys(newErrors)[0];
      const firstErrorEl = formRef.current?.querySelector(`[data-error="${firstErrorKey}"]`);
      firstErrorEl?.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    setUploadProgress(0);

    try {
      // Upload photos to Supabase Storage first
      const personsPayload = [];
      for (let i = 0; i < persons.length; i++) {
        const person = persons[i];
        let photoPath = "";

        if (person.idPhoto) {
          const extension = person.idPhoto.name.split(".").pop() || "jpg";
          const fileName = `temp_${Date.now()}_person${i + 1}.${extension}`;

          const { error: uploadError } = await supabase.storage
            .from("id-photos")
            .upload(fileName, person.idPhoto);

          if (!uploadError) photoPath = fileName;
        }

        personsPayload.push({
          name: person.name,
          phone: person.phone,
          photoPath,
        });

        setUploadProgress(Math.round(((i + 1) / persons.length) * 100));
      }

      // Send to API route
      const response = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tripId,
          tripTitle,
          seats,
          persons: personsPayload,
          scheduledTripId,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitSuccess(true);
        setTimeout(() => {
          setSubmitSuccess(false);
          onClose();
          setSeats(1);
          setAgreeTerms(false);
          setPersons([{ name: "", phone: "", idPhoto: null, idPhotoPreview: null }]);
          setUploadProgress(0);
        }, 3000);
      }

    } catch (error) {
      console.error("Submission error:", error);
      setSubmitError("Something went wrong. Please try again or contact us on WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-slideUp custom-scrollbar">

        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-[#FF7B29] to-[#e67022] text-white p-6 rounded-t-2xl z-10">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-3xl font-serif font-bold mb-2">Book Your Adventure</h2>
              <p className="text-white/90">{tripTitle} — {tripPrice.toLocaleString()} DZD per person</p>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close booking modal"
              className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Success */}
        {submitSuccess && (
          <div className="m-6 p-6 bg-green-50 border-2 border-green-500 rounded-xl text-center">
            <div className="text-6xl mb-4">✓</div>
            <h3 className="text-2xl font-bold text-green-800 mb-2">Booking Submitted!</h3>
            <p className="text-green-700">We'll contact you on WhatsApp shortly to confirm your booking.</p>
          </div>
        )}

        {/* Error */}
        {submitError && (
          <div className="mx-6 mt-6 p-4 bg-red-50 border border-red-200 text-red-800 rounded-lg text-sm flex items-center gap-3">
            <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="font-semibold">Booking failed</p>
              <p>{submitError}</p>
              <a href="https://wa.me/213555784450" target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline font-semibold mt-1 inline-block">
                Contact us on WhatsApp →
              </a>
            </div>
          </div>
        )}

        {/* Form */}
        {!submitSuccess && (
          <form ref={formRef} onSubmit={handleSubmit} className="p-6 space-y-6">

            {/* Booking Details */}
            <div className="space-y-4">
              <h3 className="text-xl font-serif font-bold text-gray-900 border-b pb-2">
                Booking Details
              </h3>

              {/* Seats Stepper */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Number of Seats *
                </label>
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => setSeats(s => Math.max(1, s - 1))}
                    className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-600 hover:border-[#FF7B29] hover:text-[#FF7B29] transition-colors text-xl font-bold"
                  >
                    −
                  </button>
                  <span className="text-2xl font-bold text-gray-900 w-8 text-center">
                    {seats}
                  </span>
                  <button
                    type="button"
                    onClick={() => setSeats(s => Math.min(10, s + 1))}
                    className="w-10 h-10 rounded-full border-2 border-gray-300 flex items-center justify-center text-gray-600 hover:border-[#FF7B29] hover:text-[#FF7B29] transition-colors text-xl font-bold"
                  >
                    +
                  </button>
                  <span className="text-sm text-gray-500 ml-2">
                    Total: <span className="font-bold text-gray-900">{(tripPrice * seats).toLocaleString()} DZD</span>
                  </span>
                </div>
              </div>

              {/* Payment */}
              <div className="flex items-center gap-3 bg-gray-50 rounded-xl px-5 py-4">
                <svg className="w-5 h-5 text-[#FF7B29]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <div>
                  <p className="text-sm font-semibold text-gray-700">Payment Method</p>
                  <p className="text-sm text-gray-500">Cash — paid on the day of the trip</p>
                </div>
              </div>
            </div>

            {/* Participants */}
            <div className="space-y-4">
              <h3 className="text-xl font-serif font-bold text-gray-900 border-b pb-2">
                Participants
              </h3>

              {persons.map((person, index) => (
                <div key={index} className="bg-gray-50 rounded-xl p-5 space-y-4">
                  <h4 className="font-semibold text-gray-800 font-montserrat">
                    {index === 0 ? "Person 1 — Booking Contact" : `Person ${index + 1}`}
                  </h4>

                  {/* Name */}
                  <div data-error={`person${index}_name`}>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={person.name}
                      onChange={e => handlePersonChange(index, "name", e.target.value)}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#FF7B29] focus:border-transparent transition-all outline-none bg-white ${errors[`person${index}_name`] ? "border-red-500" : "border-gray-300"
                        }`}
                      placeholder="Mohamed Ali"
                    />
                    {errors[`person${index}_name`] && (
                      <p className="text-red-500 text-xs mt-1">{errors[`person${index}_name`]}</p>
                    )}
                  </div>

                  {/* Phone - only person 1 */}
                  {index === 0 && (
                    <div data-error={`person${index}_phone`}>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Phone Number (WhatsApp) *
                      </label>
                      <input
                        type="tel"
                        value={person.phone}
                        onChange={e => handlePersonChange(index, "phone", e.target.value)}
                        className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#FF7B29] focus:border-transparent transition-all outline-none bg-white ${errors[`person${index}_phone`] ? "border-red-500" : "border-gray-300"
                          }`}
                        placeholder="+213 555 123 456"
                      />
                      {errors[`person${index}_phone`] && (
                        <p className="text-red-500 text-xs mt-1">{errors[`person${index}_phone`]}</p>
                      )}
                    </div>
                  )}

                  {/* ID Photo */}
                  <div data-error={`person${index}_idPhoto`}>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      ID Photo *
                    </label>
                    <input
                      type="file"
                      id={`idPhoto${index}`}
                      accept="image/*"
                      onChange={handleFileChange(index)}
                      className="hidden"
                    />
                    <label
                      htmlFor={`idPhoto${index}`}
                      className={`flex items-center justify-center w-full border-2 border-dashed rounded-lg cursor-pointer transition-all overflow-hidden ${errors[`person${index}_idPhoto`]
                        ? "border-red-500 bg-red-50"
                        : "border-gray-300 hover:border-[#FF7B29] bg-white hover:bg-orange-50"
                        }`}
                    >
                      {person.idPhotoPreview ? (
                        <div className="relative w-full h-48">
                          <img
                            src={person.idPhotoPreview}
                            alt="ID Preview"
                            className="w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                            <p className="text-white text-sm font-semibold">Click to change</p>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center py-8 px-4">
                          <svg className="w-8 h-8 mx-auto mb-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                          </svg>
                          <p className="text-sm text-gray-600">Click to upload ID photo</p>
                          <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</p>
                        </div>
                      )}
                    </label>
                    {errors[`person${index}_idPhoto`] && (
                      <p className="text-red-500 text-xs mt-1">{errors[`person${index}_idPhoto`]}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Terms */}
            <div className="bg-gray-50 p-4 rounded-lg" data-error="agreeTerms">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={e => setAgreeTerms(e.target.checked)}
                  className="mt-1 w-5 h-5 text-[#FF7B29] border-gray-300 rounded focus:ring-[#FF7B29]"
                />
                <span className="text-sm text-gray-700">
                  I have read and agree to the{" "}
                  <a href="/terms" target="_blank" className="text-[#FF7B29] hover:underline font-semibold">
                    Terms and Conditions
                  </a>{" "}
                  and{" "}
                  <a href="/privacy" target="_blank" className="text-[#FF7B29] hover:underline font-semibold">
                    Privacy Policy
                  </a>
                </span>
              </label>
              {errors.agreeTerms && (
                <p className="text-red-500 text-xs mt-2">{errors.agreeTerms}</p>
              )}
            </div>

            {/* Upload Progress */}
            {isSubmitting && (
              <div className="space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Uploading...</span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-[#FF7B29] h-2 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}

            {/* Submit */}
            <div className="flex gap-4 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-6 py-4 border-2 border-gray-300 text-gray-700 font-bold rounded-full hover:bg-gray-100 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`flex-1 px-6 py-4 font-bold rounded-full transition-all ${isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#FF7B29] hover:bg-orange-600 hover:scale-105 shadow-lg"
                  } text-white`}
              >
                {isSubmitting ? `Uploading... ${uploadProgress}%` : "Confirm Booking"}
              </button>
            </div>

          </form>
        )}
      </div>
    </div>
  );
}