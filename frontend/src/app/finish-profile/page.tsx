"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { ArrowRight, ArrowLeft, Plus, X, AlertCircle } from "lucide-react"

export default function ProfileSetupPage(): React.ReactElement {
  const [currentStep, setCurrentStep] = useState(1)
  const [skillInput, setSkillInput] = useState("")
  const [phoneError, setPhoneError] = useState("")
  const [formData, setFormData] = useState({
    fullName: "",
    country: "",
    address: "",
    phoneNumber: "",
    phoneFormat: "+1",
    userType: "",
    industry: "",
    title: "",
    skills: ["React", "TypeScript", "Node.js", "Next.js", "Tailwind CSS"],
  })

  const countries = [
    { name: "United States", code: "+1" },
    { name: "Philippines", code: "+63" },
    { name: "Canada", code: "+2" },
    { name: "United Kingdom", code: "+44" },
    { name: "Australia", code: "+61" },
    { name: "India", code: "+91" },
    { name: "Germany", code: "+49" },
    { name: "France", code: "+33" },
  ]

  const industries = [
    "Software Development",
    "Web Development",
    "Mobile Development",
    "Data Science",
    "UI/UX Design",
    "DevOps",
    "Cloud Architecture",
    "Machine Learning",
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target

    if (name === "phoneNumber") {
      if (value === "" || /^\d*$/.test(value)) {
        setFormData((prev) => ({ ...prev, [name]: value }))
        setPhoneError("")
      } else {
        setPhoneError("Phone number can only contain numbers")
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }))
    }

    if (name === "country") {
      const selected = countries.find((c) => c.name === value)
      if (selected) {
        setFormData((prev) => ({ ...prev, phoneFormat: selected.code }))
      }
    }
  }

  const addSkill = () => {
    if (skillInput.trim() && !formData.skills.includes(skillInput.trim())) {
      setFormData((prev) => ({
        ...prev,
        skills: [...prev.skills, skillInput.trim()],
      }))
      setSkillInput("")
    }
  }

  const removeSkill = (skillToRemove: string) => {
    setFormData((prev) => ({
      ...prev,
      skills: prev.skills.filter((skill) => skill !== skillToRemove),
    }))
  }

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  const handleFinish = () => {
    console.log("Profile setup completed:", formData)
    // Handle profile completion
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Navigation */}
      <div className="flex justify-between items-center px-6 md:px-12 py-6 border-b border-white/10">
        <Link href="/" className="text-2xl font-bold flex items-center gap-2">
          <div className="w-8 h-8 bg-violet-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">DM</span>
          </div>
          <span>DevMatch</span>
        </Link>
        <div className="text-gray-400">Step {currentStep} of 4</div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-balance">Complete Your Profile</h1>
            <p className="text-gray-400 text-lg">Step {currentStep} of 4</p>
          </div>

          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
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
                      phoneError ? "border-red-500 focus:border-red-500" : "border-white/10 focus:border-violet-600"
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
          )}

          {/* Step 2: User Type */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <p className="text-gray-400 text-center mb-8">Select your role on DevMatch</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <button
                  onClick={() => setFormData((prev) => ({ ...prev, userType: "freelancer" }))}
                  className={`p-8 rounded-lg border-2 transition-all ${
                    formData.userType === "freelancer"
                      ? "border-violet-600 bg-violet-600/10"
                      : "border-white/10 bg-white/5 hover:border-white/20"
                  }`}
                >
                  <div className="text-3xl mb-4">💼</div>
                  <h3 className="text-xl font-bold mb-2">Freelancer</h3>
                  <p className="text-gray-400 text-sm">Offer your skills and find projects</p>
                </button>

                <button
                  onClick={() => setFormData((prev) => ({ ...prev, userType: "client" }))}
                  className={`p-8 rounded-lg border-2 transition-all ${
                    formData.userType === "client"
                      ? "border-violet-600 bg-violet-600/10"
                      : "border-white/10 bg-white/5 hover:border-white/20"
                  }`}
                >
                  <div className="text-3xl mb-4">🎯</div>
                  <h3 className="text-xl font-bold mb-2">Client</h3>
                  <p className="text-gray-400 text-sm">Post projects and hire talent</p>
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Professional Information & Skills */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div>
                <label htmlFor="industry" className="block text-sm font-medium mb-2">
                  Industry
                </label>
                <select
                  id="industry"
                  name="industry"
                  value={formData.industry}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-violet-600 focus:outline-none transition-colors text-white"
                >
                  <option value="">Select an industry</option>
                  {industries.map((industry) => (
                    <option key={industry} value={industry} className="bg-black">
                      {industry}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="title" className="block text-sm font-medium mb-2">
                  Professional Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g., Senior Frontend Developer"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-violet-600 focus:outline-none transition-colors text-white placeholder-gray-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Skills</label>
                <div className="flex gap-2 mb-4">
                  <input
                    type="text"
                    value={skillInput}
                    onChange={(e) => setSkillInput(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && addSkill()}
                    placeholder="Add a skill and press Enter"
                    className="flex-1 px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:border-violet-600 focus:outline-none transition-colors text-white placeholder-gray-500"
                  />
                  <button
                    onClick={addSkill}
                    className="px-4 py-3 bg-violet-600 hover:bg-violet-700 rounded-lg transition-colors flex items-center gap-2 font-medium"
                  >
                    <Plus size={18} />
                    Add
                  </button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {formData.skills.map((skill) => (
                    <div
                      key={skill}
                      className="flex items-center gap-2 bg-violet-600/20 border border-violet-600/50 rounded-full px-3 py-1.5"
                    >
                      <span className="text-sm">{skill}</span>
                      <button onClick={() => removeSkill(skill)} className="hover:text-violet-400 transition-colors">
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Review */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="bg-white/5 border border-white/10 rounded-lg p-8 space-y-6">
                <div className="border-b border-white/10 pb-6">
                  <h3 className="text-sm font-medium text-gray-400 mb-2">Personal Information</h3>
                  <div className="space-y-2 text-white">
                    <p>
                      <span className="text-gray-500">Full Name:</span> {formData.fullName}
                    </p>
                    <p>
                      <span className="text-gray-500">Country:</span> {formData.country}
                    </p>
                    <p>
                      <span className="text-gray-500">Address:</span> {formData.address}
                    </p>
                    <p>
                      <span className="text-gray-500">Phone:</span> {formData.phoneFormat}
                      {formData.phoneNumber}
                    </p>
                  </div>
                </div>

                <div className="border-b border-white/10 pb-6">
                  <h3 className="text-sm font-medium text-gray-400 mb-2">Account Type</h3>
                  <p className="text-white capitalize">{formData.userType}</p>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-gray-400 mb-2">Professional Information</h3>
                  <div className="space-y-2 text-white">
                    <p>
                      <span className="text-gray-500">Industry:</span> {formData.industry}
                    </p>
                    <p>
                      <span className="text-gray-500">Title:</span> {formData.title}
                    </p>
                    <div>
                      <span className="text-gray-500 block mb-2">Skills:</span>
                      <div className="flex flex-wrap gap-2">
                        {formData.skills.map((skill) => (
                          <span
                            key={skill}
                            className="bg-violet-600/20 border border-violet-600/50 rounded-full px-3 py-1 text-sm"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-12 gap-4">
            <button
              onClick={prevStep}
              disabled={currentStep === 1}
              className="px-6 py-3 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              <ArrowLeft size={18} />
              Back
            </button>

            {currentStep < 4 ? (
              <button
                onClick={nextStep}
                disabled={
                  (currentStep === 1 &&
                    (!formData.fullName || !formData.country || !formData.address || !formData.phoneNumber)) ||
                  (currentStep === 2 && !formData.userType) ||
                  (currentStep === 3 && (!formData.industry || !formData.title || formData.skills.length === 0))
                }
                className="px-6 py-3 bg-violet-600 hover:bg-violet-700 rounded-lg transition-colors flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed font-medium group"
              >
                Next
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            ) : (
              <button
                onClick={handleFinish}
                className="px-6 py-3 bg-violet-600 hover:bg-violet-700 rounded-lg transition-colors flex items-center gap-2 font-medium group"
              >
                Finish
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Floating Background Elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-40 right-20 w-96 h-96 bg-violet-600/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-violet-600/5 rounded-full blur-3xl" />
      </div>
    </div>
  )
}
