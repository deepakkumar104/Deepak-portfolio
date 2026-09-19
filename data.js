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
    shortName: "Deepak",                 // used by the logo mark
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
  /* Grouped into categories. "icon" is a single emoji shown on the card. */
  skills: [
    {
      icon: "⚡",
      category: "Electrical Engineering",
      note: "Core branch subjects and lab work",
      items: ["Electrical Machines", "Power Systems", "Circuit Analysis", "Measurement & Instrumentation"]
    },
    {
      icon: "📡",
      category: "IoT & Embedded Systems",
      note: "Hardware I build and program with",
      items: ["IoT", "ESP32", "Arduino", "Embedded Systems", "Sensors & Modules"]
    },
    {
      icon: "💻",
      category: "Programming",
      note: "Languages I write my project code in",
      items: ["C", "Embedded C"]
    },
    {
      icon: "🛠️",
      category: "Design & Tools",
      note: "Simulation, design and version control",
      items: ["MATLAB", "Tinkercad", "GitHub"]
    },
    {
      icon: "☀️",
      category: "Solar & Renewable Energy",
      note: "From TPSDI training and self-study",
      items: ["Solar PV Systems", "PV Module Basics", "System Sizing"]
    }
  ],

  /* ---------- 4. PROJECTS ---------- */
  /* Shown first as a compact icon + name card. Tapping a card opens a
     popup with everything below. Set "github" or "demo" to "" to hide
     that button in the popup. */
  projects: [
    {
      icon: "⚡",
      title: "Smart Electrical Monitoring System",
      image: "images/project1.jpg",
      description: "A microcontroller-based system that measures electrical parameters of a load and displays them live, so faults and abnormal usage can be spotted early.",
      objective: "To build a low-cost monitoring unit that continuously tracks voltage and current of a connected load, and warns when readings go outside a safe range.",
      components: ["ESP32 development board", "Voltage sensor module", "Current sensor (ACS712)", "OLED/dashboard display", "Jumper wires & breadboard"],
      tech: ["ESP32", "Current Sensor", "Voltage Sensor", "Embedded C"],
      features: [
        "Live voltage and current measurement",
        "Readings displayed on a connected dashboard",
        "Alerts when values cross a set limit"
      ],
      working: "The sensors continuously sample voltage and current from the load. The ESP32 reads these analog values, converts them to real units in firmware, and pushes the readings to a live dashboard. If a reading crosses a pre-set threshold, the system raises an on-screen alert.",
      contribution: "Designed the sensor interfacing circuit, wrote the embedded C firmware for sampling and calibration, and built the alert logic and dashboard view.",
      github: "https://github.com/your-username/smart-electrical-monitoring",
      demo: ""
    },
    {
      icon: "☀️",
      title: "Solar PV Monitoring System",
      image: "images/project2.jpg",
      description: "A monitoring setup for a small solar PV installation that tracks panel output through the day and helps identify drops in generation.",
      objective: "To track the real-time output of a small solar PV panel and flag drops in generation caused by dust, shading or faults.",
      components: ["Solar PV panel", "ESP32 development board", "Voltage & current sensors", "Wi-Fi connection for logging"],
      tech: ["Solar PV", "ESP32", "Sensors", "Embedded C"],
      features: [
        "Panel voltage and current logging",
        "Daily generation overview",
        "Low-output warning for dust or shading"
      ],
      working: "Voltage and current sensors sit between the panel and the load, feeding readings to the ESP32 at fixed intervals. The firmware logs these values through the day and compares them against expected output for that time of day, flagging a low-output warning when generation drops unexpectedly.",
      contribution: "Set up the panel-side sensor wiring, wrote the logging and threshold-comparison firmware, and put together the daily generation overview.",
      github: "https://github.com/your-username/solar-pv-monitoring",
      demo: ""
    },
    {
      icon: "📡",
      title: "IoT-Based Monitoring System",
      image: "images/project3.jpg",
      description: "An IoT project that reads sensor data from a device and sends it over Wi-Fi so the readings can be checked remotely from a phone or laptop.",
      objective: "To make sensor readings from a physical device accessible remotely, without needing to be physically near the hardware.",
      components: ["ESP32 (Wi-Fi enabled)", "Sensor module", "Arduino", "Home Wi-Fi network"],
      tech: ["IoT", "ESP32", "Wi-Fi", "Arduino", "C"],
      features: [
        "Wireless sensor data transfer",
        "Remote monitoring from any browser",
        "Low-cost hardware, easy to reproduce"
      ],
      working: "The sensor module collects readings, which the ESP32 packages and sends over the home Wi-Fi network. A simple browser-based view on any phone or laptop on the same network polls and displays the latest readings, so the device can be checked without being physically present.",
      contribution: "Wired and programmed the sensor-to-ESP32 interface, implemented the Wi-Fi data transfer, and built the remote browser view.",
      github: "https://github.com/your-username/iot-monitoring-system",
      demo: ""
    }
  ],

  /* ---------- 5. TRAINING / INTERNSHIP ---------- */
  /* Same pattern as projects: compact icon + title card, full detail in a popup. */
  training: [
    {
      icon: "📡",
      program: "IoT Training Programme",
      organization: "Tool Room Ranchi",
      duration: "2025",
      location: "Ranchi, Jharkhand",
      work: "Attended hands-on sessions on IoT fundamentals and microcontroller interfacing, working directly with sensors, modules and Wi-Fi based data transfer.",
      skillsLearned: ["IoT fundamentals", "Microcontroller interfacing", "Sensor & module wiring", "Wi-Fi based data transfer"],
      projectDetails: "Built and tested small IoT circuits during the programme, including sensor read-out and wireless data transfer between a microcontroller and a display/dashboard.",
      technologies: ["ESP32", "Sensors", "Wi-Fi modules", "Embedded C"],
      points: [
        "Hands-on training on IoT fundamentals and microcontroller interfacing",
        "Worked with sensors, modules and Wi-Fi based data transfer",
        "Built and tested small IoT circuits during the programme"
      ],
      certificate: "images/certificate1.jpg"
    },
    {
      icon: "☀️",
      program: "Solar PV Training Programme",
      organization: "Tata Power Skill Development Institute (TPSDI)",
      duration: "2025",
      location: "Jharkhand",
      work: "Completed structured training on solar photovoltaic system fundamentals, covering PV modules, system components and installation practices.",
      skillsLearned: ["PV module basics", "System component selection", "Basic system sizing", "Installation safety procedures"],
      projectDetails: "Worked through practical exercises on sizing a small PV system and identifying correct components for a given load requirement.",
      technologies: ["Solar PV modules", "Charge controllers", "System sizing basics"],
      points: [
        "Training on solar photovoltaic system fundamentals",
        "Covered PV modules, system components and installation practices",
        "Learned basic system sizing and safety procedures"
      ],
      certificate: "images/certificate2.jpg"
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
    degree: "B.Tech in Electrical & Electronics Engineering",
    institute: "Cambridge Institute of Technology, Ranchi",
    years: "2023 – 2027",
    status: "Ongoing",
    scoreLabel: "Latest SGPA",
    score: "7.27",
    // Earlier education, most recent first. Add or remove { } blocks as needed.
    earlier: [
      { level: "12th (Intermediate)", board: "Jharkhand Board", year: "2023", score: "84%" },
      { level: "10th (Matriculation)", board: "CBSE", year: "2021", score: "49%" }
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
  /* Shown as icons only, in two places: beside the hero photo, and in
     the Contact section footer. "location" opens a map search link. */
  contact: {
    email: "deepak@example.com",
    phone: "+91 00000 00000",
    location: "Ranchi, Jharkhand, India",
    linkedin: "https://www.linkedin.com/in/your-linkedin-id",
    github: "https://github.com/your-username",
    note: "The quickest way to reach me is email. I usually reply within a day."
  },

  /* ---------- 11. FOOTER ---------- */
  footer: {
    year: "2026",
    line: "B.Tech EEE | IoT | Embedded Systems | Solar Energy"
  }
};
