import React, { useState } from "react";

const fields = [
  { name: "name", label: "Full Name", placeholder: "Your Full Name" },
  { name: "jobTitle", label: "Job Title", placeholder: "Software Developer" },
  { name: "email", label: "Email", placeholder: "your@email.com", type: "email" },
  { name: "phone", label: "Mobile Number", placeholder: "9876543210", type: "tel" },
  { name: "location", label: "Location", placeholder: "Mumbai, Maharashtra" },
  { name: "about", label: "Professional Summary", placeholder: "Write your professional summary...", area: true },
  { name: "experience", label: "Work Experience", placeholder: "Company name, job role, responsibilities...", area: true },
  { name: "education", label: "Education", placeholder: "Degree, college/university, year...", area: true },
  { name: "projects", label: "Projects", placeholder: "Project name, technologies and description...", area: true },
  { name: "skills", label: "Professional Skills", placeholder: "React, JavaScript, Node.js, HTML, CSS...", area: true },
  { name: "certification", label: "Certifications", placeholder: "Certification name, organization...", area: true },
  { name: "achievement", label: "Achievements", placeholder: "Awards, accomplishments...", area: true },
  { name: "hobby", label: "Interests", placeholder: "Reading, Travelling, Music..." },
];

// Clean and simple input style
const inputClass =
  "w-full mt-1 p-2 bg-gray-50 border border-gray-300 rounded text-sm focus:bg-white focus:border-indigo-600 outline-none transition";

// Simple section divider
const sectionLabel = (title) => (
  <div className="border-b-2 border-indigo-600 pb-1 mb-3">
    <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-700">
      {title}
    </h2>
  </div>
);

