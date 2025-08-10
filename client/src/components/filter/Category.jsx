import React, { useState } from 'react';

const Category = ({ categoryName, categoryList, onChange }) => {
    const [selectedCategory, setSelectedCategory] = useState("");

    const handleSelect = (category) => {
        const value = category === selectedCategory ? "" : category;
        setSelectedCategory(value);
        onChange && onChange(value);
    };

    return (
        <div className="p-4">
            <h2 className="text-xl">{categoryName}</h2>
            <div className="mt-3 text-gray-600">
                {categoryList.map(category => (
                    <div className="flex items-center gap-2" key={category}>
                        <input
                            type="radio"
                            id={category.toLowerCase().replace(/\s+/g, '-')}
                            checked={selectedCategory === category}
                            onChange={() => handleSelect(category)}
                            name={categoryName} // groups them
                        />
                        <label htmlFor={category.toLowerCase().replace(/\s+/g, '-')}>
                            {category}
                        </label>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Category;
