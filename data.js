/* ============================================================
   data.js
   ------------------------------------------------------------
   THIS IS THE ONLY FILE YOU NEED TO EDIT.

   Everything you see on the website comes from this file.
   Change the text between the quotes " " and save the file,
   then refresh your browser to see the change.

   RULES (very important for beginners):
   1. Keep the quotes " " around text.
   2. Keep the commas , at the end of each line.
   3. Do not delete the { } or [ ] brackets.
   4. If the site goes blank, you probably deleted a comma,
      a quote or a bracket. Undo with Ctrl + Z.
   ============================================================ */

const portfolioData = {

  /* ---------- 1. BASIC DETAILS (used in nav, hero, footer) ---------- */
  profile: {
    name: "Deepak Kumar",
    shortName: "Deepak",                 // used by the logo in the navbar
    title: "B.Tech Electrical & Electronics Engineering Student",
    tagline: "IoT | Embedded Systems | Solar Energy | Electrical & Automation",
    intro: "Final-stage B.Tech EEE student at Cambridge Institute of Technology, Ranchi, building hands-on projects around IoT, embedded systems and solar energy. Looking for an internship or placement where I can work on real electrical and automation systems.",
    photo: "images/profile.jpg",         // put your photo in the images folder
    photoAlt: "Portrait of Deepak Kumar",
    available: "Open to internships and 2027 placements"   // small badge in hero; set to "" to hide
  },

  /* ---------- 2. ABOUT SECTION ---------- */
  about: {
    heading: "About me",
    // Each string below becomes one paragraph.
    paragraphs: [
      "I am studying Electrical & Electronics Engineering at Cambridge Institute of Technology, Ranchi. My core interest is in electrical systems and the electronics that control them — power, measurement, protection and the small microcontrollers that tie everything together.",
      "Outside the syllabus I spend my time building with ESP32 and Arduino, writing C and Embedded C, and testing circuits in Tinkercad before putting them on a breadboard. I have completed an IoT training programme at Tool Room Ranchi and a Solar PV training programme at Tata Power Skill Development Institute.",
      "I am looking for an internship or placement in electrical, embedded, IoT or renewable energy roles where I can learn from working engineers and contribute from day one."
    ],
    // Small facts shown beside the text. Edit, add or remove freely.
    highlights: [
      { label: "Branch", value: "Electrical & Electronics Engineering" },
      { label: "College", value: "Cambridge Institute of Technology, Ranchi" },
      { label: "Graduating", value: "2027" },
      { label: "Based in", value: "Ranchi, Jharkhand, India" }
    ]
  },

  /* ---------- 3. SKILLS ---------- */
  /* Grouped into categories. Add a new { } block to add a new card. */
  skills: [
    {
      category: "Electrical Engineering",
      note: "Core branch subjects and lab work",
      items: ["Electrical Machines", "Power Systems", "Circuit Analysis", "Measurement & Instrumentation"]
    },
    {
      category: "IoT & Embedded Systems",
      note: "Hardware I build and program with",
      items: ["IoT", "ESP32", "Arduino", "Embedded Systems", "Sensors & Modules"]
    },
    {
      category: "Programming",
      note: "Languages I write my project code in",
      items: ["C", "Embedded C"]
    },
    {
      category: "Solar & Renewable Energy",
      note: "From TPSDI training and self-study",
      items: ["Solar PV Systems", "PV Module Basics", "System Sizing"]
    },
    {
      category: "Tools & Software",
      note: "Simulation, design and version control",
      items: ["MATLAB", "Tinkercad", "GitHub"]
    }
  ],

  /* ---------- 4. PROJECTS ---------- */
  /* Set "github" or "demo" to "" (empty) to hide that button. */
  projects: [
    {
      title: "Smart Electrical Monitoring System",
      image: "images/project1.jpg",
      description: "A microcontroller-based system that measures electrical parameters of a load and displays them live, so faults and abnormal usage can be spotted early.",
      tech: ["ESP32", "Current Sensor", "Voltage Sensor", "Embedded C"],
      features: [
        "Live voltage and current measurement",
        "Readings displayed on a connected dashboard",
        "Alerts when values cross a set limit"
      ],
      github: "https://github.com/your-username/smart-electrical-monitoring",
      demo: ""
    },
    {
      title: "Solar PV Monitoring System",
      image: "images/project2.jpg",
      description: "A monitoring setup for a small solar PV installation that tracks panel output through the day and helps identify drops in generation.",
      tech: ["Solar PV", "ESP32", "Sensors", "Embedded C"],
      features: [
        "Panel voltage and current logging",
        "Daily generation overview",
        "Low-output warning for dust or shading"
      ],
      github: "https://github.com/your-username/solar-pv-monitoring",
      demo: ""
    },
    {
      title: "IoT-Based Monitoring System",
      image: "images/project3.jpg",
      description: "An IoT project that reads sensor data from a device and sends it over Wi-Fi so the readings can be checked remotely from a phone or laptop.",
      tech: ["IoT", "ESP32", "Wi-Fi", "Arduino", "C"],
      features: [
        "Wireless sensor data transfer",
        "Remote monitoring from any browser",
        "Low-cost hardware, easy to reproduce"
      ],
      github: "https://github.com/your-username/iot-monitoring-system",
      demo: ""
    }
  ],

  /* ---------- 5. TRAINING / INTERNSHIP ---------- */
  training: [
    {
      program: "IoT Training Programme",
      organization: "Tool Room Ranchi",
      duration: "2025",
      location: "Ranchi, Jharkhand",
      points: [
        "Hands-on training on IoT fundamentals and microcontroller interfacing",
        "Worked with sensors, modules and Wi-Fi based data transfer",
        "Built and tested small IoT circuits during the programme"
      ]
    },
    {
      program: "Solar PV Training Programme",
      organization: "Tata Power Skill Development Institute (TPSDI)",
      duration: "2025",
      location: "Jharkhand",
      points: [
        "Training on solar photovoltaic system fundamentals",
        "Covered PV modules, system components and installation practices",
        "Learned basic system sizing and safety procedures"
      ]
    }
  ],

  /* ---------- 6. CERTIFICATES ---------- */
  certificates: [
    {
      name: "IoT Training Certificate",
      organization: "Tool Room Ranchi",
      date: "2025",
      image: "images/certificate1.jpg",
      link: "images/certificate1.jpg"    // opens the full certificate image
    },
    {
      name: "Solar PV Training Certificate",
      organization: "Tata Power Skill Development Institute (TPSDI)",
      date: "2025",
      image: "images/certificate2.jpg",
      link: "images/certificate2.jpg"
    }
  ],

  /* ---------- 7. EDUCATION ---------- */
  education: {
    collegeLogo: "images/college-logo.png",
    degree: "B.Tech in Electrical & Electronics Engineering",
    institute: "Cambridge Institute of Technology, Ranchi",
    years: "2023 – 2027",
    graduationYear: "2027",
    scoreLabel: "Latest SGPA",
    score: "7.27",
    // Earlier education. Add or remove { } blocks as needed.
    earlier: [
      { level: "Class 12 (Intermediate)", board: "", year: "", score: "85.8%" },
      { level: "Class 10 (Matriculation)", board: "", year: "", score: "46.8%" }
    ]
  },

  /* ---------- 8. ACHIEVEMENTS ---------- */
  /* Leave the list empty like this:  achievements: [],  to hide the section. */
  achievements: [
    "Completed IoT training at Tool Room Ranchi",
    "Completed Solar PV training at Tata Power Skill Development Institute",
    "Built three independent hardware projects in IoT and solar monitoring"
  ],

  /* ---------- 9. RESUME ---------- */
  resume: {
    description: "My one-page resume covers my education, technical skills, projects and training in a format built for quick screening.",
    file: "resume.pdf",                  // keep this file in the main folder
    updated: "Updated September 2026"
  },

  /* ---------- 10. CONTACT ---------- */
  contact: {
    email: "deepakrajj35@gmail.com",
    phone: "+91 72501 17850",
    location: "Ranchi, Jharkhand, India",
    linkedin: "https://www.linkedin.com/in/deepak-kumar-750784382/",
    github: "https://github.com/deepakkumar104",
    note: "The quickest way to reach me is email. I usually reply within a day."
  },

  /* ---------- 11. FOOTER ---------- */
  footer: {
    year: "2026",
    line: "B.Tech EEE | IoT | Embedded Systems | Solar Energy"
  }
};
