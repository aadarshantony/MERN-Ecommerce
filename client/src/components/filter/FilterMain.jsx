import { useState } from "react";
import Category from "./Category";
import Price from "./Price";
import Size from "./Size";

const FilterMain = ({ isFilterOpen, onFilterApply }) => {
    const [filters, setFilters] = useState({
        category: [],
        subCategory: [],
        size: [],
        priceMin: "",
        priceMax: ""
    });

    const updateFilter = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    const applyFilters = () => {
        onFilterApply(filters); // Send filters to parent
    };

    return (
        <aside
            className={`border-1 border-gray-200 shadow-md w-64 overflow-scroll h-screen bg-white md:shadow-xl ${isFilterOpen ? "max-lg:absolute" : "max-lg:hidden"
                }`}
        >
            <div className="border-b-1 p-4 border-b-gray-200">
                <h2 className="text-xl font-bold">Filter</h2>
            </div>

            <Category
                categoryName="Category"
                categoryList={["Mens Wear", "Womens Wear", "Kids Wear"]}
                onChange={(value) => updateFilter("category", value)}
            />
            <Category
                categoryName="Sub Category"
                categoryList={["Tops", "Shirts", "Jackets", "Pants", "Skirts"]}
                onChange={(value) => updateFilter("subCategory", value)}
            />
            <Price
                onChange={(min, max) => {
                    updateFilter("priceMin", min);
                    updateFilter("priceMax", max);
                }}
            />
            <Size onChange={(sizes) => updateFilter("size", sizes)} />

            <button
                onClick={applyFilters}
                className="m-4 px-4 py-2 bg-black text-white rounded cursor-pointer"
            >
                Apply Filters
            </button>
        </aside>
    );
};

export default FilterMain;
