export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignUpCredentials {
  email: string;
  password: string;
}

export interface OnboardingDetails {
  firstName: string;
  lastName: string;
  // email: string;
  phone: string;
  address: string;
  collegeOrInstituteName: string;
  degree: string;
  graduationYear: string;
  bio: string;
  skills: string[];
  professionalExperiences: { position: string; company: string; description: string }[];
}



export interface User {
  name: string;
  email: string;
  onboarding: boolean;
  accessToken: string;
}
