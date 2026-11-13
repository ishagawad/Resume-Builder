import React, { useState } from "react";

const fields = [
  { name: "name", label: "Full Name", placeholder: "Your Full Name" },
  { name: "jobTitle", label: "Career Objective", placeholder: "BSc IT Student " },
  { name: "email", label: "Email", placeholder: "your@email.com", type: "email" },
  { name: "phone", label: "Mobile Number", placeholder: "9876543210", type: "tel" },
  { name: "about", label: "About Me", placeholder: "Write a short introduction about yourself...", area: true },
  { name: "education", label: "Education", placeholder: "BSc IT, College Name, Year...", area: true },
  { name: "projects", label: "Academic Projects", placeholder: "Project name, technologies used, description...", area: true },
  { name: "internship", label: "Internship / Training", placeholder: "Company name, role, duration...", area: true },
  { name: "skills", label: "Technical Skills", placeholder: "React, JavaScript, HTML, CSS, Python...", area: true },
  { name: "certification", label: "Certifications", placeholder: "Course name, certificate...", area: true },
  { name: "achievement", label: "Achievements", placeholder: "Awards, competitions, accomplishments...", area: true },
  { name: "hobby", label: "Hobbies & Interests", placeholder: "Reading, Travelling, Coding..." },
];

// Simple, clean input styling
const inputClass =
  "w-full mt-1 p-2 border border-gray-300 rounded text-sm focus:border-blue-500 outline-none";

// Simple section header styling
const sectionLabel = (title) => (
  <div className="border-b border-blue-500 pb-1 mb-3">
    <h2 className="text-sm font-bold uppercase text-blue-600 tracking-wide">
      {title}
    </h2>
  </div>
);

export default function Tamp2() {
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

      <div className="min-h-screen bg-gray-100 p-6 font-sans text-gray-800">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-6">

          {/* ================= FORM ================= */}
          <div className="lg:col-span-2 bg-white p-6 rounded shadow border border-gray-200">

            {/* HEADER */}
            <div className="mb-6">
              <p className="text-blue-600 text-xs font-semibold uppercase">
                Student Resume Builder
              </p>
              <h2 className="text-2xl font-bold text-gray-900">College CV</h2>
              <p className="text-gray-500 text-sm">
                Build your professional student resume
              </p>
            </div>

            <div>
              {/* PROFILE PHOTO */}
              <div className="mb-4">
                <label className="block text-xs font-bold text-gray-700 uppercase mb-2">
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
                      <span className="text-xs text-gray-400">Photo</span>
                    )}
                  </div>

                  <label className="cursor-pointer bg-white border border-gray-300 rounded px-3 py-1.5 text-sm font-medium hover:bg-gray-50">
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
                <div key={f.name} className="mb-3">
                  <label className="text-xs font-bold text-gray-700 uppercase">
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
                      <span className="px-3 py-2 border border-r-0 border-gray-300 rounded-l bg-gray-50 text-sm text-gray-600">
                        +91
                      </span>
                      <input
                        type="tel"
                        inputMode="numeric"
                        maxLength={10}
                        placeholder={f.placeholder}
                        value={resume.phone || ""}
                        onChange={(e) => handlePhone(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-r text-sm focus:border-blue-500 outline-none"
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
                className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white rounded py-2.5 font-bold transition"
              >
                SAVE / DOWNLOAD PDF
              </button>
            </div>
          </div>

          {/* ================= RESUME PREVIEW ================= */}
          <div
            id="resume-preview"
            className="lg:col-span-3 bg-white p-8 rounded shadow border border-gray-200 min-h-[800px]"
          >
            {/* HEADER */}
            <div className="border-b border-gray-200 pb-6 mb-6">
              <div className="flex justify-between items-start gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 uppercase">
                    {resume.name || "YOUR NAME"}
                  </h1>
                  <p className="text-blue-600 font-medium text-base mt-1">
                    {resume.jobTitle || "College Student | Aspiring Professional"}
                  </p>
                </div>

                {/* PHOTO */}
                <div className="w-20 h-20 border border-gray-300 rounded overflow-hidden shrink-0">
                  {resume.photo ? (
                    <img
                      src={resume.photo}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                      <span className="text-xs text-gray-400">Photo</span>
                    </div>
                  )}
                </div>
              </div>

              {/* CONTACT */}
              <div className="flex flex-wrap gap-4 text-xs text-gray-600 mt-4">
                <span>{resume.email || "your@email.com"}</span>
                <span>•</span>
                <span>+91 {resume.phone || "9876543210"}</span>
              </div>
            </div>

            {/* ================= CONTENT ================= */}
            <div>
              <section className="mb-6">
                {sectionLabel("About Me")}
                <p className="text-gray-700 text-sm leading-relaxed">
                  {resume.about ||
                    "Motivated college student eager to learn new technologies and build a successful career."}
                </p>
              </section>

              <section className="mb-6">
                {sectionLabel("Education")}
                <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                  {resume.education || "Your education details will appear here."}
                </p>
              </section>

              <section className="mb-6">
                {sectionLabel("Academic Projects")}
                <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                  {resume.projects || "Your academic projects will appear here."}
                </p>
              </section>

              <section className="mb-6">
                {sectionLabel("Internship & Training")}
                <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                  {resume.internship ||
                    "Your internship or training details will appear here."}
                </p>
              </section>

              <section className="mb-6">
                {sectionLabel("Technical Skills")}
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {resume.skills ? (
                    resume.skills.split(",").map((skill, index) => (
                      <span
                        key={index}
                        className="bg-gray-100 border border-gray-200 px-2.5 py-1 rounded text-xs text-gray-700"
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
                  {resume.achievement || "Your achievements will appear here."}
                </p>
              </section>

              <section>
                {sectionLabel("Interests")}
                <p className="text-gray-700 text-sm">
                  {resume.hobby || "Reading • Travelling • Coding • Music"}
                </p>
              </section>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}