import React from "react";
import { Plus, X } from "lucide-react";

interface StepThreeProps {
  formData: {
    industry: string;
    title: string;
    skills: string[];
  };
  industries: string[];
  skillInput: string;
  setSkillInput: React.Dispatch<React.SetStateAction<string>>;
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  addSkill: () => void;
  removeSkill: (skill: string) => void;
}

export const StepThree: React.FC<StepThreeProps> = ({
  formData,
  industries,
  skillInput,
  setSkillInput,
  handleInputChange,
  addSkill,
  removeSkill,
}) => {
  return (
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
              <button
                onClick={() => removeSkill(skill)}
                className="hover:text-violet-400 transition-colors"
              >
                <X size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};