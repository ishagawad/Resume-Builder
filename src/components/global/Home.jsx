import { useNavigate } from "react-router-dom";
import { TEMPLATES } from "../data/data";
import TemplateCard from "../pages/TemplateCard";


export default function Home() {
    const navigate = useNavigate();

    const handleTemplateSelect = (template) => {
        navigate(`/editor/${template.id}`);
    };

    return (
        <div className="min-h-screen bg-[#F2EEE6]">
            <header className="border-b border-stone-400 bg-[#e0d3bb]">
                <div className="mx-auto flex max-w-6xl items-center justify-between px-2 py-7">
                    <div className="flex items-center gap-2">
                        {/* <FileText size={21} /> */}
                        <span className="font-semibold">ResumeBuilder</span>
                    </div>

                    <nav className="flex items-center gap-6">
                        <button onClick={() => navigate("/")} className="text-sm text-stone-500 hover:text-stone-900">
                            Home
                        </button>
                        <button onClick={() => navigate("/create")} className="text-sm text-stone-500 hover:text-stone-900">
                            Create
                        </button>
                    </nav>
                </div>
            </header>
            <main className="mx-auto max-w-5xl px-6 py-10">

                <h1 className="text-3xl font-semibold tracking-tight text-stone-900">
                    Choose a Template
                </h1>

                <p className="mt-2 text-sm text-stone-500">
                    Select a template that best represents your professional style.
                </p>

                <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {TEMPLATES.map((template) => (
                        <TemplateCard
                            key={template.id}
                            template={template}
                            onSelect={() => handleTemplateSelect(template)}
                        />
                    ))}
                </div>

            </main>
        </div>
    );
}