export default function Tamp3() {
  const [resume, setResume] = useState({});

  const set = (name, value) => {
    setResume((r) => ({ ...r, [name]: value }));
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
          #resume-preview { position: absolute; top: 0; left: 0; width: 100%; }
        }
      `}</style>

      <div className="min-h-screen bg-gray-100 p-4 md:p-8 text-gray-800">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* ================= FORM ================= */}
          <div className="lg:col-span-2 bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden">

            {/* HEADER */}
            <div className="bg-slate-900 px-6 py-5 text-white">
              <p className="text-indigo-400 text-xs font-semibold uppercase tracking-wider">
                Resume Builder
              </p>
              <h2 className="text-xl font-bold mt-1">Professional Resume</h2>
              <p className="text-gray-400 text-xs mt-1">
                Build your professional job resume
              </p>
            </div>

            <div className="p-6">
              {/* PROFILE PHOTO */}
              <div className="mb-5">
                <label className="block text-xs font-semibold text-gray-600 uppercase mb-2">
                  Profile Photo
                </label>

                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded border border-gray-300 bg-gray-50 flex items-center justify-center overflow-hidden">
                    {resume.photo ? (
                      <img
                        src={resume.photo}
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-xs text-gray-400">PHOTO</span>
                    )}
                  </div>

                  <label className="cursor-pointer border border-gray-300 rounded px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 transition">
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

              {/* INPUT FIELDS */}
              {fields.map((f) => (
                <div key={f.name} className={f.name === "hobby" ? "mb-5" : "mb-3"}>
                  <label className="text-xs font-semibold text-gray-600 uppercase">
                    {f.label}
                  </label>

                  {f.area ? (
                    <textarea
                      placeholder={f.placeholder}
                      value={resume[f.name] || ""}
                      onChange={(e) => set(f.name, e.target.value)}
                      className={`${inputClass} h-20`}
                    />
                  ) : f.name === "phone" ? (
                    <div className="flex mt-1">
                      <span className="px-3 py-2 border border-r-0 border-gray-300 rounded-l bg-gray-100 text-sm text-gray-600">
                        +91
                      </span>
                      <input
                        type="tel"
                        inputMode="numeric"
                        maxLength={10}
                        placeholder={f.placeholder}
                        value={resume.phone || ""}
                        onChange={(e) => handlePhone(e.target.value)}
                        className="w-full p-2 bg-gray-50 border border-gray-300 rounded-r text-sm focus:bg-white focus:border-indigo-600 outline-none transition"
                      />
                    </div>
                  ) : (
                    <input
                      type={f.type || "text"}
                      placeholder={f.placeholder}
                      value={resume[f.name] || ""}
                      onChange={(e) => set(f.name, e.target.value)}
                      className={inputClass}
                    />
                  )}

                  {f.name === "phone" && phoneError && (
                    <p className="text-xs text-red-600 mt-1">{phoneError}</p>
                  )}
                </div>
              ))}

              {/* DOWNLOAD BUTTON */}
              <button
                onClick={() => window.print()}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded py-2.5 text-sm font-semibold tracking-wide transition"
              >
                SAVE / DOWNLOAD PDF
              </button>
            </div>
          </div>

          {/* ================= RESUME PREVIEW ================= */}
          <div
            id="resume-preview"
            className="lg:col-span-3 bg-white border border-gray-200 rounded-lg shadow-sm min-h-[850px] p-8 md:p-10"
          >
            {/* HEADER */}
            <div className="border-b border-gray-200 pb-6 mb-6">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                <div>
                  <h1 className="text-3xl font-extrabold text-gray-900 uppercase">
                    {resume.name || "YOUR NAME"}
                  </h1>
                  <p className="text-indigo-600 font-semibold text-base mt-1">
                    {resume.jobTitle || "Professional Position"}
                  </p>
                </div>

                {/* PHOTO */}
                <div className="w-24 h-24 border border-gray-300 rounded overflow-hidden shrink-0 bg-gray-50">
                  {resume.photo ? (
                    <img
                      src={resume.photo}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-xs text-gray-400">PHOTO</span>
                    </div>
                  )}
                </div>
              </div>

              {/* CONTACT DETAILS */}
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-600 mt-4">
                <span>{resume.email || "your@email.com"}</span>
                <span>•</span>
                <span>+91 {resume.phone || "9876543210"}</span>
                <span>•</span>
                <span>{resume.location || "Your Location"}</span>
              </div>
            </div>

            {/* ================= CONTENT ================= */}
            <div>
              <section className="mb-6">
                {sectionLabel("Professional Summary")}
                <p className="text-gray-700 text-sm leading-relaxed">
                  {resume.about ||
                    "Experienced and motivated professional with strong technical and problem-solving skills."}
                </p>
              </section>

              <section className="mb-6">
                {sectionLabel("Work Experience")}
                <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                  {resume.experience ||
                    "Your professional work experience will appear here."}
                </p>
              </section>

              <section className="mb-6">
                {sectionLabel("Education")}
                <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                  {resume.education || "Your education details will appear here."}
                </p>
              </section>

              <section className="mb-6">
                {sectionLabel("Projects")}
                <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                  {resume.projects || "Your professional projects will appear here."}
                </p>
              </section>

              <section className="mb-6">
                {sectionLabel("Professional Skills")}
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {resume.skills ? (
                    resume.skills.split(",").map((skill, index) => (
                      <span
                        key={index}
                        className="px-2.5 py-1 bg-gray-100 border border-gray-200 rounded text-xs text-gray-700"
                      >
                        {skill.trim()}
                      </span>
                    ))
                  ) : (
                    <span className="text-xs text-gray-400">
                      React • JavaScript • HTML • CSS
                    </span>
                  )}
                </div>
              </section>

              <section className="mb-6">
                {sectionLabel("Certifications")}
                <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                  {resume.certification || "Your certifications will appear here."}
                </p>
              </section>

              <section className="mb-6">
                {sectionLabel("Achievements")}
                <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                  {resume.achievement ||
                    "Your professional achievements will appear here."}
                </p>
              </section>

              <section>
                {sectionLabel("Interests")}
                <p className="text-gray-700 text-sm leading-relaxed">
                  {resume.hobby || "Reading • Travelling • Technology • Music"}
                </p>
              </section>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}