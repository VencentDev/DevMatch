export const addSkill = (
  skillInput: string,
  skills: string[],
  setSkills: React.Dispatch<React.SetStateAction<string[]>>,
  setSkillInput: React.Dispatch<React.SetStateAction<string>>
) => {
  if (skillInput.trim() && !skills.includes(skillInput.trim())) {
    setSkills((prev) => [...prev, skillInput.trim()]);
    setSkillInput("");
  }
};

export const removeSkill = (
  skillToRemove: string,
  skills: string[],
  setSkills: React.Dispatch<React.SetStateAction<string[]>>
) => {
  setSkills((prev) => prev.filter((skill) => skill !== skillToRemove));
};