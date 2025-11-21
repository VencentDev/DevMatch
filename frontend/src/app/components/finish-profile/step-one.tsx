import React from "react"
import { PhoneInput } from "@/components/phone-input"
import { CountryDropdown, Country } from "@/components/ui/country-dropdown"
import { FinishProfileRequest } from "@/lib/types/finishProfile"

interface StepOneProps {
	formData: FinishProfileRequest
	handleInputChange: (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
	) => void
	setFormData: React.Dispatch<React.SetStateAction<FinishProfileRequest>>
}

export const StepOne: React.FC<StepOneProps> = ({
	formData,
	handleInputChange,
	setFormData,
}) => {
	const handleCountryChange = (country: Country) => {
		setFormData((prev) => ({
			...prev,
			country: country.name, // Update the country name in formData
		}))
	}

	return (
		<div className="space-y-6">
			<div>
				<label
					htmlFor="fullName"
					className="block text-sm font-medium mb-2"
				>
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
				<label
					htmlFor="country"
					className="block text-sm font-medium mb-2"
				>
					Country
				</label>
				<CountryDropdown
					onChange={handleCountryChange}
					placeholder="Select a country"
				/>
			</div>

			<div>
				<label
					htmlFor="address"
					className="block text-sm font-medium mb-2"
				>
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
				<label
					htmlFor="phone"
					className="block text-sm font-medium mb-2"
				>
					Phone Number
				</label>
				<PhoneInput
					value={formData.phone}
					onChange={(value) =>
						setFormData((prev) => ({ ...prev, phone: value || "" }))
					}
				/>
			</div>
		</div>
	)
}
