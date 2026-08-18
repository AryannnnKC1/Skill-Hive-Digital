import dotenv from "dotenv";
import mongoose from 'mongoose';

dotenv.config({ path: "../../.env" });
import Career from './models/career.model';

type RoadmapItemType = 'education' | 'skill' | 'experience';

type Roadmap = {
  summary: string;
  stages: {
    title: string;
    duration: string;
    description: string;
    items: { label: string; type: RoadmapItemType }[];
  }[];
};

const careers: (Record<string, unknown> & { roadmap?: Roadmap })[] = [
  {
    title: 'Software Engineer',
    description:
      'Design, develop, and maintain software systems and applications. Work with programming languages, frameworks, and tools to build solutions that solve real-world problems.',
    category: 'Technology',
    requiredSkills: ['Programming', 'Problem Solving', 'Algorithms', 'Data Structures', 'Version Control'],
    educationRequired: "Bachelor's in Computer Science or related field",
    averageSalary: '$95,000 - $150,000',
    growthOutlook: 'Fast Growing',
    workEnvironment: 'Office',
    roadmap: {
      summary:
        'Software engineering is a hands-on field that rewards consistent practice. Start with a solid CS foundation, build a portfolio of real projects, then grow into senior or specialized roles.',
      stages: [
        {
          title: 'Education & Foundation',
          duration: 'Years 1–4',
          description: 'Build the theoretical foundation computer science is built on.',
          items: [
            { label: "Bachelor's in Computer Science, Software Engineering, or related field", type: 'education' },
            { label: 'Data structures & algorithms', type: 'skill' },
            { label: 'Object-oriented programming', type: 'skill' },
            { label: 'Databases & SQL basics', type: 'skill' },
            { label: 'Operating systems & networks', type: 'skill' },
          ],
        },
        {
          title: 'Core Skills & Tooling',
          duration: 'During & after studies',
          description: 'Learn the practical tools and languages used across the industry.',
          items: [
            { label: 'Master one or two languages (JavaScript, Python, Java, C#)', type: 'skill' },
            { label: 'Version control with Git & GitHub', type: 'skill' },
            { label: 'Web fundamentals (HTML, CSS, HTTP)', type: 'skill' },
            { label: 'Testing & debugging practices', type: 'skill' },
            { label: 'Relevant certifications or bootcamps', type: 'education' },
          ],
        },
        {
          title: 'Hands-on Experience',
          duration: 'Years 1–3 of work',
          description: 'Turn theory into proven ability through real projects and roles.',
          items: [
            { label: 'Internship or co-op placement', type: 'experience' },
            { label: 'Build a portfolio of personal projects', type: 'experience' },
            { label: 'Contribute to open-source projects', type: 'experience' },
            { label: 'Entry-level role (Junior/Associate Developer)', type: 'experience' },
            { label: 'Pair programming & code reviews', type: 'skill' },
          ],
        },
        {
          title: 'Growth & Advancement',
          duration: 'Years 3+',
          description: 'Specialize, lead, and deepen your impact.',
          items: [
            { label: 'Specialize (backend, frontend, DevOps, mobile, AI)', type: 'experience' },
            { label: 'System design & architecture', type: 'skill' },
            { label: 'Mentor junior developers', type: 'experience' },
            { label: 'Mid-level → Senior Engineer', type: 'experience' },
            { label: 'Optional master’s or leadership track', type: 'education' },
          ],
        },
      ],
    },
  },
  {
    title: 'Data Scientist',
    description: 'Analyze large datasets to extract insights and build predictive models. Use statistical methods, machine learning, and data visualization to drive business decisions.',
    category: 'Technology',
    requiredSkills: ['Python', 'Statistics', 'Machine Learning', 'SQL', 'Data Visualization'],
    educationRequired: "Master's or PhD in Data Science, Statistics, or related field",
    averageSalary: '$110,000 - $170,000',
    growthOutlook: 'Fast Growing',
    workEnvironment: 'Office',
    roadmap: {
      summary:
        'Data science blends statistics, programming, and business insight. Build strong math foundations, learn to work with real datasets, and communicate findings clearly.',
      stages: [
        {
          title: 'Education & Foundation',
          duration: 'Years 1–4',
          description: 'Establish the quantitative and analytical base for the field.',
          items: [
            { label: "Bachelor's in Statistics, Math, Computer Science, or Data Science", type: 'education' },
            { label: 'Linear algebra & calculus', type: 'skill' },
            { label: 'Probability & statistics', type: 'skill' },
            { label: 'Python or R programming', type: 'skill' },
            { label: 'SQL for data querying', type: 'skill' },
          ],
        },
        {
          title: 'Advanced Skills & Machine Learning',
          duration: 'Years 2–4',
          description: 'Deepen into machine learning, experimentation, and modeling.',
          items: [
            { label: "Master's or PhD in Data Science / related field", type: 'education' },
            { label: 'Machine learning & model evaluation', type: 'skill' },
            { label: 'Data cleaning & feature engineering', type: 'skill' },
            { label: 'Data visualization & storytelling', type: 'skill' },
            { label: 'Cloud platforms & big-data tools', type: 'skill' },
          ],
        },
        {
          title: 'Hands-on Experience',
          duration: 'Years 1–3 of work',
          description: 'Apply modeling skills to business problems and real datasets.',
          items: [
            { label: 'Data analyst or research assistant role', type: 'experience' },
            { label: 'Build end-to-end portfolio projects', type: 'experience' },
            { label: 'Kaggle competitions & open datasets', type: 'experience' },
            { label: 'Entry-level Data Scientist role', type: 'experience' },
            { label: 'A/B testing & experiment design', type: 'skill' },
          ],
        },
        {
          title: 'Growth & Advancement',
          duration: 'Years 3+',
          description: 'Move into specialized or senior data roles.',
          items: [
            { label: 'Specialize in NLP, computer vision, or ML engineering', type: 'experience' },
            { label: 'Productionize ML models', type: 'skill' },
            { label: 'Lead data science projects', type: 'experience' },
            { label: 'Senior Data Scientist or ML Engineer', type: 'experience' },
            { label: 'Publish research or speak at conferences', type: 'experience' },
          ],
        },
      ],
    },
  },
  {
    title: 'UX Designer',
    description: 'Design user interfaces and experiences for web and mobile applications. Conduct user research, create wireframes, and prototype designs to improve usability.',
    category: 'Technology',
    requiredSkills: ['User Research', 'Wireframing', 'Prototyping', 'Figma', 'Usability Testing'],
    educationRequired: "Bachelor's in Design, HCI, or related field",
    averageSalary: '$80,000 - $130,000',
    growthOutlook: 'Growing',
    workEnvironment: 'Hybrid',
    roadmap: {
      summary:
        'UX design is about understanding users and designing thoughtful digital experiences. Build a research-first mindset, master modern design tools, and grow a strong portfolio.',
      stages: [
        {
          title: 'Education & Foundation',
          duration: 'Years 1–4',
          description: 'Learn design fundamentals and how people interact with products.',
          items: [
            { label: "Bachelor's in Design, Human-Computer Interaction, or related field", type: 'education' },
            { label: 'Design principles & visual hierarchy', type: 'skill' },
            { label: 'Typography & color theory', type: 'skill' },
            { label: 'Interaction design basics', type: 'skill' },
            { label: 'UX bootcamps or certifications', type: 'education' },
          ],
        },
        {
          title: 'Core UX Skills & Tools',
          duration: 'During & after studies',
          description: 'Master the research and prototyping workflows used daily.',
          items: [
            { label: 'Figma, Sketch, or Adobe XD', type: 'skill' },
            { label: 'Wireframing & prototyping', type: 'skill' },
            { label: 'User research & personas', type: 'skill' },
            { label: 'Usability testing & accessibility', type: 'skill' },
            { label: 'Design systems & component libraries', type: 'skill' },
          ],
        },
        {
          title: 'Hands-on Experience',
          duration: 'Years 1–3 of work',
          description: 'Build a portfolio that demonstrates the full design process.',
          items: [
            { label: 'Design internships or freelance projects', type: 'experience' },
            { label: 'Case-study portfolio of 3–5 projects', type: 'experience' },
            { label: 'Junior UX / Product Designer role', type: 'experience' },
            { label: 'Shadow user research sessions', type: 'experience' },
            { label: 'Cross-functional collaboration', type: 'skill' },
          ],
        },
        {
          title: 'Growth & Advancement',
          duration: 'Years 3+',
          description: 'Lead design direction and expand your scope.',
          items: [
            { label: 'Lead UX / Senior Product Designer', type: 'experience' },
            { label: 'Design leadership & strategy', type: 'skill' },
            { label: 'Mentor junior designers', type: 'experience' },
            { label: 'Specialize in UX research or design ops', type: 'experience' },
          ],
        },
      ],
    },
  },
  {
    title: 'Registered Nurse',
    description: 'Provide patient care, administer medications, and coordinate treatment plans in hospitals, clinics, and other healthcare settings.',
    category: 'Healthcare',
    requiredSkills: ['Patient Care', 'Empathy', 'Medical Knowledge', 'Communication', 'Critical Thinking'],
    educationRequired: 'Bachelor of Science in Nursing (BSN)',
    averageSalary: '$65,000 - $100,000',
    growthOutlook: 'Fast Growing',
    workEnvironment: 'Field',
    roadmap: {
      summary:
        'Nursing combines rigorous clinical education with strong interpersonal skills. Complete a nursing degree and licensure, gain bedside experience, then specialize.',
      stages: [
        {
          title: 'Education & Licensure',
          duration: 'Years 1–4',
          description: 'Complete a nursing program and pass the licensing exam.',
          items: [
            { label: 'Bachelor of Science in Nursing (BSN)', type: 'education' },
            { label: 'NCLEX-RN licensure exam', type: 'education' },
            { label: 'Anatomy, physiology & pharmacology', type: 'skill' },
            { label: 'Clinical rotations in multiple settings', type: 'experience' },
            { label: 'Basic life support (BLS/CPR) certification', type: 'education' },
          ],
        },
        {
          title: 'Core Nursing Skills',
          duration: 'During & after studies',
          description: 'Develop the clinical and communication skills of daily practice.',
          items: [
            { label: 'Patient assessment & vital signs', type: 'skill' },
            { label: 'Medication administration', type: 'skill' },
            { label: 'Care planning & documentation', type: 'skill' },
            { label: 'Communication & empathy', type: 'skill' },
            { label: 'Critical thinking under pressure', type: 'skill' },
          ],
        },
        {
          title: 'Hands-on Experience',
          duration: 'Years 1–3 of work',
          description: 'Gain bedside confidence in a structured clinical environment.',
          items: [
            { label: 'New-graduate residency program', type: 'experience' },
            { label: 'Staff nurse in hospital or clinic', type: 'experience' },
            { label: 'Rotate across departments', type: 'experience' },
            { label: 'Advanced certifications (ACLS, PALS)', type: 'education' },
          ],
        },
        {
          title: 'Growth & Advancement',
          duration: 'Years 3+',
          description: 'Specialize or move into leadership and education.',
          items: [
            { label: 'Specialize (ICU, ER, pediatrics, oncology)', type: 'experience' },
            { label: 'MSN or DNP graduate programs', type: 'education' },
            { label: 'Charge nurse or nurse manager', type: 'experience' },
            { label: 'Nurse practitioner (NP) pathway', type: 'education' },
            { label: 'Nursing education & mentoring', type: 'experience' },
          ],
        },
      ],
    },
  },
  {
    title: 'Physician',
    description: 'Diagnose and treat illnesses and injuries. Examine patients, interpret medical tests, and prescribe treatments to improve patient health outcomes.',
    category: 'Healthcare',
    requiredSkills: ['Medical Diagnosis', 'Patient Care', 'Analytical Thinking', 'Communication', 'Attention to Detail'],
    educationRequired: 'Doctor of Medicine (MD) + Residency',
    averageSalary: '$180,000 - $350,000',
    growthOutlook: 'Growing',
    workEnvironment: 'Office',
    roadmap: {
      summary:
        'Becoming a physician is a long but rewarding path: undergraduate study, medical school, residency, and board certification, followed by specialization and practice.',
      stages: [
        {
          title: 'Pre-Medical Education',
          duration: 'Years 1–4',
          description: 'Build the science foundation and prepare for medical school.',
          items: [
            { label: "Bachelor's in biology, chemistry, or pre-med track", type: 'education' },
            { label: 'Biology, chemistry & organic chemistry', type: 'skill' },
            { label: 'Physics & mathematics', type: 'skill' },
            { label: 'MCAT exam preparation', type: 'skill' },
            { label: 'Shadow physicians & clinical volunteering', type: 'experience' },
          ],
        },
        {
          title: 'Medical School',
          duration: 'Years 5–8',
          description: 'Complete an MD/DO program with clinical clerkships.',
          items: [
            { label: 'Doctor of Medicine (MD) or DO degree', type: 'education' },
            { label: 'USMLE Step 1 & Step 2 exams', type: 'education' },
            { label: 'Anatomy, pathology & pharmacology', type: 'skill' },
            { label: 'Clinical clerkships across specialties', type: 'experience' },
            { label: 'Patient interviewing & diagnosis', type: 'skill' },
          ],
        },
        {
          title: 'Residency & Licensure',
          duration: 'Years 9–12',
          description: 'Train hands-on in your chosen specialty and get licensed.',
          items: [
            { label: 'Residency in chosen specialty', type: 'experience' },
            { label: 'USMLE Step 3 & state medical licensure', type: 'education' },
            { label: 'Advanced clinical procedures', type: 'skill' },
            { label: 'Board certification exams', type: 'education' },
            { label: 'Independent patient panel management', type: 'experience' },
          ],
        },
        {
          title: 'Practice & Advancement',
          duration: 'Years 12+',
          description: 'Practice medicine and grow your expertise and leadership.',
          items: [
            { label: 'Attending physician practice', type: 'experience' },
            { label: 'Specialty fellowships (subspecialties)', type: 'education' },
            { label: 'Lead care teams', type: 'experience' },
            { label: 'Clinical research & publications', type: 'experience' },
            { label: 'Medical education or department leadership', type: 'experience' },
          ],
        },
      ],
    },
  },
  {
    title: 'Medical Lab Technician',
    description: 'Conduct laboratory tests on patient samples to help diagnose diseases and monitor treatment. Operate lab equipment and maintain accurate records.',
    category: 'Healthcare',
    requiredSkills: ['Lab Techniques', 'Attention to Detail', 'Microscopy', 'Record Keeping', 'Safety Protocols'],
    educationRequired: "Associate's or Bachelor's in Medical Technology",
    averageSalary: '$45,000 - $70,000',
    growthOutlook: 'Growing',
    workEnvironment: 'Lab',
    roadmap: {
      summary:
        'Medical lab technicians run the tests that drive diagnoses. A focused associate’s or bachelor’s degree, certification, and careful lab practice open the door to this role.',
      stages: [
        {
          title: 'Education & Foundation',
          duration: 'Years 2–4',
          description: 'Complete a medical laboratory science program.',
          items: [
            { label: "Associate's or Bachelor's in Medical Laboratory Science", type: 'education' },
            { label: 'Biology, chemistry & microbiology', type: 'skill' },
            { label: 'Hematology & clinical chemistry', type: 'skill' },
            { label: 'Lab safety & infection control', type: 'skill' },
            { label: 'Clinical lab practicum', type: 'experience' },
          ],
        },
        {
          title: 'Certification',
          duration: 'After graduation',
          description: 'Earn a recognized credential to work in most settings.',
          items: [
            { label: 'ASCP or AMT certification', type: 'education' },
            { label: 'Phlebotomy & specimen handling', type: 'skill' },
            { label: 'Microscopy & instrument operation', type: 'skill' },
            { label: 'Quality control & record keeping', type: 'skill' },
          ],
        },
        {
          title: 'Hands-on Experience',
          duration: 'Years 1–3 of work',
          description: 'Practice accurate testing in a fast-paced lab environment.',
          items: [
            { label: 'Entry-level lab technician role', type: 'experience' },
            { label: 'Process patient samples across departments', type: 'experience' },
            { label: 'Operate & maintain lab analyzers', type: 'experience' },
            { label: 'Follow accreditation & safety protocols', type: 'experience' },
          ],
        },
        {
          title: 'Growth & Advancement',
          duration: 'Years 3+',
          description: 'Advance into specialized or supervisory roles.',
          items: [
            { label: 'Specialize (microbiology, blood bank, molecular)', type: 'experience' },
            { label: 'Medical Laboratory Scientist (MLS) upgrade', type: 'education' },
            { label: 'Lab supervisor or section lead', type: 'experience' },
            { label: 'Pursue bachelor’s in MLS for leadership', type: 'education' },
          ],
        },
      ],
    },
  },
  {
    title: 'Civil Engineer',
    description: 'Plan, design, and oversee construction of infrastructure projects like roads, bridges, buildings, and water systems. Ensure projects meet safety and environmental standards.',
    category: 'Engineering',
    requiredSkills: ['Structural Analysis', 'AutoCAD', 'Project Management', 'Surveying', 'Mathematics'],
    educationRequired: "Bachelor's in Civil Engineering",
    averageSalary: '$70,000 - $120,000',
    growthOutlook: 'Stable',
    workEnvironment: 'Field',
    roadmap: {
      summary:
        'Civil engineering shapes the physical world around us. Earn a degree, pass the licensure exams, gain site experience, and advance into project leadership.',
      stages: [
        {
          title: 'Education & Foundation',
          duration: 'Years 1–4',
          description: 'Complete an accredited civil engineering degree.',
          items: [
            { label: "Bachelor's in Civil Engineering (ABET-accredited)", type: 'education' },
            { label: 'Calculus & engineering mathematics', type: 'skill' },
            { label: 'Structural analysis & mechanics', type: 'skill' },
            { label: 'Fluid mechanics & hydraulics', type: 'skill' },
            { label: 'Engineering internships', type: 'experience' },
          ],
        },
        {
          title: 'Core Engineering Skills',
          duration: 'During & after studies',
          description: 'Master the design tools and standards used on the job.',
          items: [
            { label: 'AutoCAD & civil design software', type: 'skill' },
            { label: 'Surveying & site assessment', type: 'skill' },
            { label: 'Building codes & safety standards', type: 'skill' },
            { label: 'Project scheduling & budgeting', type: 'skill' },
            { label: 'FE (Fundamentals of Engineering) exam', type: 'education' },
          ],
        },
        {
          title: 'Hands-on Experience',
          duration: 'Years 1–4 of work',
          description: 'Work on real projects under licensed engineers.',
          items: [
            { label: 'Graduate engineer / junior civil engineer', type: 'experience' },
            { label: 'Work on roads, bridges, or water systems', type: 'experience' },
            { label: 'Site inspection & construction supervision', type: 'experience' },
            { label: 'PE (Professional Engineer) licensure', type: 'education' },
            { label: 'Coordinate with contractors & clients', type: 'skill' },
          ],
        },
        {
          title: 'Growth & Advancement',
          duration: 'Years 4+',
          description: 'Lead larger projects and teams.',
          items: [
            { label: 'Project engineer or site manager', type: 'experience' },
            { label: 'Lead design teams', type: 'experience' },
            { label: 'Specialize (structural, transportation, water)', type: 'experience' },
            { label: 'Master’s in engineering or MBA', type: 'education' },
            { label: 'Senior/principal engineer', type: 'experience' },
          ],
        },
      ],
    },
  },
  {
    title: 'Mechanical Engineer',
    description: 'Design and manufacture mechanical systems and devices. Work across industries including automotive, aerospace, robotics, and manufacturing.',
    category: 'Engineering',
    requiredSkills: ['CAD', 'Thermodynamics', 'Mechanics', 'Material Science', 'Problem Solving'],
    educationRequired: "Bachelor's in Mechanical Engineering",
    averageSalary: '$75,000 - $125,000',
    growthOutlook: 'Stable',
    workEnvironment: 'Office',
    roadmap: {
      summary:
        'Mechanical engineering applies physics to real machines and products. A solid degree, CAD mastery, and hands-on design experience build a versatile career.',
      stages: [
        {
          title: 'Education & Foundation',
          duration: 'Years 1–4',
          description: 'Complete an accredited mechanical engineering degree.',
          items: [
            { label: "Bachelor's in Mechanical Engineering (ABET-accredited)", type: 'education' },
            { label: 'Statics, dynamics & mechanics', type: 'skill' },
            { label: 'Thermodynamics & heat transfer', type: 'skill' },
            { label: 'Materials science & manufacturing', type: 'skill' },
            { label: 'Engineering internships', type: 'experience' },
          ],
        },
        {
          title: 'Core Engineering Skills',
          duration: 'During & after studies',
          description: 'Master design tools and analysis methods.',
          items: [
            { label: 'CAD software (SolidWorks, CATIA, AutoCAD)', type: 'skill' },
            { label: 'Finite element analysis (FEA)', type: 'skill' },
            { label: 'Prototyping & testing', type: 'skill' },
            { label: 'FE (Fundamentals of Engineering) exam', type: 'education' },
            { label: 'Technical drawing & GD&T', type: 'skill' },
          ],
        },
        {
          title: 'Hands-on Experience',
          duration: 'Years 1–4 of work',
          description: 'Design, build, and test products in industry.',
          items: [
            { label: 'Junior mechanical engineer role', type: 'experience' },
            { label: 'Design & test mechanical components', type: 'experience' },
            { label: 'Work with cross-functional product teams', type: 'experience' },
            { label: 'PE licensure (optional but valuable)', type: 'education' },
            { label: 'Root-cause & failure analysis', type: 'skill' },
          ],
        },
        {
          title: 'Growth & Advancement',
          duration: 'Years 4+',
          description: 'Take on design leadership and specialized domains.',
          items: [
            { label: 'Lead design engineer', type: 'experience' },
            { label: 'Specialize (robotics, aerospace, automotive)', type: 'experience' },
            { label: 'Master’s in engineering or MBA', type: 'education' },
            { label: 'Manage engineering teams', type: 'experience' },
            { label: 'Senior/principal mechanical engineer', type: 'experience' },
          ],
        },
      ],
    },
  },
  {
    title: 'Electrical Engineer',
    description: 'Design and develop electrical systems and equipment. Work on power generation, electronics, control systems, and telecommunications.',
    category: 'Engineering',
    requiredSkills: ['Circuit Design', 'Power Systems', 'Electronics', 'MATLAB', 'Troubleshooting'],
    educationRequired: "Bachelor's in Electrical Engineering",
    averageSalary: '$80,000 - $135,000',
    growthOutlook: 'Stable',
    workEnvironment: 'Office',
    roadmap: {
      summary:
        'Electrical engineering powers everything from grids to gadgets. A strong degree, circuit design skills, and hands-on system experience open diverse career paths.',
      stages: [
        {
          title: 'Education & Foundation',
          duration: 'Years 1–4',
          description: 'Complete an accredited electrical engineering degree.',
          items: [
            { label: "Bachelor's in Electrical Engineering (ABET-accredited)", type: 'education' },
            { label: 'Circuit theory & analysis', type: 'skill' },
            { label: 'Electromagnetics & signal processing', type: 'skill' },
            { label: 'Power systems & electronics', type: 'skill' },
            { label: 'Engineering internships', type: 'experience' },
          ],
        },
        {
          title: 'Core Engineering Skills',
          duration: 'During & after studies',
          description: 'Master the tools and standards of electrical design.',
          items: [
            { label: 'Circuit design & simulation (SPICE, MATLAB)', type: 'skill' },
            { label: 'Embedded systems & microcontrollers', type: 'skill' },
            { label: 'Control systems & PLCs', type: 'skill' },
            { label: 'Electrical codes & safety standards', type: 'skill' },
            { label: 'FE (Fundamentals of Engineering) exam', type: 'education' },
          ],
        },
        {
          title: 'Hands-on Experience',
          duration: 'Years 1–4 of work',
          description: 'Work on real electrical systems and products.',
          items: [
            { label: 'Junior electrical engineer role', type: 'experience' },
            { label: 'Design & test electrical systems', type: 'experience' },
            { label: 'Field commissioning & troubleshooting', type: 'experience' },
            { label: 'PE licensure (optional but valuable)', type: 'education' },
            { label: 'Project documentation & compliance', type: 'skill' },
          ],
        },
        {
          title: 'Growth & Advancement',
          duration: 'Years 4+',
          description: 'Specialize and lead engineering efforts.',
          items: [
            { label: 'Lead electrical engineer', type: 'experience' },
            { label: 'Specialize (power, telecom, electronics, controls)', type: 'experience' },
            { label: 'Master’s in engineering or MBA', type: 'education' },
            { label: 'Manage projects & teams', type: 'experience' },
            { label: 'Senior/principal electrical engineer', type: 'experience' },
          ],
        },
      ],
    },
  },
  {
    title: 'Marketing Manager',
    description: 'Develop and execute marketing strategies to promote products and services. Oversee campaigns, market research, and brand positioning.',
    category: 'Business',
    requiredSkills: ['Marketing Strategy', 'Analytics', 'Communication', 'Campaign Management', 'SEO/SEM'],
    educationRequired: "Bachelor's in Marketing or Business",
    averageSalary: '$85,000 - $140,000',
    growthOutlook: 'Growing',
    workEnvironment: 'Office',
    roadmap: {
      summary:
        'Marketing managers blend strategy, creativity, and data. Start with marketing fundamentals, build hands-on campaign experience, then step into leadership.',
      stages: [
        {
          title: 'Education & Foundation',
          duration: 'Years 1–4',
          description: 'Learn core business and marketing principles.',
          items: [
            { label: "Bachelor's in Marketing, Business, or Communications", type: 'education' },
            { label: 'Consumer behavior & market research', type: 'skill' },
            { label: 'Branding & positioning', type: 'skill' },
            { label: 'Business fundamentals & finance', type: 'skill' },
            { label: 'Marketing internships', type: 'experience' },
          ],
        },
        {
          title: 'Core Marketing Skills',
          duration: 'During & after studies',
          description: 'Master the channels and tools modern marketing runs on.',
          items: [
            { label: 'Digital marketing & SEO/SEM', type: 'skill' },
            { label: 'Content & social media strategy', type: 'skill' },
            { label: 'Email & campaign management', type: 'skill' },
            { label: 'Marketing analytics (GA4, dashboards)', type: 'skill' },
            { label: 'Certifications (Google, HubSpot)', type: 'education' },
          ],
        },
        {
          title: 'Hands-on Experience',
          duration: 'Years 1–4 of work',
          description: 'Own campaigns and grow measurable marketing results.',
          items: [
            { label: 'Marketing coordinator or specialist role', type: 'experience' },
            { label: 'Run end-to-end campaigns', type: 'experience' },
            { label: 'Analyze & report on campaign performance', type: 'experience' },
            { label: 'Manage budgets & vendors', type: 'experience' },
            { label: 'Cross-functional collaboration', type: 'skill' },
          ],
        },
        {
          title: 'Growth & Advancement',
          duration: 'Years 4+',
          description: 'Take ownership of marketing strategy and teams.',
          items: [
            { label: 'Marketing Manager / Brand Manager', type: 'experience' },
            { label: 'Lead marketing team strategy', type: 'experience' },
            { label: 'MBA or advanced marketing degree', type: 'education' },
            { label: 'Director of Marketing', type: 'experience' },
            { label: 'Mentor & develop junior marketers', type: 'experience' },
          ],
        },
      ],
    },
  },
  {
    title: 'Graphic Designer',
    description: 'Create visual concepts for brands, marketing materials, and digital media. Use typography, color theory, and design software to communicate ideas.',
    category: 'Arts & Design',
    requiredSkills: ['Adobe Creative Suite', 'Typography', 'Color Theory', 'Layout Design', 'Creativity'],
    educationRequired: "Bachelor's in Graphic Design or related field",
    averageSalary: '$45,000 - $80,000',
    growthOutlook: 'Stable',
    workEnvironment: 'Hybrid',
    roadmap: {
      summary:
        'Graphic design is a portfolio-driven career. Learn design fundamentals and industry tools, build a strong body of work, then turn it into full-time roles.',
      stages: [
        {
          title: 'Education & Foundation',
          duration: 'Years 1–4',
          description: 'Learn the visual principles behind all great design.',
          items: [
            { label: "Bachelor's in Graphic Design or Visual Communication", type: 'education' },
            { label: 'Typography & layout', type: 'skill' },
            { label: 'Color theory & composition', type: 'skill' },
            { label: 'Design history & visual communication', type: 'skill' },
            { label: 'Design bootcamps or courses', type: 'education' },
          ],
        },
        {
          title: 'Core Design Tools',
          duration: 'During & after studies',
          description: 'Master the software designers use every day.',
          items: [
            { label: 'Adobe Creative Suite (Illustrator, Photoshop, InDesign)', type: 'skill' },
            { label: 'Figma & prototyping', type: 'skill' },
            { label: 'Motion & basic web design', type: 'skill' },
            { label: 'Print & production basics', type: 'skill' },
            { label: 'Brand identity systems', type: 'skill' },
          ],
        },
        {
          title: 'Hands-on Experience',
          duration: 'Years 1–3 of work',
          description: 'Build a portfolio that speaks louder than a resume.',
          items: [
            { label: 'Freelance & personal projects', type: 'experience' },
            { label: 'Design internship or agency role', type: 'experience' },
            { label: 'Junior graphic designer role', type: 'experience' },
            { label: 'Portfolio of 5+ published pieces', type: 'experience' },
            { label: 'Client communication & revisions', type: 'skill' },
          ],
        },
        {
          title: 'Growth & Advancement',
          duration: 'Years 3+',
          description: 'Specialize, lead, or move into broader creative roles.',
          items: [
            { label: 'Mid-level → Senior Graphic Designer', type: 'experience' },
            { label: 'Specialize (brand, packaging, UI, motion)', type: 'experience' },
            { label: 'Art director or design lead', type: 'experience' },
            { label: 'Mentor junior designers', type: 'experience' },
          ],
        },
      ],
    },
  },
  {
    title: 'High School Teacher',
    description: 'Educate students in secondary school settings. Develop lesson plans, assess student progress, and create a positive learning environment.',
    category: 'Education',
    requiredSkills: ['Teaching', 'Classroom Management', 'Communication', 'Patience', 'Curriculum Planning'],
    educationRequired: "Bachelor's in Education + Teaching Certification",
    averageSalary: '$45,000 - $75,000',
    growthOutlook: 'Stable',
    workEnvironment: 'Office',
    roadmap: {
      summary:
        'Teaching requires a degree, certification, and classroom practice. Master a subject, learn how students learn, then grow into lead or administrative roles.',
      stages: [
        {
          title: 'Education & Certification',
          duration: 'Years 1–4',
          description: 'Earn a teaching degree and your state certification.',
          items: [
            { label: "Bachelor's in Education or a teaching subject", type: 'education' },
            { label: 'Subject-matter expertise', type: 'skill' },
            { label: 'Educational psychology & pedagogy', type: 'skill' },
            { label: 'State teacher certification / licensure', type: 'education' },
            { label: 'Student-teaching practicum', type: 'experience' },
          ],
        },
        {
          title: 'Core Teaching Skills',
          duration: 'During & after studies',
          description: 'Develop the craft of planning and leading a classroom.',
          items: [
            { label: 'Lesson & curriculum planning', type: 'skill' },
            { label: 'Classroom management', type: 'skill' },
            { label: 'Assessment & grading', type: 'skill' },
            { label: 'Differentiated instruction', type: 'skill' },
            { label: 'Communication with families', type: 'skill' },
          ],
        },
        {
          title: 'Hands-on Experience',
          duration: 'Years 1–3 of work',
          description: 'Get certified and teach in a real school environment.',
          items: [
            { label: 'Alternative or provisional certification programs', type: 'education' },
            { label: 'Full-time teaching role', type: 'experience' },
            { label: 'Lead extracurricular or advisory duties', type: 'experience' },
            { label: 'Professional development workshops', type: 'experience' },
          ],
        },
        {
          title: 'Growth & Advancement',
          duration: 'Years 3+',
          description: 'Deepen expertise or move into school leadership.',
          items: [
            { label: 'Master’s in Education or curriculum specialization', type: 'education' },
            { label: 'National Board Certification', type: 'education' },
            { label: 'Lead teacher or department head', type: 'experience' },
            { label: 'Instructional coach', type: 'experience' },
            { label: 'School administrator (principal pathway)', type: 'experience' },
          ],
        },
      ],
    },
  },
  {
    title: 'Biologist',
    description: 'Study living organisms and their environments. Conduct research in laboratories and field settings to advance scientific knowledge.',
    category: 'Science',
    requiredSkills: ['Research', 'Data Analysis', 'Microscopy', 'Lab Safety', 'Scientific Writing'],
    educationRequired: "Bachelor's or Master's in Biology or related field",
    averageSalary: '$55,000 - $95,000',
    growthOutlook: 'Stable',
    workEnvironment: 'Lab',
    roadmap: {
      summary:
        'Biology careers start with strong lab and research fundamentals. Earn your degree, gain hands-on research experience, and specialize through graduate study.',
      stages: [
        {
          title: 'Education & Foundation',
          duration: 'Years 1–4',
          description: 'Build a strong foundation in the life sciences.',
          items: [
            { label: "Bachelor's in Biology, Biochemistry, or related field", type: 'education' },
            { label: 'Cell & molecular biology', type: 'skill' },
            { label: 'Genetics & evolution', type: 'skill' },
            { label: 'Chemistry & statistics', type: 'skill' },
            { label: 'Undergraduate research labs', type: 'experience' },
          ],
        },
        {
          title: 'Research & Lab Skills',
          duration: 'During & after studies',
          description: 'Master lab techniques and scientific methods.',
          items: [
            { label: 'Microscopy & lab techniques', type: 'skill' },
            { label: 'Experimental design & data analysis', type: 'skill' },
            { label: 'Scientific writing & literature review', type: 'skill' },
            { label: 'Lab safety & protocols', type: 'skill' },
            { label: 'Bioinformatics tools', type: 'skill' },
          ],
        },
        {
          title: 'Hands-on Experience',
          duration: 'Years 1–3 of work',
          description: 'Work in research labs, industry, or field settings.',
          items: [
            { label: 'Research assistant or lab technician', type: 'experience' },
            { label: 'Field studies & data collection', type: 'experience' },
            { label: 'Present at conferences or publish', type: 'experience' },
            { label: 'Apply to graduate programs', type: 'experience' },
          ],
        },
        {
          title: 'Growth & Advancement',
          duration: 'Years 3+',
          description: 'Specialize through graduate study and lead research.',
          items: [
            { label: "Master's or PhD in a biology specialty", type: 'education' },
            { label: 'Senior researcher or lead scientist', type: 'experience' },
            { label: 'Write & secure research grants', type: 'experience' },
            { label: 'Industry R&D roles', type: 'experience' },
            { label: 'Academic teaching & mentorship', type: 'experience' },
          ],
        },
      ],
    },
  },
  {
    title: 'Lawyer',
    description: 'Represent clients in legal matters, advise on legal rights, and prepare legal documents. Argue cases in court and negotiate settlements.',
    category: 'Legal',
    requiredSkills: ['Legal Research', 'Argumentation', 'Negotiation', 'Writing', 'Critical Thinking'],
    educationRequired: 'Juris Doctor (JD) + Bar Exam Pass',
    averageSalary: '$90,000 - $200,000',
    growthOutlook: 'Stable',
    workEnvironment: 'Office',
    roadmap: {
      summary:
        'A legal career demands a bachelor’s degree, law school, and bar passage. Strong research, writing, and advocacy skills carry you through and beyond.',
      stages: [
        {
          title: 'Undergraduate Preparation',
          duration: 'Years 1–4',
          description: 'Build the analytical and writing skills law school requires.',
          items: [
            { label: 'Bachelor’s in any major (politics, English, history, etc.)', type: 'education' },
            { label: 'Critical thinking & analysis', type: 'skill' },
            { label: 'Research & writing skills', type: 'skill' },
            { label: 'Public speaking & debate', type: 'skill' },
            { label: 'LSAT preparation', type: 'skill' },
          ],
        },
        {
          title: 'Law School',
          duration: 'Years 5–8',
          description: 'Earn a Juris Doctor and build legal expertise.',
          items: [
            { label: 'Juris Doctor (JD) degree', type: 'education' },
            { label: 'Contracts, torts, & constitutional law', type: 'skill' },
            { label: 'Legal research & writing', type: 'skill' },
            { label: 'Moot court & clinics', type: 'experience' },
            { label: 'Summer associate & externships', type: 'experience' },
          ],
        },
        {
          title: 'Bar Passage & Entry',
          duration: 'Years 8–9',
          description: 'Pass the bar and start practicing.',
          items: [
            { label: 'Bar examination (state-specific)', type: 'education' },
            { label: 'Character & fitness review', type: 'education' },
            { label: 'Associate attorney at a firm or organization', type: 'experience' },
            { label: 'Judicial clerkship (optional)', type: 'experience' },
            { label: 'Negotiation & client counsel', type: 'skill' },
          ],
        },
        {
          title: 'Growth & Advancement',
          duration: 'Years 3+',
          description: 'Specialize and build a reputation in your field.',
          items: [
            { label: 'Specialize (corporate, criminal, family, IP)', type: 'experience' },
            { label: 'LLM or advanced legal education', type: 'education' },
            { label: 'Senior associate or partner track', type: 'experience' },
            { label: 'In-house counsel or government roles', type: 'experience' },
            { label: 'Mentor junior associates', type: 'experience' },
          ],
        },
      ],
    },
  },
  {
    title: 'Financial Analyst',
    description: 'Analyze financial data, prepare reports, and provide investment recommendations. Evaluate economic trends and company performance.',
    category: 'Finance',
    requiredSkills: ['Financial Modeling', 'Excel', 'Data Analysis', 'Valuation', 'Risk Assessment'],
    educationRequired: "Bachelor's in Finance, Economics, or related field",
    averageSalary: '$65,000 - $110,000',
    growthOutlook: 'Growing',
    workEnvironment: 'Office',
    roadmap: {
      summary:
        'Financial analysis turns data into decisions. Build quantitative and modeling skills, earn key certifications, and progress from analyst to senior leadership.',
      stages: [
        {
          title: 'Education & Foundation',
          duration: 'Years 1–4',
          description: 'Learn the fundamentals of finance and markets.',
          items: [
            { label: "Bachelor's in Finance, Economics, or Accounting", type: 'education' },
            { label: 'Financial accounting principles', type: 'skill' },
            { label: 'Corporate finance & markets', type: 'skill' },
            { label: 'Statistics & econometrics', type: 'skill' },
            { label: 'Finance internships', type: 'experience' },
          ],
        },
        {
          title: 'Core Analyst Skills',
          duration: 'During & after studies',
          description: 'Master the tools of the analyst trade.',
          items: [
            { label: 'Financial modeling & valuation', type: 'skill' },
            { label: 'Advanced Excel & data tools', type: 'skill' },
            { label: 'Financial statement analysis', type: 'skill' },
            { label: 'Risk assessment & forecasting', type: 'skill' },
            { label: 'CFA Level 1 (start credential path)', type: 'education' },
          ],
        },
        {
          title: 'Hands-on Experience',
          duration: 'Years 1–3 of work',
          description: 'Analyze real companies and markets in a professional role.',
          items: [
            { label: 'Financial analyst role', type: 'experience' },
            { label: 'Build models & valuation reports', type: 'experience' },
            { label: 'Support investment decisions', type: 'experience' },
            { label: 'Present findings to stakeholders', type: 'experience' },
          ],
        },
        {
          title: 'Growth & Advancement',
          duration: 'Years 3+',
          description: 'Deepen expertise and move into senior roles.',
          items: [
            { label: 'CFA charter (complete levels)', type: 'education' },
            { label: 'Senior financial analyst', type: 'experience' },
            { label: 'MBA or specialized finance degree', type: 'education' },
            { label: 'Lead analyst or manager', type: 'experience' },
            { label: 'Move into portfolio or FP&A leadership', type: 'experience' },
          ],
        },
      ],
    },
  },
  {
    title: 'Accountant',
    description: 'Prepare and examine financial records. Ensure accuracy of financial statements, compute taxes, and advise on financial compliance.',
    category: 'Finance',
    requiredSkills: ['Accounting', 'Tax Knowledge', 'Attention to Detail', 'QuickBooks', 'Financial Reporting'],
    educationRequired: "Bachelor's in Accounting (CPA preferred)",
    averageSalary: '$55,000 - $95,000',
    growthOutlook: 'Stable',
    workEnvironment: 'Office',
    roadmap: {
      summary:
        'Accounting rewards precision and trust. Earn an accounting degree, gain experience preparing and auditing records, and earn the CPA for the biggest opportunities.',
      stages: [
        {
          title: 'Education & Foundation',
          duration: 'Years 1–4',
          description: 'Learn core accounting and business principles.',
          items: [
            { label: "Bachelor's in Accounting", type: 'education' },
            { label: 'Financial & managerial accounting', type: 'skill' },
            { label: 'Auditing fundamentals', type: 'skill' },
            { label: 'Taxation basics', type: 'skill' },
            { label: 'Accounting internships', type: 'experience' },
          ],
        },
        {
          title: 'Core Accounting Skills',
          duration: 'During & after studies',
          description: 'Master the systems and standards accountants rely on.',
          items: [
            { label: 'Accounting software (QuickBooks, ERP systems)', type: 'skill' },
            { label: 'Financial reporting & statements', type: 'skill' },
            { label: 'Attention to detail & reconciliation', type: 'skill' },
            { label: 'Ethics & compliance standards', type: 'skill' },
            { label: 'Meet CPA education requirements', type: 'education' },
          ],
        },
        {
          title: 'Hands-on Experience',
          duration: 'Years 1–3 of work',
          description: 'Prepare records and grow into full-cycle accounting.',
          items: [
            { label: 'Staff accountant role', type: 'experience' },
            { label: 'Prepare journal entries & reconciliations', type: 'experience' },
            { label: 'Support audits & tax filings', type: 'experience' },
            { label: 'Pass the CPA exam (150 credits)', type: 'education' },
            { label: 'Financial close process ownership', type: 'experience' },
          ],
        },
        {
          title: 'Growth & Advancement',
          duration: 'Years 3+',
          description: 'Take on supervisory and strategic financial roles.',
          items: [
            { label: 'Senior accountant', type: 'experience' },
            { label: 'CPA license in practice', type: 'education' },
            { label: 'Accounting manager or controller', type: 'experience' },
            { label: 'Specialize (tax, audit, forensic)', type: 'experience' },
            { label: 'CPA firm partner or CFO track', type: 'experience' },
          ],
        },
      ],
    },
  },
  {
    title: 'Digital Marketer',
    description: 'Plan and execute online marketing campaigns across social media, email, and search engines. Drive traffic, engagement, and conversions.',
    category: 'Marketing',
    requiredSkills: ['Social Media', 'Content Creation', 'SEO', 'Analytics', 'Email Marketing'],
    educationRequired: "Bachelor's in Marketing or related field",
    averageSalary: '$55,000 - $95,000',
    growthOutlook: 'Fast Growing',
    workEnvironment: 'Remote',
    roadmap: {
      summary:
        'Digital marketing moves fast and rewards hands-on experimentation. Learn the channels, get certified, build real campaign experience, and grow into strategy roles.',
      stages: [
        {
          title: 'Education & Foundation',
          duration: 'Years 1–4',
          description: 'Learn marketing principles and digital channel basics.',
          items: [
            { label: "Bachelor's in Marketing, Communications, or related field", type: 'education' },
            { label: 'Marketing fundamentals & consumer behavior', type: 'skill' },
            { label: 'Writing & content creation', type: 'skill' },
            { label: 'Social media platform fluency', type: 'skill' },
            { label: 'Digital marketing internships', type: 'experience' },
          ],
        },
        {
          title: 'Core Digital Skills',
          duration: 'During & after studies',
          description: 'Master the channels and analytics that drive results.',
          items: [
            { label: 'SEO & content strategy', type: 'skill' },
            { label: 'Paid ads (Google, Meta)', type: 'skill' },
            { label: 'Email marketing & automation', type: 'skill' },
            { label: 'Analytics & reporting (GA4)', type: 'skill' },
            { label: 'Certifications (Google, HubSpot, Meta)', type: 'education' },
          ],
        },
        {
          title: 'Hands-on Experience',
          duration: 'Years 1–3 of work',
          description: 'Run campaigns and learn from real performance data.',
          items: [
            { label: 'Digital marketing coordinator or specialist', type: 'experience' },
            { label: 'Manage social & email channels', type: 'experience' },
            { label: 'Run paid & SEO campaigns', type: 'experience' },
            { label: 'Build a personal brand or side projects', type: 'experience' },
            { label: 'A/B testing & optimization', type: 'skill' },
          ],
        },
        {
          title: 'Growth & Advancement',
          duration: 'Years 3+',
          description: 'Lead campaigns and marketing strategy.',
          items: [
            { label: 'Digital marketing manager', type: 'experience' },
            { label: 'Own channel or campaign strategy', type: 'experience' },
            { label: 'Lead & mentor specialists', type: 'experience' },
            { label: 'Growth marketing or performance lead', type: 'experience' },
            { label: 'MBA or advanced marketing studies', type: 'education' },
          ],
        },
      ],
    },
  },
  {
    title: 'Cybersecurity Analyst',
    description: 'Protect organizational networks and systems from cyber threats. Monitor for breaches, conduct risk assessments, and implement security measures.',
    category: 'Technology',
    requiredSkills: ['Network Security', 'Penetration Testing', 'Risk Analysis', 'Firewalls', 'Incident Response'],
    educationRequired: "Bachelor's in Cybersecurity or related field",
    averageSalary: '$90,000 - $145,000',
    growthOutlook: 'Fast Growing',
    workEnvironment: 'Office',
    roadmap: {
      summary:
        'Cybersecurity defends systems against constant threats. Build networking and security fundamentals, earn certifications, and gain hands-on defense experience.',
      stages: [
        {
          title: 'Education & Foundation',
          duration: 'Years 1–4',
          description: 'Learn networking and security fundamentals.',
          items: [
            { label: "Bachelor's in Cybersecurity, IT, or Computer Science", type: 'education' },
            { label: 'Networking (TCP/IP, DNS, protocols)', type: 'skill' },
            { label: 'Operating systems & administration', type: 'skill' },
            { label: 'Linux fundamentals', type: 'skill' },
            { label: 'IT or security internships', type: 'experience' },
          ],
        },
        {
          title: 'Core Security Skills',
          duration: 'During & after studies',
          description: 'Master defense, analysis, and foundational certifications.',
          items: [
            { label: 'Network security & firewalls', type: 'skill' },
            { label: 'Risk analysis & assessment', type: 'skill' },
            { label: 'Incident response & monitoring', type: 'skill' },
            { label: 'CompTIA Security+ certification', type: 'education' },
            { label: 'Security tools (SIEM, IDS/IPS)', type: 'skill' },
          ],
        },
        {
          title: 'Hands-on Experience',
          duration: 'Years 1–3 of work',
          description: 'Defend real networks and respond to threats.',
          items: [
            { label: 'Security analyst / SOC analyst role', type: 'experience' },
            { label: 'Monitor & triage security alerts', type: 'experience' },
            { label: 'Run vulnerability assessments', type: 'experience' },
            { label: 'Participate in incident response', type: 'experience' },
            { label: 'Capture-the-flag & home lab practice', type: 'experience' },
          ],
        },
        {
          title: 'Growth & Advancement',
          duration: 'Years 3+',
          description: 'Specialize and move into senior security roles.',
          items: [
            { label: 'Penetration testing or offensive security', type: 'experience' },
            { label: 'Advanced certs (CISSP, CEH, OSCP)', type: 'education' },
            { label: 'Security engineer or architect', type: 'experience' },
            { label: 'Lead incident response teams', type: 'experience' },
            { label: 'Security leadership (CISO track)', type: 'experience' },
          ],
        },
      ],
    },
  },
  {
    title: 'Product Manager',
    description: 'Define product vision and strategy. Collaborate with engineering, design, and business teams to build products that customers love.',
    category: 'Business',
    requiredSkills: ['Product Strategy', 'Roadmapping', 'User Research', 'Cross-functional Leadership', 'Agile'],
    educationRequired: "Bachelor's in Business or related field (MBA preferred)",
    averageSalary: '$100,000 - $160,000',
    growthOutlook: 'Growing',
    workEnvironment: 'Hybrid',
    roadmap: {
      summary:
        'Product management sits at the intersection of business, design, and engineering. Build cross-functional experience, learn product craft, and grow into ownership.',
      stages: [
        {
          title: 'Education & Foundation',
          duration: 'Years 1–4',
          description: 'Learn business fundamentals and how products get built.',
          items: [
            { label: "Bachelor's in Business, CS, Design, or related field", type: 'education' },
            { label: 'Business & market analysis', type: 'skill' },
            { label: 'User research & empathy', type: 'skill' },
            { label: 'Basics of engineering & design', type: 'skill' },
            { label: 'Internships in product-adjacent roles', type: 'experience' },
          ],
        },
        {
          title: 'Core Product Skills',
          duration: 'During & after studies',
          description: 'Master the frameworks product managers use daily.',
          items: [
            { label: 'Product strategy & roadmapping', type: 'skill' },
            { label: 'Agile & scrum practices', type: 'skill' },
            { label: 'Metrics & data-driven decisions', type: 'skill' },
            { label: 'Stakeholder & communication skills', type: 'skill' },
            { label: 'Product certifications or bootcamps', type: 'education' },
          ],
        },
        {
          title: 'Hands-on Experience',
          duration: 'Years 1–4 of work',
          description: 'Grow through product-adjacent roles into full PM ownership.',
          items: [
            { label: 'Business analyst, associate PM, or PM intern', type: 'experience' },
            { label: 'Product analyst or program coordinator', type: 'experience' },
            { label: 'Own a product or feature area', type: 'experience' },
            { label: 'Ship features end-to-end', type: 'experience' },
            { label: 'Lead discovery & user interviews', type: 'experience' },
          ],
        },
        {
          title: 'Growth & Advancement',
          duration: 'Years 4+',
          description: 'Own larger products and lead product strategy.',
          items: [
            { label: 'Product Manager → Senior PM', type: 'experience' },
            { label: 'MBA (optional but valuable)', type: 'education' },
            { label: 'Group / Director of Product', type: 'experience' },
            { label: 'Mentor junior PMs', type: 'experience' },
            { label: 'Lead product vision for a business line', type: 'experience' },
          ],
        },
      ],
    },
  },
  {
    title: 'Content Writer',
    description: 'Create engaging written content for websites, blogs, social media, and marketing materials. Research topics and adapt tone to target audiences.',
    category: 'Marketing',
    requiredSkills: ['Writing', 'Research', 'SEO', 'Editing', 'Creativity'],
    educationRequired: "Bachelor's in English, Journalism, or related field",
    averageSalary: '$40,000 - $75,000',
    growthOutlook: 'Stable',
    workEnvironment: 'Remote',
    roadmap: {
      summary:
        'Content writing is built on a portfolio of clear, useful words. Sharpen your writing and research, learn SEO, and build a body of published work.',
      stages: [
        {
          title: 'Education & Foundation',
          duration: 'Years 1–4',
          description: 'Develop strong writing, research, and editing fundamentals.',
          items: [
            { label: "Bachelor's in English, Journalism, Communications, or related field", type: 'education' },
            { label: 'Writing across formats & tones', type: 'skill' },
            { label: 'Research & fact-checking', type: 'skill' },
            { label: 'Editing & proofreading', type: 'skill' },
            { label: 'Campus media or internships', type: 'experience' },
          ],
        },
        {
          title: 'Core Writing & SEO Skills',
          duration: 'During & after studies',
          description: 'Learn the craft of writing content people actually read.',
          items: [
            { label: 'SEO & keyword research', type: 'skill' },
            { label: 'Blog, web, and social writing', type: 'skill' },
            { label: 'Content strategy basics', type: 'skill' },
            { label: 'CMS platforms (WordPress, etc.)', type: 'skill' },
            { label: 'Writing courses & workshops', type: 'education' },
          ],
        },
        {
          title: 'Hands-on Experience',
          duration: 'Years 1–3 of work',
          description: 'Publish widely and build a professional portfolio.',
          items: [
            { label: 'Freelance writing & guest posts', type: 'experience' },
            { label: 'Start a blog or newsletter', type: 'experience' },
            { label: 'Content writer / copywriter role', type: 'experience' },
            { label: 'Portfolio of published samples', type: 'experience' },
            { label: 'Work with editorial calendars & briefs', type: 'experience' },
          ],
        },
        {
          title: 'Growth & Advancement',
          duration: 'Years 3+',
          description: 'Specialize or move into content leadership.',
          items: [
            { label: 'Senior content writer or editor', type: 'experience' },
            { label: 'Specialize (tech, finance, SEO, B2B)', type: 'experience' },
            { label: 'Content strategist or manager', type: 'experience' },
            { label: 'Lead editorial teams', type: 'experience' },
            { label: 'Develop content teams & voice', type: 'experience' },
          ],
        },
      ],
    },
  },
];

async function seed() {
  try {
    const uri = process.env.MONGODB_URI;
    if (!uri) {
      console.error('MONGODB_URI not found in .env');
      process.exit(1);
    }

    await mongoose.connect(uri);
    console.log('Connected to MongoDB');

    await Career.deleteMany({});
    console.log('Cleared existing careers');

    const inserted = await Career.insertMany(careers);
    console.log(`Seeded ${inserted.length} careers`);

    await mongoose.disconnect();
    console.log('Done - disconnected');
    process.exit(0);
  } catch (err) {
    console.error('Seed failed:', err);
    process.exit(1);
  }
}

seed();
