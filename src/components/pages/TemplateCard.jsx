import { NavLink } from "react-router-dom";
import img1 from "../../assets/img1.jpg";
import img2 from "../../assets/img2.jpg";
import img3 from "../../assets/img3.jpg";
import img4 from "../../assets/img4.jpg";


const IMAGES = {
  modern: img1,
  professional: img2,
  minimal: img3,
  creative: img4,
};

function TemplateCard({ template }) {
  return (
    <div className="rounded-xl border border-stone-200 bg-white shadow-sm overflow-hidden flex flex-col">
      <img
        src={IMAGES[template.id]}
        alt={template.name}
        className="w-full h-50 object-cover"
      />
      <div className="flex-1 flex flex-col ">
        <h2 className="text-sm font-semibold px-4 pt-4">{template.name}</h2>
        <p className="text-xs text-gray-500 px-4 pt-1 flex-1">
          {template.blurb}
        </p>
        <NavLink
          to={template.route}
          className="m-4 rounded-lg bg-[#c3b9a5] py-2.5 text-center text-sm font-medium text-gray-800 hover:opacity-90"
        >
          Use this template
        </NavLink>
      </div>
    </div>
  );
}

export default TemplateCard;