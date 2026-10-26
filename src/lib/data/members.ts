export enum Team {
  CORE = "Core Team",
  MEDIA = "Media Team",
  TECH = "Tech Team",
  CYBER = "Cyber Team",
}

export enum Role {
  FOUNDER = "Founder",
  COORDINATOR = "Coordinator",
  CO_COORDINATOR = "Co-coordinator",
  TEAM_LEAD = "Team Lead",
  MENTOR = "Mentor",
  FACULTY = "Faculty Advisor",
  MEMBER = "Member",
}

export enum Status {
  ACTIVE = "Active",
  ALUMNI = "Alumni",
  RESIGNED = "Resigned",
  REMOVED = "Removed",
}

export interface Member {
  id: string;
  name: string;
  teams: Team[];
  roles: Role[];
  status: Status;
  linkedin?: string;
  email?: string;
  reason: string;
}

export const members: Member[] = [
  // FACULTY ADVISORS
  {
    id: "sanjeev-kumar",
    name: "Prof. Sanjeev Kumar",
    teams: [],
    roles: [Role.FACULTY],
    status: Status.ACTIVE,
    reason: "Chairperson of CSE Department",
  },
  {
    id: "anupma-sangwan",
    name: "Dr. Anupma Sangwan",
    teams: [],
    roles: [Role.FACULTY],
    status: Status.ACTIVE,
    reason:
      "Former Faculty in-charge & supporter since creation of CyberPhoenix.",
  },

  {
    id: "sunil-verma",
    name: "Dr. Sunil Verma",
    teams: [],
    roles: [Role.FACULTY],
    status: Status.ACTIVE,
    reason: "Faculty in-charge of CyberPhoenix Club",
  },

  // CORE TEAM
  {
    id: "uday",
    name: "Uday",
    teams: [Team.CORE, Team.TECH],
    roles: [Role.FOUNDER, Role.COORDINATOR],
    status: Status.ACTIVE,
    linkedin: "https://www.linkedin.com/in/linkin-uday",
    reason:
      "Pioneering the club's technical direction and overseeing core infrastructure.",
  },
  {
    id: "harsh-sharma",
    name: "Harsh Sharma",
    teams: [Team.CORE, Team.CYBER],
    roles: [Role.COORDINATOR],
    status: Status.ACTIVE,
    linkedin: "https://www.linkedin.com/in/harsh-sharma80",
    reason:
      "Driving organizational strategy and ensuring seamless collaboration across all divisions.",
  },
  {
    id: "yash-raj",
    name: "Yash Raj",
    teams: [Team.CORE, Team.MEDIA],
    roles: [Role.CO_COORDINATOR],
    status: Status.ACTIVE,
    linkedin: "https://www.linkedin.com/in/yash-raj-0105a5330",
    reason:
      "Bridging the gap between technical execution and visual communication.",
  },
  {
    id: "ashish",
    name: "Ashish",
    teams: [Team.CORE, Team.MEDIA],
    roles: [Role.CO_COORDINATOR, Role.TEAM_LEAD],
    status: Status.ACTIVE,
    linkedin: "https://linkedin.com/in/ashish-nagar-6a9a1a349",
    reason:
      "Managing foundational operations and facilitating club-wide initiatives.",
  },
  {
    id: "saniya-yadav",
    name: "Saniya Yadav",
    teams: [Team.CORE, Team.TECH],
    roles: [Role.TEAM_LEAD],
    status: Status.ACTIVE,
    linkedin: "https://www.linkedin.com/in/saniya-yadav-5471b3323",
    reason:
      "Analyzing vulnerabilities and contributing to hands-on security workshops.",
  },
  {
    id: "harsh-raj-ranjan",
    name: "Harsh Raj Ranjan",
    teams: [Team.CORE, Team.CYBER],
    roles: [Role.TEAM_LEAD],
    status: Status.ACTIVE,
    linkedin: "https://www.linkedin.com/in/harshrajranjan01",
    reason:
      "Strengthening the core framework and streamlining event management processes.",
  },

  // Media Team
  {
    id: "priyanshi-singh",
    name: "Priyanshi Singh",
    teams: [Team.MEDIA],
    roles: [Role.MEMBER],
    status: Status.ACTIVE,
    reason:
      "Crafting engaging digital content and elevating the club's visual presence.",
  },
  {
    id: "Rahul Pandit",
    name: "Rahul Pandit",
    teams: [Team.MEDIA],
    roles: [Role.MEMBER],
    status: Status.ACTIVE,
    linkedin: "https://www.linkedin.com/in/rahul-pandit-a24630379",

    reason:
      "Crafting engaging digital content and elevating the club's visual presence.",
  },
  {
    id: "Harshita Bhatia",
    name: "Harshita Bhatia",
    teams: [Team.MEDIA],
    roles: [Role.MEMBER],
    status: Status.ACTIVE,
    linkedin: "https://www.linkedin.com/in/harshita-bhatia-3311953a",
    reason:
      "Crafting engaging digital content and elevating the club's visual presence.",
  },
  {
    id: "Mohini Sharma",
    name: "Mohini Sharma",
    teams: [Team.MEDIA],
    roles: [Role.MEMBER],
    status: Status.ACTIVE,
    linkedin: "https://www.linkedin.com/in/mohini-sharma-36687a3a3",
    reason:
      "Crafting engaging digital content and elevating the club's visual presence.",
  },

  // Tech Team
  {
    id: "Himanshi",
    name: "Himanshi",
    teams: [Team.TECH],
    roles: [Role.MEMBER],
    status: Status.ACTIVE,
    linkedin: "https://www.linkedin.com/in/himanshi-shekhawat-aa57323a2",
    reason:
      "A Python programmer and good at handling media tasks as well, aims to improve overall tech skills and team work.",
  },
  {
    id: "Nikunj",
    name: "Nikunj",
    teams: [Team.TECH],
    roles: [Role.MEMBER],
    status: Status.ACTIVE,
    linkedin: "https://www.linkedin.com/in/nikunj-kumar-ray-532583382",
    reason:
      "An emerging frontend developer, skilled in JS frontends, bringing web-dev improvements to club.",
  },

  // CYBER TEAM
  {
    id: "Tejasvi",
    name: "Tejasvi",
    teams: [Team.CYBER],
    roles: [Role.MEMBER],
    status: Status.ACTIVE,
    linkedin: "https://www.linkedin.com/in/tejasvi-dolia-aiml",
    reason: "",
  },
  {
    id: "Mannat",
    name: "Mannat",
    teams: [Team.CYBER],
    roles: [Role.MEMBER],
    status: Status.ACTIVE,
    linkedin: "https://www.linkedin.com/in/mannat-sharma-843b4342b",
    reason: "",
  },
  {
    id: "Muskan",
    name: "Muskant",
    teams: [Team.CYBER],
    roles: [Role.MEMBER],
    status: Status.ACTIVE,
    linkedin: "https://www.linkedin.com/in/muskan-sharma-256759422",
    reason: "",
  },

  {
    id: "Charu",
    name: "Charu Jangra",
    teams: [Team.CYBER],
    roles: [Role.MEMBER],
    status: Status.ACTIVE,
    linkedin: "https://www.linkedin.com/in/charu-jangra-829115314",

    reason: "",
  },
  {
    id: "Amandeep",
    name: "Amandeep",
    teams: [Team.CYBER],
    roles: [Role.MEMBER],
    status: Status.ACTIVE,
    linkedin: "https://www.linkedin.com/in/aman-saharawat-048b57384",
    reason: "",
  },
  {
    id: "Chandan",
    name: "Chandan",
    teams: [Team.CYBER],
    roles: [Role.MEMBER],
    status: Status.ACTIVE,
    linkedin: "https://www.linkedin.com/in/chandan-verma-0a523b445",
    reason: "",
  },

  // FOUNDERS
  {
    id: "lakshika",
    name: "Lakshika",
    teams: [Team.MEDIA],
    roles: [Role.FOUNDER, Role.MENTOR],
    status: Status.ALUMNI,
    linkedin: "https://www.linkedin.com/in/lakshika-soni-9a2bba291",
    reason:
      "Actively guiding the current cohort and shaping the club's long-term vision.",
  },
  {
    id: "aakash",
    name: "Aakash",
    teams: [Team.CORE],
    roles: [Role.FOUNDER, Role.MENTOR],
    status: Status.ALUMNI,
    linkedin: "https://www.linkedin.com/in/aakash-sehgal",
    reason:
      "Established the club's foundational principles and initial operating structure.",
  },
  {
    id: "piyush",
    name: "Piyush",
    teams: [Team.CORE],
    roles: [Role.FOUNDER, Role.MENTOR],
    status: Status.ALUMNI,
    linkedin: "https://www.linkedin.com/in/piyush-bansal-662344219",
    reason:
      "Fostered the early community and initiated our first major technical events.",
  },
  {
    id: "kartik",
    name: "Kartik",
    teams: [Team.CORE],
    roles: [Role.FOUNDER, Role.MENTOR],
    status: Status.ALUMNI,
    linkedin: "https://www.linkedin.com/in/kartik-cy63r-h",
    reason:
      "Spearheaded the integration of practical cybersecurity labs into the curriculum.",
  },
  {
    id: "anuj-kumar",
    name: "Anuj Kumar",
    teams: [Team.CORE],
    roles: [Role.FOUNDER, Role.MENTOR],
    status: Status.ALUMNI,
    linkedin: "https://www.linkedin.com/in/anuj-kumar-261471251",
    reason:
      "Drafted the original charter and built relationships with industry professionals.",
  },
  {
    id: "nishant",
    name: "Nishant",
    teams: [Team.CORE],
    roles: [Role.FOUNDER, Role.MENTOR],
    status: Status.ALUMNI,
    linkedin: "https://www.linkedin.com/in/nishant179",
    reason:
      "Architected the initial club infrastructure and recruitment protocols.",
  },
  {
    id: "kanishka",
    name: "Kanishka",
    teams: [Team.MEDIA],
    roles: [Role.FOUNDER, Role.MENTOR],
    status: Status.ALUMNI,
    linkedin: "https://www.linkedin.com/in/kanishka-yadav-403a11256",
    reason:
      "Designed the original brand identity and launched our first digital campaigns.",
  },
  {
    id: "arpita",
    name: "Arpita",
    teams: [Team.TECH],
    roles: [Role.FOUNDER, Role.MENTOR],
    status: Status.ALUMNI,
    linkedin: "https://www.linkedin.com/in/arpita26",
    reason:
      "Developed the very first iteration of the CyberPhoenix digital platform.",
  },
  {
    id: "abhinav",
    name: "Abhinav",
    teams: [Team.TECH],
    roles: [Role.FOUNDER, Role.MENTOR],
    status: Status.ALUMNI,
    linkedin: "https://www.linkedin.com/in/001-abhinav-dhiman",
    reason:
      "Laid the groundwork for our web presence and external communications.",
  },

  // PAST CONTRIBUTORS
  {
    id: "harshit-raj-mishra",
    name: "Harshit Raj Mishra",
    teams: [Team.MEDIA],
    roles: [Role.MEMBER],
    status: Status.REMOVED,
    linkedin: "https://www.linkedin.com/in/harshit-mishra-6aa4a0337",
    reason: "",
  },
  {
    id: "dev",
    name: "Dev",
    teams: [Team.TECH],
    roles: [Role.MEMBER],
    status: Status.REMOVED,
    linkedin: "https://www.linkedin.com/in/devdeepdhariiwal",
    reason: "",
  },
  {
    id: "nitya",
    name: "Nitya",
    teams: [Team.CORE],
    roles: [Role.MEMBER],
    status: Status.RESIGNED,
    linkedin: "https://www.linkedin.com/in/nitya-chhabra-477a9b325",
    reason: "",
  },
  {
    id: "rudrakshi",
    name: "Rudrakshi",
    teams: [Team.CORE],
    roles: [Role.MEMBER],
    status: Status.RESIGNED,
    linkedin: "https://www.linkedin.com/in/rudrakshi-mittal-269743345",
    reason: "",
  },
  {
    id: "parshant",
    name: "Parshant",
    teams: [Team.CORE],
    roles: [Role.MEMBER],
    status: Status.RESIGNED,
    linkedin: "https://www.linkedin.com/in/prashant-s-730aa3297",
    reason: "",
  },
  {
    id: "lakshya",
    name: "Lakshya",
    teams: [Team.MEDIA],
    roles: [Role.MEMBER],
    status: Status.RESIGNED,
    linkedin: "https://www.linkedin.com/in/lakshy-rana-9655a8323",
    reason: "",
  },
  {
    id: "aaryan",
    name: "Aaryan",
    teams: [Team.MEDIA],
    roles: [Role.MEMBER],
    status: Status.RESIGNED,
    linkedin: "https://www.linkedin.com/in/aaryan-0a5880328",
    reason: "",
  },
  {
    id: "meera",
    name: "Meera",
    teams: [Team.TECH],
    roles: [Role.MEMBER],
    status: Status.RESIGNED,
    linkedin: "https://www.linkedin.com/in/meera-catter-738450277",
    reason: "",
  },
  {
    id: "yachika",
    name: "Yachika",
    teams: [Team.TECH],
    roles: [Role.MEMBER],
    status: Status.RESIGNED,
    linkedin: "https://www.linkedin.com/in/yachika-2b940238a",
    reason: "",
  },
  {
    id: "dushyant-yadav",
    name: "Dushyant Yadav",
    teams: [Team.MEDIA],
    roles: [Role.MEMBER],
    status: Status.RESIGNED,
    linkedin: "https://www.linkedin.com/in/dushyant-yadav-305b69211",
    reason: "",
  },
  {
    id: "vikas",
    name: "Vikas",
    teams: [Team.TECH],
    roles: [Role.MEMBER],
    status: Status.RESIGNED,
    linkedin: "https://www.linkedin.com/in/vikasdhiiman",
    reason: "",
  },
  {
    id: "kunal",
    name: "Kunal",
    teams: [Team.TECH],
    roles: [Role.MEMBER],
    status: Status.RESIGNED,
    linkedin: "https://www.linkedin.com/in/kunal-phogat-b20752294",
    reason:
      "Optimizing web performance and implementing secure coding practices.",
  },
  {
    id: "prajwal-yadav",
    name: "Prajwal Yadav",
    teams: [Team.MEDIA],
    roles: [Role.MEMBER],
    status: Status.RESIGNED,
    reason:
      "Crafting engaging digital content and elevating the club's visual presence.",
  },
];

export async function getMembers(): Promise<Member[]> {
  return members.sort((a, b) => a.name.localeCompare(b.name));
}
