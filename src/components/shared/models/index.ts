export interface IMotivationalValueSystem {
  color: string;
  red?: number;
  green?: number;
  blue?: number;
}

export interface IColors {
  word: string;
  color: string;
  percentage: number;
}

export interface IConflictSequenceStages {
  label: string;
  description?: string;
  colors?: IColors[];
}

export interface IConflictSequence {
  color: string;
  red?: number;
  green?: number;
  blue?: number;
  stages?: IConflictSequenceStages;
}

export interface IAssessmentResults {
  motivationalValueSystem?: IMotivationalValueSystem;
  conflictSequence?: IConflictSequence;
}

export interface IAssessment {
  createdAt: string | Date;
  results: IAssessmentResults;
}

export interface IUserAssessments {
  default: IAssessment;
}

export interface ICompany {
  id: number;
  name: string;
  streetAddress1: string;
  streetAddress2: string;
  city: string;
  stateProvince: string;
  country: string;
  postalCode: string;
  phoneNumber: string;
  images: string;
}

export interface IProfileImages {
  avatarUrl: string;
  monumentUrl: string;
}

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  emailAddress?: string;
  profileImages?: IProfileImages;
  jobTitle: string;
  company?: ICompany;
  language?: string;
  assessments?: IUserAssessments;
}
