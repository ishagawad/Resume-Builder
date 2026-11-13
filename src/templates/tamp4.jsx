import React, { useState } from "react";

const fields = [
  { name: "name", label: "Full Name", placeholder: "Your Full Name" },
  { name: "jobTitle", label: "Professional Job Title", placeholder: "Senior Software Developer" },
  { name: "email", label: "Email Address", placeholder: "your@email.com", type: "email" },
  { name: "phone", label: "Mobile Number", placeholder: "9876543210", type: "tel" },
  { name: "location", label: "Location", placeholder: "Mumbai, Maharashtra, India" },
  { name: "linkedin", label: "LinkedIn / Portfolio", placeholder: "linkedin.com/in/yourname" },
  {
    name: "summary",
    label: "Professional Summary",
    placeholder: "Write a strong summary about your professional experience and career...",
    area: true,
  },
  {
    name: "experience",
    label: "Work Experience",
    placeholder: "Company Name\nJob Position\nDuration\nResponsibilities and achievements...",
    area: true,
  },
  {
    name: "education",
    label: "Education",
    placeholder: "Degree Name\nCollege / University\nYear of Completion...",
    area: true,
  },
  {
    name: "skills",
    label: "Professional Skills",
    placeholder: "React, JavaScript, Node.js, Python, Communication...",
  },
  {
    name: "projects",
    label: "Professional Projects",
    placeholder: "Project Name\nTechnologies Used\nProject description...",
    area: true,
  },
  {
    name: "certifications",
    label: "Certifications",
    placeholder: "Certification Name - Organization - Year...",
    area: true,
  },
  {
    name: "achievements",
    label: "Key Achievements",
    placeholder: "Awards, promotions, professional accomplishments...",
    area: true,
  },
];

const inputClass =
  "w-full mt-2 px-4 py-3 rounded-lg bg-slate-50 border border-slate-300 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition resize-none";

const sectionTitle = (title) => (
  <div className="flex items-center gap-3 mb-4">
    <div className="w-1 h-6 bg-blue-700"></div>
    <h2 className="text-lg font-bold uppercase tracking-wide text-slate-800">
      {title}
    </h2>
    <div className="h-px bg-slate-300 flex-1"></div>
  </div>
);

