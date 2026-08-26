// All portfolio content lives here. Edit this file to update the site.
window.PORTFOLIO = {
  ticker: ["Machine Learning", "NLP", "Deep Learning", "Computer Vision", "State Space Models", "Python", "PyTorch"],


  stats: [
    { value: 2, decimals: 0, suffix: "+", label: "Years Experience" },
    { value: 20, decimals: 0, suffix: "+", label: "Projects Delivered" },
    { value: 3, decimals: 0, suffix: "", label: "Research Tracks" }
  ],

  projects: [
    {
      num: "01",
      dates: "2026",
      title: "Soccer Player Tracker",
      video: "assets/soccer.mp4",
      repo: "https://github.com/Qaiserfarooq285",
      tags: ["YOLOv8", "YOLO-Seg", "SoccerNet"]
    },
    {
      num: "02",
      dates: "2026",
      title: "Open Source Content Flow",
      video: "assets/lipsync.mp4",
      repo: "https://github.com/Qaiserfarooq285/lipsync",
      tags: ["LatentSync", "Chatterbox", "WhisperX"]
    },
    {
      num: "03",
      dates: "2026",
      title: "Real Time Drone Detection",
      video: "assets/drone.mp4",
      repo: "https://github.com/Qaiserfarooq285/dron-detect",
      tags: ["Hailo", "Raspberry Pi 5", "YOLOv8"]
    },
    {
      num: "04",
      dates: "2026",
      title: "Henry AI",
      video: "assets/henryai.mp4",
      repo: "https://github.com/Qaiserfarooq285",
      tags: ["Chatbot", "API", "Automation"]
    },
    {
      num: "05",
      dates: "2025",
      title: "AI Resume Analyzer",
      video: "assets/resume-analyzer.mp4",
      repo: "https://github.com/Qaiserfarooq285/AI-Resume-Analyzer",
      tags: ["Python", "KNN", "PyTorch"]
    },
    {
      num: "06",
      dates: "2025",
      title: "FIFA Ad Blocker",
      video: "assets/adblocker.mp4",
      repo: "https://github.com/Qaiserfarooq285/adblocker",
      tags: ["YOLOv11", "SAM", "Python"]
    }
  ],

  research: [
    {
      num: "01",
      title: "Sequence Modeling with Mamba",
      body: "I am exploring sequence modeling using Mamba (State Space Models) as an efficient alternative to transformer-based architectures. My focus is on capturing long-range dependencies with linear computational complexity, making the models scalable for large sequential data."
    },
    {
      num: "02",
      title: "Vision Mamba for Medical Imaging",
      body: "I am applying Vision Mamba to medical images, particularly chest X-rays, to enhance semantic feature understanding and report generation. By leveraging patch-based representations and Spatial Mamba, the model captures global context while maintaining computational efficiency."
    },
    {
      num: "03",
      title: "Efficient Multimodal Report Generation",
      body: "I am investigating how visual encoders and language decoders can be aligned for automated clinical report generation, with a focus on keeping inference cost low enough for deployment in resource-constrained settings."
    }
  ],

  proficiency: [
    { label: "Machine Learning & AI", value: 90 },
    { label: "Python Development", value: 85 },
    { label: "Data Analysis", value: 85 },
    { label: "Web Development", value: 75 }
  ],

  experience: [
    { role: "AI Engineer", org: "DH Solutions", dates: "Nov 2023 — Present", body: "Spearheading the design, development, and deployment of AI-driven solutions. Managing end-to-end project lifecycles, delegating tasks to junior developers, and mentoring team members on AI methodologies." },
    { role: "Associate Teacher", org: "COMSATS University Islamabad", dates: "Sep 2025 — Sep 2026", body: "Teaching and mentoring students in AI-related coursework while supporting academic and practical learning in machine learning and data science." },
    { role: "Software Developer", org: "SOFTECH-IT", dates: "Jan 2023 — Oct 2024", body: "Contributed to diverse software projects within team settings, focusing on Python development and software engineering principles." },
    { role: "Freelance Developer", org: "Fiverr · LinkedIn · Facebook", dates: "Dec 2021 — May 2023", body: "Delivered 20+ successful projects with high client satisfaction, communicating closely to understand requirements and build long-term relationships." }
  ],

  skills: ["Python", "C/C++", "JavaScript", "HTML", "CSS", "TensorFlow", "Keras", "PyTorch", "React", "Scikit-learn", "Pandas", "NumPy", "Docker", "Git", "MySQL", "Jupyter Notebook", "PyCharm", "VS Code", "Problem Solving", "Team Leadership", "Project Management"],

  education: [
    { degree: "Master of Science", field: "Artificial Intelligence", school: "Comsats University Islamabad", dates: "Sep 2024 — Sep 2026", status: "Completed", score: "CGPA 3.92", place: "Islamabad, Pakistan" },
    { degree: "Bachelor of Science", field: "Computer Science", school: "University of Science and Technology Bannu", dates: "Sep 2019 — Sep 2023", status: "Completed", score: "CGPA 3.77", place: "Bannu, KPK" },
    { degree: "ICS", field: "Intermediate in Computer Science", school: "Govt Degree Collage No 2 Bannu", dates: "Jan 2017 — Jan 2019", status: "Completed", score: "Score 80%", place: "Bannu, KPK" }
  ]
};
