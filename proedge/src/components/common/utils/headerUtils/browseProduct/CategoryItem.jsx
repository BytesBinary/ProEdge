import RightArrowIcon from "./icons/RightArrowIcon";

const CategoryItem = ({ icon, title, onClick }) => (
  <div className="group w-full">
    <div
      className="block group/item p-4 hover:bg-[#3F66BC] cursor-pointer transition-colors min-h-[64px]"
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={icon}
            alt={title}
            className="w-14 h-14 rounded-full object-cover"
          />
          <span className="text-[#182B55] font-medium group-hover/item:text-white">
            {title}
          </span>
        </div>
        <RightArrowIcon className="text-[#182B55] group-hover/item:text-white transition-colors" />
      </div>
    </div>
  </div>
);

export default CategoryItem;
