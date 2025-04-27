// Subcategory List Component
import { Link } from "react-router-dom";

const SubcategoryList = ({ title, items }) => (
  <div className="space-y-3">
    <h3 className="font-semibold text-gray-800 mb-2">{title}</h3>
    <ul className="space-y-2 text-sm">
      {items.map((item, index) => (
        <li key={index}>
          <Link
            to={item.path || "#"}
            className="flex justify-between items-center text-gray-600 hover:text-[#3F66BC]"
          >
            <span>{item.name}</span>
            {item.count && (
              <span className="text-[#3F66BC] text-sm">({item.count})</span>
            )}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

export default SubcategoryList;
