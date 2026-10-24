export const portfolioConfig = {
  name: "Indar Kumar",
  role: "Computer Science Engineering & Data Science Student | Developer | AI & Technology Enthusiast",
  location: "India",
  email: "indarkumarservi@gmail.com",
  
  hero: {
    headline: "Building Intelligent Digital Systems.",
    subheadline: "Computer Science Engineering & Data Science student focused on software development, artificial intelligence, data, and emerging technologies.",
    displayName: "INDAR KUMAR",
    displayRoles: [
      "Computer Science Engineering",
      "Data Science",
      "Developer"
    ],
    ctaButtons: [
      { label: "Explore My Work", href: "#projects", variant: "primary" },
      { label: "View GitHub", href: "#github", variant: "secondary" },
      { label: "Contact Me", href: "#contact", variant: "outline" }
    ]
  },

  about: {
    title: "About Me",
    description: "I am a Computer Science Engineering and Data Science student with a strong interest in software development, artificial intelligence, data science, business, and emerging technologies.",
    philosophy: "I enjoy building practical systems that solve real-world problems rather than creating only theoretical projects.",
    interests: [
      "Artificial Intelligence",
      "Data Science",
      "Software Development",
      "Cybersecurity",
      "Computer Vision",
      "Automation",
      "Blockchain",
      "Business & Technology"
    ]
  },

  skills: {
    title: "Skills",
    categories: [
      {
        name: "Programming",
        items: [
          { name: "Python", level: "Projects" },
          { name: "Java", level: "Projects" },
          { name: "C", level: "Working Knowledge" },
          { name: "C++", level: "Learning" },
          { name: "JavaScript", level: "Projects" },
          { name: "TypeScript", level: "Projects" }
        ]
      },
      {
        name: "Data Science",
        items: [
          { name: "Python", level: "Projects" },
          { name: "Pandas", level: "Projects" },
          { name: "NumPy", level: "Projects" },
          { name: "Data Analysis", level: "Projects" },
          { name: "Data Visualization", level: "Projects" },
          { name: "Machine Learning", level: "Working Knowledge" }
        ]
      },
      {
        name: "AI",
        items: [
          { name: "Generative AI", level: "Exploring" },
          { name: "AI Agents", level: "Projects" },
          { name: "Computer Vision", level: "Working Knowledge" },
          { name: "Natural Language Processing", level: "Learning" },
          { name: "Automation", level: "Projects" }
        ]
      },
      {
        name: "Development",
        items: [
          { name: "React", level: "Projects" },
          { name: "HTML", level: "Projects" },
          { name: "CSS", level: "Projects" },
          { name: "JavaScript", level: "Projects" },
          { name: "Spring Boot", level: "Projects" },
          { name: "REST APIs", level: "Projects" },
          { name: "MySQL", level: "Projects" },
          { name: "Git", level: "Working Knowledge" },
          { name: "GitHub", level: "Working Knowledge" }
        ]
      },
      {
        name: "Other",
        items: [
          { name: "Blockchain", level: "Learning" },
          { name: "Cybersecurity", level: "Learning" },
          { name: "Cloud Fundamentals", level: "Learning" },
          { name: "System Design", level: "Exploring" }
        ]
      }
    ],
    levelLabels: {
      "Learning": "Currently learning fundamentals",
      "Working Knowledge": "Can work with guidance",
      "Projects": "Applied in projects",
      "Exploring": "Actively exploring"
    }
  },

  projects: {
    title: "Featured Projects",
    items: [
      {
        id: "nexus",
        number: "01",
        name: "NEXUS — Personal AI Computer Agent",
        description: "A futuristic personal AI agent designed to interact with a computer through voice commands, automation, research, project generation, and specialized AI agents.",
        technologies: ["Python", "AI", "Voice AI", "Automation", "Computer Vision", "Agents"],
        features: [
          "Voice interaction",
          "Computer control",
          "AI task orchestration",
          "Project generation",
          "Browser research",
          "Specialized agents",
          "Futuristic GUI"
        ],
        detail: {
          overview: "NEXUS is a personal AI agent system that bridges the gap between human intent and computer execution. It functions as an intelligent layer that understands natural language commands and translates them into automated actions across the operating system.",
          problem: "Current computer interaction requires manual navigation through menus, memorizing shortcuts, and context-switching between applications. There's no unified intelligent interface that can understand high-level intent and execute complex multi-step workflows.",
          solution: "NEXUS implements a modular agent architecture where specialized agents handle different domains (file system, browser, terminal, code generation, research). A central orchestrator decomposes user requests into coordinated agent actions.",
          architecture: "Microservice-style agent architecture with a central orchestrator. Each agent exposes a standardized interface for task execution, status reporting, and inter-agent communication. Voice input processed through speech-to-text, parsed by LLM for intent classification, then routed to appropriate agents.",
          techStack: ["Python", "OpenAI/Anthropic APIs", "Speech Recognition", "Computer Vision (OpenCV)", "Browser Automation (Playwright)", "System APIs", "Custom GUI (Tkinter/PyQt)"],
          keyFeatures: [
            "Natural language voice commands",
            "Multi-agent task orchestration",
            "Autonomous browser research",
            "Code generation and project scaffolding",
            "System-level automation",
            "Real-time visual feedback",
            "Extensible agent plugin system"
          ],
          challenges: [
            "Reliable speech recognition in noisy environments",
            "Coordinating multiple agents without conflicts",
            "Maintaining context across long-running tasks",
            "Secure system-level permission handling"
          ],
          futureImprovements: [
            "Local LLM integration for privacy",
            "Mobile companion app",
            "Plugin marketplace for community agents",
            "Cross-platform support (Windows/macOS/Linux)"
          ]
        },
        repoUrl: "",
        liveUrl: ""
      },
      {
        id: "jewellery-erp",
        number: "02",
        name: "Jewellery & Pawn Management ERP",
        description: "A full-stack jewellery management and pawn broking system designed for real-world business operations.",
        technologies: ["Java", "Spring Boot", "JavaFX", "MySQL", "REST API"],
        features: [
          "Customer management",
          "Jewellery inventory",
          "Pawn loans",
          "Interest calculations",
          "GST invoices",
          "Role-based access",
          "Inventory tracking",
          "Business reporting"
        ],
        detail: {
          overview: "A comprehensive enterprise resource planning system tailored for jewellery retail and pawn broking businesses. Built as a desktop application with a centralized backend.",
          problem: "Jewellery and pawn businesses rely on manual ledgers or disconnected software, leading to errors in inventory valuation, interest calculations, and regulatory compliance (GST).",
          solution: "An integrated system managing the complete lifecycle: customer onboarding, jewellery item entry with purity/weight tracking, pawn loan creation with automated interest computation, GST-compliant invoice generation, and role-based access for staff vs management.",
          architecture: "Three-tier architecture: JavaFX desktop client, Spring Boot REST API backend, MySQL database. Client communicates via HTTP/JSON. Business logic centralized in services layer with transaction management.",
          techStack: ["Java 17", "Spring Boot 3", "Spring Data JPA", "Spring Security", "JavaFX", "MySQL", "Maven", "JasperReports/iText for PDF"],
          keyFeatures: [
            "Customer KYC and profile management",
            "Jewellery inventory with metal/purity/stone tracking",
            "Pawn loan lifecycle (creation, renewal, closure, auction)",
            "Automated interest calculation (simple/compound, daily/monthly)",
            "GST invoice generation (B2B/B2C)",
            "Role-based access control (Admin, Manager, Staff)",
            "Real-time inventory valuation",
            "Business reports (sales, loans, ageing, compliance)"
          ],
          challenges: [
            "Complex interest calculation rules per business policy",
            "GST compliance with changing regulations",
            "Concurrent access to inventory data",
            "Offline capability for desktop client"
          ],
          futureImprovements: [
            "Web-based dashboard for remote access",
            "SMS/WhatsApp notifications for customers",
            "Integration with gold rate APIs",
            "Mobile app for field staff"
          ]
        },
        repoUrl: "",
        liveUrl: ""
      },
      {
        id: "blockchain-academic",
        number: "03",
        name: "Blockchain-Based Secure Academic Record Management",
        description: "A blockchain-based system for securely storing and verifying academic credentials while reducing the risk of unauthorized modification and tampering.",
        technologies: ["Blockchain", "Web Development", "Cryptography", "Database"],
        features: [
          "Immutable credential storage",
          "Tamper-proof verification",
          "Decentralized trust",
          "Cryptographic proofs"
        ],
        detail: {
          overview: "A blockchain solution for academic credential verification that eliminates certificate forgery and enables instant verification by employers and institutions.",
          problem: "Academic certificates are easily forged. Verification requires contacting issuing institutions manually, causing delays in hiring and admissions.",
          solution: "Issue credentials as transactions on a permissioned blockchain. Each credential is cryptographically signed by the institution. Verifiers can instantly validate authenticity without contacting the issuer.",
          architecture: "Permissioned blockchain (Hyperledger Fabric or similar). Institutions as validator nodes. Web portal for issuing and verifying. Credentials stored as hashed records with metadata on-chain, full documents off-chain (IPFS).",
          techStack: ["Hyperledger Fabric / Ethereum", "Node.js/Go", "React", "IPFS", "Docker", "Cryptography (ECDSA, SHA-256)"],
          keyFeatures: [
            "Institution onboarding and identity management",
            "Credential issuance with digital signatures",
            "Instant verification portal",
            "Revocation support",
            "Audit trail of all actions"
          ],
          challenges: [
            "Scalability for national-level deployment",
            "Key management for institutions",
            "Interoperability with existing systems",
            "Legal recognition of blockchain credentials"
          ],
          futureImprovements: [
            "Integration with DigiLocker/National Academic Depository",
            "W3C Verifiable Credentials standard compliance",
            "Mobile wallet for students",
            "Zero-knowledge proofs for selective disclosure"
          ]
        },
        repoUrl: "",
        liveUrl: ""
      },
      {
        id: "rtos-project",
        number: "04",
        name: "Real-Time Operating System / Systems Project",
        description: "A systems-oriented project exploring real-time operating system concepts. This is a learning/project area rather than a production system.",
        technologies: ["C", "RTOS Concepts", "Embedded Systems", "Kernel Development"],
        features: [
          "Task scheduling",
          "Inter-task communication",
          "Memory management",
          "Interrupt handling"
        ],
        detail: {
          overview: "An educational project implementing core RTOS primitives to understand real-time systems fundamentals. Built as a learning exercise in systems programming.",
          problem: "Understanding how real-time constraints affect system design, scheduling algorithms, and resource management in embedded environments.",
          solution: "Implemented a minimal preemptive priority-based scheduler with task management, semaphores/mutexes for synchronization, message queues for IPC, and memory pools for deterministic allocation.",
          architecture: "Bare-metal or QEMU-based. Modular kernel with scheduler, IPC, memory, and timer subsystems. Board support package for target hardware (STM32/ARM Cortex-M).",
          techStack: ["C", "ARM Cortex-M / STM32", "QEMU", "GDB", "Make/CMake", "FreeRTOS concepts (custom implementation)"],
          keyFeatures: [
            "Priority-based preemptive scheduler",
            "Task states (ready, running, blocked, suspended)",
            "Binary/counting semaphores",
            "Mutex with priority inheritance",
            "Message queues",
            "Fixed-size memory pools",
            "Tickless idle support"
          ],
          challenges: [
            "Priority inversion handling",
            "Stack overflow detection",
            "Deterministic interrupt latency",
            "Testing on hardware vs simulation"
          ],
          futureImprovements: [
            "Port to RISC-V",
            "Add networking stack (lwIP)",
            "Filesystem support (LittleFS)",
            "Formal verification of scheduler"
          ]
        },
        repoUrl: "",
        liveUrl: ""
      },
      {
        id: "campusresolve",
        number: "05",
        name: "CampusResolve — Student Grievance & Resolution Platform",
        description: "A comprehensive campus grievance management system enabling students to report issues, track resolution progress, and administrators to manage workflows efficiently.",
        technologies: ["React", "TypeScript", "Node.js", "Express", "MongoDB", "Socket.io", "Tailwind CSS"],
        features: [
          "Real-time grievance submission",
          "Admin dashboard & analytics",
          "Role-based access control",
          "Email/SMS notifications",
          "File attachments support",
          "SLA tracking & escalation",
          "Anonymous reporting option",
          "Resolution timeline"
        ],
        detail: {
          overview: "CampusResolve is a full-stack web application designed to streamline the grievance redressal process in educational institutions. It provides a transparent, efficient platform for students to voice concerns and for administration to manage resolutions with accountability.",
          problem: "Students often face difficulties reporting campus issues (infrastructure, academics, harassment, facilities) due to opaque processes, lack of tracking, and fear of retaliation. Administrators struggle with manual paperwork, delayed responses, and no analytics on recurring issues.",
          solution: "A digital platform with student-facing portal for submitting grievances with categories, priority, and evidence. Admin dashboard for triaging, assigning, tracking SLA compliance, and generating reports. Real-time notifications keep all stakeholders informed. Anonymous reporting option encourages sensitive disclosures.",
          architecture: "MERN stack with WebSocket integration. React/TypeScript frontend with Tailwind CSS. Node.js/Express REST API with JWT authentication. MongoDB for flexible document storage. Socket.io for real-time updates. Role-based middleware for access control.",
          techStack: ["React 18", "TypeScript", "Vite", "Node.js", "Express", "MongoDB", "Mongoose", "Socket.io", "JWT", "Nodemailer", "Twilio", "Tailwind CSS", "Chart.js"],
          keyFeatures: [
            "Multi-category grievance submission (Academic, Infrastructure, Harassment, Facilities, Other)",
            "Priority levels with auto-escalation on SLA breach",
            "Admin dashboard with real-time stats, charts, and filters",
            "Department/warden assignment with workload balancing",
            "Email and SMS notifications via Nodemailer/Twilio",
            "File upload for evidence (images, documents)",
            "Anonymous mode with token-based tracking",
            "Resolution timeline with status history",
            "Analytics: category trends, resolution times, department performance",
            "Audit logs for compliance"
          ],
          challenges: [
            "Ensuring anonymity while maintaining accountability",
            "Real-time sync across multiple admin users",
            "Scalable notification system for high volume",
            "Complex role hierarchy (Student, Warden, HOD, Dean, Admin)",
            "Data privacy and retention compliance"
          ],
          futureImprovements: [
            "Mobile app (React Native/Flutter)",
            "AI-powered categorization and priority suggestion",
            "Integration with existing ERP/SIS systems",
            "Multilingual support for diverse campuses",
            "Public API for third-party integrations",
            "Advanced analytics with ML predictions"
          ]
        },
        repoUrl: "",
        liveUrl: ""
      },
      {
        id: "jewel-erp",
        number: "06",
        name: "Jewel ERP — Jewellery & Pawn Broking Management",
        description: "Offline-first, full-featured ERP for Indian jewellery stores and pawn brokers. Manages inventory, GST invoices, pawn loans (Girvi), interest calculations, statutory registers (Form S/H), daily cash book, and multi-language printing — all in a single PWA/Android app.",
        technologies: ["React 19", "TypeScript", "Vite 8", "Tailwind CSS 4", "Dexie.js", "IndexedDB", "Capacitor 8", "html5-qrcode", "Lucide React"],
        features: [
          "Offline-first: 100% local storage via IndexedDB (Dexie.js)",
          "Inventory & tray/box management with HUID hallmark tracking",
          "GST-compliant invoicing with old gold exchange & making charges",
          "Pawn broking (Girvi) full lifecycle: pledge → interest → redeem → auction",
          "Statutory Form S & Form H registers with CSV export",
          "Daily cash book (Rojmel) with auto-compilation from transactions",
          "Multi-language print: English, Hindi, Tamil, Telugu, Gujarati",
          "3 print formats: Thermal 58/80mm, A4, Token tags",
          "QR/Barcode scanner for item & loan lookup",
          "JSON backup/restore & factory reset",
          "Android APK via Capacitor 8"
        ],
        detail: {
          overview: "Jewel ERP is a complete offline-first ERP system purpose-built for Indian jewellery shops that also operate pawn-broking (Girvi) services. It runs entirely in the browser using IndexedDB — no server, no cloud, no subscription. The app can also be compiled into a native Android APK via Capacitor.",
          problem: "Small and family-run jewellers in India need a comprehensive digital solution for inventory, billing, pawn loans, and regulatory compliance — but existing solutions are either cloud-dependent (requiring internet), expensive SaaS, or lack Indian statutory features (GST, Form S/H, hallmark HUID). There was no single offline-capable tool covering all these needs.",
          solution: "A React 19 + TypeScript PWA with Dexie.js IndexedDB backend. Features: tray/box inventory system with pure metal weight conversion; GST invoicing with CGST/SGST/IGST; pawn loan engine with 3%/month gold and 5%/month silver interest plus 2-day grace rule; statutory Form S (redeemed loans) and Form H (active pledges) registers; daily cash book auto-compiled from sales/interest/old gold; 5-language print system with per-print language switching; QR scanner via device camera; JSON export/import for backup/migration; Capacitor Android build for native distribution.",
          architecture: "Single-page React 19 app (no router — tab-based state). Dexie.js ORM over IndexedDB (10 tables: storeProfile, metalRates, boxes, inventory, pawnLoans, pawnPayments, formSRecords, invoices, oldGoldPurchases, cashBook). All data operations are synchronous to IndexedDB; UI state syncs via React state refreshed from DB after mutations. Modular components: Dashboard, InventoryManager, PawnBroking, BillingManager, CustomerPassbook, CashBookManager, StatutoryFormsModal, StoreSettings, PrintModal, plus 8 creation/editing modals. Calculations & translations in pure TS utilities. Capacitor bridge for Android WebView.",
          techStack: ["React 19", "TypeScript 6", "Vite 8", "Tailwind CSS 4", "Dexie.js 4", "html5-qrcode 2", "Lucide React", "Capacitor 8", "OxLint"],
          keyFeatures: [
            "Tray/box inventory with tare weight, net weight, and 24K/999 pure weight auto-calc",
            "Hallmark HUID tracking per item (BIS compliance)",
            "GST tax invoices with HSN 7113, CGST/SGST/IGST, old gold deduction",
            "Pawn loans: multi-item pledge, auto loan/token numbering (PB-YYYY-NNNN), KYC with photos",
            "Interest engine: actual rate (3%/5%) + statutory 14% p.a. with 2-day grace rule",
            "Form S (settled) & Form H (active) statutory registers, CSV export, print-ready",
            "Daily cash book (Rojmel) auto-compiles from invoices, interest, disbursements, old gold",
            "Customer passbook aggregates loans & invoices by phone number",
            "Print system: thermal (58/80mm), A4, token tags — 5 languages, on-the-fly switching",
            "QR/barcode camera scanner routes to matching inventory item or pawn loan",
            "Full JSON backup/restore + factory reset",
            "Android APK via Capacitor 8 (package: com.jewelerp.app)"
          ],
          challenges: [
            "Accurate pure weight conversion across 7 karat types (24K, 22K, 18K, 14K, 999, 925, Other)",
            "Complex interest calculation with 2-day grace rule per Indian pawn convention",
            "Statutory Form S/H compliance matching government-prescribed register formats",
            "Multi-language print translations with bilingual labels (native + English)",
            "Offline-first architecture: no server sync, conflict-free local-only mutations",
            "Print CSS for thermal/A4/token formats with @media print and no-print classes",
            "IndexedDB schema migrations and JSON import/export with data integrity"
          ],
          futureImprovements: [
            "Cloud sync (Firebase/Supabase) for multi-device access",
            "WhatsApp integration for payment reminders and overdue alerts",
            "Barcode/RFID tag printing integration",
            "Photo capture via device camera for items and customers",
            "Advanced analytics dashboard with charts",
            "iOS Capacitor build",
            "PWA Service Worker for full offline installability",
            "Multi-store/branch support",
            "Role-based access control (Owner/Staff)",
            "Automated SMS/email notifications for overdue loans"
          ]
        },
        repoUrl: "",
        liveUrl: ""
      }
    ]
  },

  education: {
    title: "Education",
    items: [
      {
        id: "btech",
        degree: "Computer Science Engineering",
        specialization: "Data Science",
        institution: "Akash Institute of Engineering and Technology",
        status: "Current",
        startYear: "2022",
        endYear: "Present",
        details: [
          "Focus on Data Science, AI/ML, and Software Engineering",
          "Relevant coursework: Algorithms, Data Structures, Database Systems, Machine Learning, Computer Networks, Operating Systems"
        ]
      }
    ]
  },

  certifications: {
    title: "Certifications",
    items: [
      {
        id: "infosys-ds",
        name: "Data Science",
        provider: "Infosys Springboard",
        skills: ["Data Analysis", "Machine Learning", "Python", "Statistics", "Data Visualization"],
        verificationUrl: "",
        year: "2024"
      },
      {
        id: "simplilearn-pm",
        name: "Project Management for Engineers",
        provider: "Simplilearn",
        skills: ["Project Planning", "Agile/Scrum", "Risk Management", "Stakeholder Management", "Engineering Project Lifecycle"],
        verificationUrl: "",
        year: "2024"
      }
    ]
  },

  experience: {
    title: "Experience & Activities",
    categories: [
      {
        name: "Software & AI Project Development",
        type: "Projects",
        items: [
          {
            title: "NEXUS - Personal AI Computer Agent",
            period: "2024 - Present",
            description: "Building a voice-controlled AI agent system with multi-agent orchestration for computer automation."
          },
          {
            title: "Jewellery & Pawn Management ERP",
            period: "2023 - 2024",
            description: "Full-stack desktop ERP for jewellery retail and pawn broking with Spring Boot and JavaFX."
          },
          {
            title: "Blockchain Academic Record System",
            period: "2023",
            description: "Blockchain-based credential verification system using cryptographic proofs."
          }
        ]
      },
      {
        name: "Academic Projects",
        type: "Learning",
        items: [
          {
            title: "Real-Time OS Kernel Implementation",
            period: "2024",
            description: "Custom RTOS kernel with preemptive scheduling, IPC, and memory management in C."
          },
          {
            title: "Data Science Capstone Projects",
            period: "2023 - 2024",
            description: "End-to-end ML pipelines: data cleaning, feature engineering, model training, evaluation, deployment."
          }
        ]
      },
      {
        name: "Technical Activities",
        type: "Activities",
        items: [
          {
            title: "Coding Club Member",
            period: "2022 - Present",
            description: "Active participant in algorithmic problem solving, hackathons, and peer learning sessions."
          },
          {
            title: "Technology Research & Exploration",
            period: "2022 - Present",
            description: "Self-directed study of emerging technologies: LLMs, Agents, Computer Vision, Blockchain, Systems Programming."
          }
        ]
      }
    ]
  },

  whatIBuild: {
    title: "What I Build",
    items: [
      {
        name: "AI Systems",
        description: "Intelligent agents and automation systems that understand intent and execute complex workflows.",
        icon: "cpu"
      },
      {
        name: "Automation",
        description: "Tools and scripts that eliminate repetitive tasks and streamline developer workflows.",
        icon: "zap"
      },
      {
        name: "Data Platforms",
        description: "Pipelines and platforms for collecting, processing, and deriving insights from data.",
        icon: "database"
      },
      {
        name: "Business Software",
        description: "Practical applications that solve real operational problems for businesses.",
        icon: "briefcase"
      },
      {
        name: "Developer Tools",
        description: "Utilities and libraries that improve the software development experience.",
        icon: "code"
      },
      {
        name: "Intelligent Agents",
        description: "Autonomous systems that perceive, reason, and act in digital environments.",
        icon: "bot"
      }
    ]
  },

  blog: {
    title: "Blog & Writings",
    items: [
      {
        id: "building-nexus-ai-agent",
        title: "Building NEXUS: A Personal AI Computer Agent",
        description: "Deep dive into the architecture of a voice-controlled AI agent system with multi-agent orchestration for computer automation.",
        date: "2024-12-15",
        tags: ["AI", "Python", "Agents", "Automation"],
        readTime: "12 min",
        url: "",
        featured: true
      },
      {
        id: "offline-first-jewel-erp",
        title: "Offline-First Architecture: Building Jewel ERP with IndexedDB",
        description: "How to build a fully offline-capable PWA for jewellery and pawn management using React, Dexie.js, and Capacitor.",
        date: "2024-10-20",
        tags: ["React", "TypeScript", "IndexedDB", "PWA", "Capacitor"],
        readTime: "15 min",
        url: "",
        featured: true
      },
      {
        id: "rtos-kernel-from-scratch",
        title: "Writing a Preemptive RTOS Kernel from Scratch in C",
        description: "Lessons learned implementing a priority-based scheduler, IPC primitives, and memory pools for ARM Cortex-M.",
        date: "2024-08-10",
        tags: ["C", "RTOS", "Embedded Systems", "Systems Programming"],
        readTime: "18 min",
        url: "",
        featured: false
      },
      {
        id: "blockchain-academic-records",
        title: "Blockchain for Academic Credential Verification",
        description: "Designing a tamper-proof credential system using Hyperledger Fabric with W3C Verifiable Credentials compliance.",
        date: "2024-05-22",
        tags: ["Blockchain", "Cryptography", "Hyperledger", "Web Development"],
        readTime: "10 min",
        url: "",
        featured: false
      },
      {
        id: "campusresolve-grpc-design",
        title: "Real-time Grievance Management with WebSockets",
        description: "Architecture decisions behind CampusResolve: MERN stack, Socket.io for real-time updates, and role-based access control.",
        date: "2024-03-18",
        tags: ["React", "Node.js", "MongoDB", "Socket.io", "System Design"],
        readTime: "8 min",
        url: "",
        featured: false
      },
      {
        id: "interest-calculation-pawn",
        title: "The 2-Day Grace Rule: Interest Calculation in Indian Pawn Broking",
        description: "Breaking down the specific interest calculation convention used in Indian pawn shops with code examples.",
        date: "2024-01-30",
        tags: ["FinTech", "Algorithms", "JavaScript", "Business Logic"],
        readTime: "6 min",
        url: "",
        featured: false
      }
    ]
  },

  github: {
    title: "GitHub",
    username: "",
    showStats: false,
    placeholderMessage: "GitHub profile integration available"
  },

  contact: {
    title: "Contact",
    name: "Indar Kumar",
    role: "Computer Science Engineering & Data Science | Developer",
    email: "indarkumarservi@gmail.com",
    socialLinks: {
      linkedin: "",
      github: "",
      twitter: ""
    }
  },

  footer: {
    copyright: "2025 Indar Kumar. Built with React, TypeScript, and precision."
  }
};

export type PortfolioConfig = typeof portfolioConfig;