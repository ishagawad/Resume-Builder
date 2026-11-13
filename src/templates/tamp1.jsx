import React, { useState } from "react";

const fields = [
  { name: "name", label: "Full Name", placeholder: "Your Full Name" },
  { name: "jobTitle", label: "Job Title", placeholder: "Software Developer" },
  { name: "email", label: "Email", placeholder: "your@email.com", type: "email" },
  { name: "phone", label: "Mobile Number", placeholder: "9876543210", type: "tel" },
  { name: "about", label: "Professional Summary", placeholder: "Write your professional summary...", area: true },
  { name: "experience", label: "Work Experience", placeholder: "Company, position, responsibilities...", area: true },
  { name: "education", label: "Education", placeholder: "Degree, college, year...", area: true },
  { name: "skills", label: "Skills", placeholder: "React, JavaScript, HTML, CSS...", area: true },
  { name: "hobby", label: "Hobbies", placeholder: "Reading, travelling..." },
];

const inputClass =
  "w-full mt-1 px-3 py-2 border border-gray-300 rounded text-sm outline-none focus:border-gray-900";

const Section = ({ title, children }) => (
  <section className="mt-6">
    <h2 className="text-sm font-semibold text-gray-900 border-b border-gray-300 pb-1 mb-2">{title}</h2>
    {children}
  </section>
);

export default function Tamp1() {
  const [resume, setResume] = useState({});
  const set = (name, value) => setResume((r) => ({ ...r, [name]: value }));

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
      <style>{`
        @media print {
          body * { visibility: hidden; }
          #resume-preview, #resume-preview * { visibility: visible; }
          #resume-preview { position: absolute; top: 0; left: 0; width: 100%; box-shadow: none; }
        }
      `}</style>

      <div className="min-h-screen bg-gray-100 p-4 md:p-8">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* FORM */}
          <div className="bg-white rounded-lg p-6 shadow-sm">
            <h1 className="text-xl font-semibold text-gray-900 mb-5">Resume Builder</h1>

            <div className="mb-4 flex items-center gap-3">
              <div className="w-14 h-14 rounded-full border border-gray-300 overflow-hidden bg-gray-100 flex items-center justify-center text-xs text-gray-400">
                {resume.photo ? (
                  <img src={resume.photo} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  "Photo"
                )}
              </div>
              <label className="cursor-pointer text-sm border border-gray-300 rounded px-3 py-1.5 hover:bg-gray-100">
                Upload photo
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

            {fields.map((f) => (
              <div key={f.name} className="mb-3">
                <label className="text-sm text-gray-700">{f.label}</label>

                {f.area ? (
                  <textarea
                    placeholder={f.placeholder}
                    value={resume[f.name] || ""}
                    onChange={(e) => set(f.name, e.target.value)}
                    className={`${inputClass} h-20 resize-none`}
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
                      className="w-full px-3 py-2 border border-gray-300 rounded-r text-sm outline-none focus:border-gray-900"
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

            <button
              onClick={() => window.print()}
              className="w-full mt-2 bg-gray-900 hover:bg-gray-700 text-white py-2.5 rounded text-sm font-medium"
            >
              Save as PDF
            </button>
          </div>

          {/* PREVIEW */}
          <div id="resume-preview" className="bg-white rounded-lg shadow-sm p-8 md:p-10 min-h-[700px]">
            <div className="flex items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{resume.name || "Your Name"}</h1>
                <p className="text-gray-500 mt-1">{resume.jobTitle || "Professional Position"}</p>
                <p className="text-sm text-gray-500 mt-3">
                  {resume.email || "your@email.com"} | +91 {resume.phone || "9876543210"}
                </p>
              </div>
              {resume.photo && (
                <img src={resume.photo} alt="Profile" className="w-24 h-24 rounded-full object-cover" />
              )}
            </div>

            <Section title="Profile">
              <p className="text-sm text-gray-600 leading-6 whitespace-pre-line">
                {resume.about || "Your professional summary will appear here."}
              </p>
            </Section>

            <Section title="Experience">
              <p className="text-sm text-gray-600 leading-6 whitespace-pre-line">
                {resume.experience || "Your work experience will appear here."}
              </p>
            </Section>

            <Section title="Education">
              <p className="text-sm text-gray-600 leading-6 whitespace-pre-line">
                {resume.education || "Your education details will appear here."}
              </p>
            </Section>

            <Section title="Skills">
              <p className="text-sm text-gray-600 leading-6">
                {resume.skills || "Your skills will appear here."}
              </p>
            </Section>

            <Section title="Interests">
              <p className="text-sm text-gray-600 leading-6">
                {resume.hobby || "Reading, travelling, music"}
              </p>
            </Section>
          </div>

        </div>
      </div>
    </>
  );
}