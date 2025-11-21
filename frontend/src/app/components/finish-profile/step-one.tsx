import React from "react";
import { AlertCircle } from "lucide-react";

interface StepOneProps {
  formData: {
    fullName: string;
    country: string;
    address: string;
    phoneNumber: string;
    phoneFormat: string;
  };
  phoneError: string;
  countries: { name: string; code: string }[];
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

export const StepOne: React.FC<StepOneProps> = ({
  formData,
  phoneError,
  countries,
  handleInputChange,
}) => {
  return (
    <div className="space-y-6">
      <div>
        <label htmlFor="fullName" className="block text-sm font-medium mb-2">
          Full Name
        </label>
        <input
          type="text"
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={handleInputChange}
          placeholder="John Doe"
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-violet-600 focus:outline-none transition-colors text-white placeholder-gray-500"
        />
      </div>

      <div>
        <label htmlFor="country" className="block text-sm font-medium mb-2">
          Country
        </label>
        <select
          id="country"
          name="country"
          value={formData.country}
          onChange={handleInputChange}
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-violet-600 focus:outline-none transition-colors text-white"
        >
          <option value="">Select a country</option>
          {countries.map((country) => (
            <option key={country.code} value={country.name} className="bg-black">
              {country.name}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="address" className="block text-sm font-medium mb-2">
          Address
        </label>
        <input
          type="text"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleInputChange}
          placeholder="123 Main St, City, Province"
          className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-violet-600 focus:outline-none transition-colors text-white placeholder-gray-500"
        />
      </div>

      <div>
        <label htmlFor="phoneNumber" className="block text-sm font-medium mb-2">
          Phone Number
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={formData.phoneFormat}
            disabled
            className="w-20 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white cursor-not-allowed"
          />
          <input
            type="text"
            id="phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleInputChange}
            placeholder="9123456789"
            className={`flex-1 px-4 py-3 bg-white/5 border rounded-lg focus:outline-none transition-colors text-white placeholder-gray-500 ${
              phoneError
                ? "border-red-500 focus:border-red-500"
                : "border-white/10 focus:border-violet-600"
            }`}
          />
        </div>
        {phoneError && (
          <div className="flex items-center gap-2 mt-2 text-red-500 text-sm">
            <AlertCircle size={16} />
            <span>{phoneError}</span>
          </div>
        )}
      </div>
    </div>
  );
};