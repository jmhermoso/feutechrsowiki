// lib/officers/types.ts

export interface SocialMedia {
    facebook?: string;
    instagram?: string;
  }
  
  export interface Tenure {
    startYear: number;
    endYear: number | "present";
    position: string;
    department?: string;
    result?: string;
  }
  
  export interface OrgAffiliation {
    orgId: string;
    role?: string;
  }
  
  export interface Officer {
    studentNumber: string;
    lastName: string;
    firstName: string;
    nickname?: string;
    birthday?: string;
    img?: string;
    status: string;
    tenures: Tenure[];
    orgsAffiliated: OrgAffiliation[];
    socialMedia?: SocialMedia;
  }