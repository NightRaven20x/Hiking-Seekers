"use client";

import { useState, useEffect } from "react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  tripTitle: string;
  tripPrice: string;
  tripId: number;
}

export default function BookingModal({ isOpen, onClose, tripTitle, tripPrice, tripId }: BookingModalProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    phone: "",
    seats: 1,
    idPhotos: [null] as (File | null)[],
    paymentMethod: "cash",
    agreeTerms: false
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Update ID photos array when seats change
  useEffect(() => {
    const seatCount = Math.max(1, Math.min(10, formData.seats || 1)); // Ensure valid range
    const newIdPhotos = Array.from({ length: seatCount }, (_, index) => 
      formData.idPhotos[index] || null
    );
    setFormData(prev => ({ ...prev, idPhotos: newIdPhotos }));
  }, [formData.seats]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === "checkbox") {
      const target = e.target as HTMLInputElement;
      setFormData({ ...formData, [name]: target.checked });
    } else if (name === "seats") {
      const seats = parseInt(value) || 1; // Default to 1 if NaN
      const validSeats = Math.max(1, Math.min(10, seats)); // Clamp between 1-10
      setFormData({ ...formData, seats: validSeats });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleFileChange = (index: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setErrors({ ...errors, [`idPhoto${index}`]: "File size must be less than 5MB" });
        return;
      }
      // Validate file type
      if (!file.type.startsWith("image/")) {
        setErrors({ ...errors, [`idPhoto${index}`]: "Please upload an image file" });
        return;
      }
      
      const newIdPhotos = [...formData.idPhotos];
      newIdPhotos[index] = file;
      setFormData({ ...formData, idPhotos: newIdPhotos });
      setErrors({ ...errors, [`idPhoto${index}`]: "" });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) newErrors.fullName = "Full name is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone number is required";
    
    // Validate all ID photos are uploaded
    formData.idPhotos.forEach((photo, index) => {
      if (!photo) {
        newErrors[`idPhoto${index}`] = `ID photo for person ${index + 1} is required`;
      }
    });
    
    if (!formData.agreeTerms) newErrors.agreeTerms = "You must agree to terms and conditions";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      console.log("Booking submitted:", formData);
      setIsSubmitting(false);
      setSubmitSuccess(true);
      
      // Reset form after 3 seconds and close modal
      setTimeout(() => {
        setSubmitSuccess(false);
        onClose();
        // Reset form
        setFormData({
          fullName: "",
          phone: "",
          seats: 1,
          idPhotos: [null],
          paymentMethod: "cash",
          agreeTerms: false
        });
      }, 3000);
    }, 2000);
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
              <p className="text-white/90">{tripTitle} - {tripPrice} DZD per person</p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Success Message */}
        {submitSuccess && (
          <div className="m-6 p-6 bg-green-50 border-2 border-green-500 rounded-xl text-center">
            <div className="text-6xl mb-4">✓</div>
            <h3 className="text-2xl font-bold text-green-800 mb-2">Booking Submitted!</h3>
            <p className="text-green-700">We'll contact you on WhatsApp shortly to confirm your booking.</p>
          </div>
        )}

        {/* Form */}
        {!submitSuccess && (
          <form onSubmit={handleSubmit} className="p-6 space-y-6">

            {/* Personal Information Section */}
            <div className="space-y-4">
              <h3 className="text-xl font-serif font-bold text-gray-900 border-b pb-2">Personal Information</h3>
              
              {/* Full Name */}
              <div>
                <label htmlFor="fullName" className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#FF7B29] focus:border-transparent transition-all outline-none ${
                    errors.fullName ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Mohamed Ali"
                />
                {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number (WhatsApp) *
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#FF7B29] focus:border-transparent transition-all outline-none ${
                    errors.phone ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="+213 555 123 456"
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>
            </div>

            {/* Booking Details Section */}
            <div className="space-y-4">
              <h3 className="text-xl font-serif font-bold text-gray-900 border-b pb-2">Booking Details</h3>
              
              {/* Seats & Payment Method */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="seats" className="block text-sm font-semibold text-gray-700 mb-2">
                    Number of Seats *
                  </label>
                  <input
                    type="number"
                    id="seats"
                    name="seats"
                    min="1"
                    max="10"
                    value={formData.seats.toString()}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF7B29] focus:border-transparent transition-all outline-none"
                  />
                  <p className="text-xs text-gray-500 mt-1">Total: {parseInt(tripPrice) * formData.seats} DZD</p>
                </div>

                <div>
                  <label htmlFor="paymentMethod" className="block text-sm font-semibold text-gray-700 mb-2">
                    Payment Method *
                  </label>
                  <select
                    id="paymentMethod"
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#FF7B29] focus:border-transparent transition-all outline-none"
                  >
                    <option value="cash">Cash (Pay on trip)</option>
                    <option value="ccp">CCP Transfer</option>
                  </select>
                </div>
              </div>
            </div>

            {/* ID Verification Section - Dynamic based on seats */}
            <div className="space-y-4">
              <h3 className="text-xl font-serif font-bold text-gray-900 border-b pb-2">
                ID Verification
                {formData.seats > 1 && (
                  <span className="text-sm font-normal text-gray-600 ml-2">
                    (Upload ID photo for each person)
                  </span>
                )}
              </h3>
              
              {/* Dynamic ID Photo Uploads */}
              <div className="space-y-4">
                {formData.idPhotos.map((photo, index) => (
                  <div key={index}>
                    <label htmlFor={`idPhoto${index}`} className="block text-sm font-semibold text-gray-700 mb-2">
                      {formData.seats > 1 ? `ID Photo - Person ${index + 1} *` : "ID Photo *"}
                    </label>
                    <div className="relative">
                      <input
                        type="file"
                        id={`idPhoto${index}`}
                        name={`idPhoto${index}`}
                        accept="image/*"
                        onChange={handleFileChange(index)}
                        className="hidden"
                      />
                      <label
                        htmlFor={`idPhoto${index}`}
                        className={`flex items-center justify-center w-full px-4 py-6 border-2 border-dashed rounded-lg cursor-pointer transition-all ${
                          errors[`idPhoto${index}`] ? "border-red-500 bg-red-50" : "border-gray-300 hover:border-[#FF7B29] bg-gray-50 hover:bg-orange-50"
                        }`}
                      >
                        <div className="text-center">
                          {photo ? (
                            <>
                              <svg className="w-8 h-8 mx-auto mb-2 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                              </svg>
                              <p className="text-sm text-gray-600">{photo.name}</p>
                              <p className="text-xs text-gray-400 mt-1">Click to change</p>
                            </>
                          ) : (
                            <>
                              <svg className="w-8 h-8 mx-auto mb-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                              </svg>
                              <p className="text-sm text-gray-600">Click to upload or drag and drop</p>
                              <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</p>
                            </>
                          )}
                        </div>
                      </label>
                    </div>
                    {errors[`idPhoto${index}`] && <p className="text-red-500 text-xs mt-1">{errors[`idPhoto${index}`]}</p>}
                  </div>
                ))}
              </div>
            </div>

            {/* Terms & Conditions */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  name="agreeTerms"
                  checked={formData.agreeTerms}
                  onChange={handleChange}
                  className="mt-1 w-5 h-5 text-[#FF7B29] border-gray-300 rounded focus:ring-[#FF7B29]"
                />
                <span className="text-sm text-gray-700">
                  I agree to the <a href="/terms" className="text-[#FF7B29] hover:underline">terms and conditions</a> and understand that:
                  <ul className="list-disc ml-5 mt-2 space-y-1 text-xs">
                    <li>Payment must be completed before the trip date</li>
                    <li>Cancellations must be made 48 hours in advance</li>
                    <li>I am physically fit for hiking activities</li>
                    <li>Weather conditions may affect trip schedule</li>
                  </ul>
                </span>
              </label>
              {errors.agreeTerms && <p className="text-red-500 text-xs mt-2">{errors.agreeTerms}</p>}
            </div>

            {/* Submit Button */}
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
                className={`flex-1 px-6 py-4 font-bold rounded-full transition-all ${
                  isSubmitting
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-[#FF7B29] hover:bg-orange-600 hover:scale-105 shadow-lg"
                } text-white`}
              >
                {isSubmitting ? "Submitting..." : "Confirm Booking"}
              </button>
            </div>

          </form>
        )}
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.3s ease-out;
        }

        /* Custom Scrollbar Styles */
        .custom-scrollbar::-webkit-scrollbar {
          width: 12px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 10px;
          margin: 10px 0;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(180deg, #FF7B29 0%, #e67022 100%);
          border-radius: 10px;
          border: 2px solid #f1f1f1;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(180deg, #e67022 0%, #d66520 100%);
        }

        /* Firefox */
        .custom-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: #FF7B29 #f1f1f1;
        }
      `}</style>
    </div>
  );
}