export interface FinishProfileRequest {
  role?: string;
  userType?: string;
  fullName?: string;
  country?: string;
  address?: string;
  phone?: string;
  governmentIdUrl?: string;
  title?: string;
  skills?: string[];
  links?: string[];
  languages?: string[];
  education?: string[];
  certifications?: string[];
  industry?: string;
  paymentMethod?: string;
}