export default function Tamp4() {
  const [resume, setResume] = useState({});

  const set = (name, value) => {
    setResume((prev) => ({ ...prev, [name]: value }));
  };

  // Mobile: digits only, max 10, first digit must be 6-9 (+91 is added automatically)
  const handlePhone = (value) => {
    const digits = value.replace(/\D/g, "").slice(0, 10);
    if (digits.length === 1 && !/[6-9]/.test(digits)) return;
    set("phone", digits);
  };

  const phoneError =
    resume.phone && resume.phone.length < 10 ? "Enter all 10 digits." : "";

  return (
    <>
      {/* PRINT SETTINGS */}
      <style>{`
        @media print {
          body * { visibility: hidden; }
          #resume-preview, #resume-preview * { visibility: visible; }
          #resume-preview {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            box-shadow: none;
          }
        }
      `}</style>

      <div className="min-h-screen bg-slate-100 p-5 md:p-10">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8">

          {/* ================= FORM SECTION ================= */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-xl overflow-hidden">

            {/* FORM HEADER */}
            <div className="bg-slate-900 px-7 py-8">
              <p className="text-blue-400 text-sm uppercase tracking-[3px]">
                Resume Builder
              </p>
              <h2 className="text-3xl font-bold text-white mt-2">
                Professional Resume
              </h2>
              <p className="text-slate-400 text-sm mt-2">
                Create a modern and professional job resume
              </p>
            </div>

            {/* FORM CONTENT */}
            <div className="p-7 max-h-[900px] overflow-y-auto">

              {/* PROFILE PHOTO */}
              <div className="mb-7">
                <label className="block text-sm font-semibold text-slate-700 mb-3">
                  Professional Photo
                </label>

                <div className="flex items-center gap-4">
                  <div className="w-24 h-24 rounded-full border-4 border-blue-100 overflow-hidden bg-slate-100 flex items-center justify-center">
                    {resume.photo ? (
                      <img
                        src={resume.photo}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-xs text-slate-400">PHOTO</span>
                    )}
                  </div>

                  <label className="cursor-pointer bg-blue-700 hover:bg-blue-800 text-white px-5 py-3 rounded-lg text-sm font-semibold transition">
                    Upload Photo
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        if (file) set("photo", URL.createObjectURL(file));
                      }}
                    />
                  </label>
                </div>
              </div>

              {/* FORM INPUTS */}
              {fields.map((field) => (
                <div key={field.name} className="mb-5">
                  <label className="text-sm font-semibold text-slate-700">
                    {field.label}
                  </label>

                  {field.area ? (
                    <textarea
                      placeholder={field.placeholder}
                      value={resume[field.name] || ""}
                      onChange={(e) => set(field.name, e.target.value)}
                      className={`${inputClass} h-28`}
                    />
                  ) : field.name === "phone" ? (
                    <div className="flex mt-2">
                      <span className="px-4 py-3 border border-r-0 border-slate-300 rounded-l-lg bg-slate-100 text-slate-600">
                        +91
                      </span>
                      <input
                        type="tel"
                        inputMode="numeric"
                        maxLength={10}
                        placeholder={field.placeholder}
                        value={resume.phone || ""}
                        onChange={(e) => handlePhone(e.target.value)}
                        className="w-full px-4 py-3 rounded-r-lg bg-slate-50 border border-slate-300 outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition"
                      />
                    </div>
                  ) : (
                    <input
                      type={field.type || "text"}
                      placeholder={field.placeholder}
                      value={resume[field.name] || ""}
                      onChange={(e) => set(field.name, e.target.value)}
                      className={inputClass}
                    />
                  )}

                  {field.name === "phone" && phoneError && (
                    <p className="text-xs text-red-600 mt-1">{phoneError}</p>
                  )}
                </div>
              ))}

              {/* DOWNLOAD BUTTON */}
              <button
                onClick={() => window.print()}
                className="w-full mt-4 bg-slate-900 hover:bg-blue-700 text-white py-4 rounded-lg font-semibold tracking-wide transition"
              >
                DOWNLOAD PROFESSIONAL RESUME
              </button>
            </div>
          </div>

          {/* ================= RESUME PREVIEW ================= */}
          <div
            id="resume-preview"
            className="lg:col-span-3 bg-white shadow-2xl min-h-[1000px]"
          >
            {/* HEADER */}
            <div className="bg-slate-900 px-10 md:px-14 py-12 text-white">
              <div className="flex flex-col md:flex-row justify-between items-center gap-6">

                {/* NAME */}
                <div>
                  <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-wide">
                    {resume.name || "YOUR NAME"}
                  </h1>
                  <p className="text-blue-300 text-xl mt-3">
                    {resume.jobTitle || "Professional Job Title"}
                  </p>
                </div>

                {/* PHOTO */}
                <div className="w-32 h-32 rounded-full border-4 border-blue-400 overflow-hidden bg-white">
                  {resume.photo ? (
                    <img
                      src={resume.photo}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-slate-400">
                      PHOTO
                    </div>
                  )}
                </div>
              </div>

              {/* CONTACT DETAILS */}
              <div className="mt-8 pt-5 border-t border-slate-600 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-300">
                <span>{resume.email || "your@email.com"}</span>
                <span>+91 {resume.phone || "9876543210"}</span>
                <span>{resume.location || "Mumbai, India"}</span>
                <span>{resume.linkedin || "linkedin.com/in/yourname"}</span>
              </div>
            </div>

            {/* ================= RESUME CONTENT ================= */}
            <div className="px-10 md:px-14 py-10">

              <section className="mb-9">
                {sectionTitle("Professional Summary")}
                <p className="text-slate-600 leading-7">
                  {resume.summary ||
                    "Experienced professional with strong technical expertise, excellent problem-solving abilities, and a proven track record of delivering high-quality results."}
                </p>
              </section>

              <section className="mb-9">
                {sectionTitle("Work Experience")}
                <div className="border-l-4 border-blue-700 pl-5">
                  <p className="text-slate-600 leading-7 whitespace-pre-line">
                    {resume.experience ||
                      "Your professional work experience will appear here."}
                  </p>
                </div>
              </section>

              <section className="mb-9">
                {sectionTitle("Professional Skills")}
                <div className="flex flex-wrap gap-3">
                  {resume.skills ? (
                    resume.skills.split(",").map((skill, index) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-slate-100 border border-slate-300 rounded-md text-sm font-medium text-slate-700"
                      >
                        {skill.trim()}
                      </span>
                    ))
                  ) : (
                    <>
                      <span className="px-4 py-2 bg-slate-100 border border-slate-300 rounded-md">
                        Leadership
                      </span>
                      <span className="px-4 py-2 bg-slate-100 border border-slate-300 rounded-md">
                        Communication
                      </span>
                      <span className="px-4 py-2 bg-slate-100 border border-slate-300 rounded-md">
                        Problem Solving
                      </span>
                    </>
                  )}
                </div>
              </section>

              <section className="mb-9">
                {sectionTitle("Professional Projects")}
                <p className="text-slate-600 leading-7 whitespace-pre-line">
                  {resume.projects ||
                    "Your important professional projects will appear here."}
                </p>
              </section>

              <section className="mb-9">
                {sectionTitle("Education")}
                <p className="text-slate-600 leading-7 whitespace-pre-line">
                  {resume.education ||
                    "Your educational qualifications will appear here."}
                </p>
              </section>

              <section className="mb-9">
                {sectionTitle("Certifications")}
                <p className="text-slate-600 leading-7 whitespace-pre-line">
                  {resume.certifications ||
                    "Your professional certifications will appear here."}
                </p>
              </section>

              <section>
                {sectionTitle("Key Achievements")}
                <p className="text-slate-600 leading-7 whitespace-pre-line">
                  {resume.achievements ||
                    "Your key professional achievements will appear here."}
                </p>
              </section>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}