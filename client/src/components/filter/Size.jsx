import React, { useState } from 'react';

const Size = ({ onChange }) => {
  const sizes = ['XS', 'S', 'M', 'L', 'XL'];
  const [selectedSizes, setSelectedSizes] = useState([]);

  const toggleSize = (size) => {
    let updatedSizes;
    if (selectedSizes.includes(size)) {
      updatedSizes = selectedSizes.filter(s => s !== size);
    } else {
      updatedSizes = [...selectedSizes, size];
    }
    setSelectedSizes(updatedSizes);
    onChange && onChange(updatedSizes);
  };

  return (
    <div className="p-4">
      <h2 className="text-xl">Size</h2>
      <div className="flex gap-2 flex-wrap mt-3">
        {sizes.map((size) => (
          <button
            key={size}
            type="button"
            onClick={() => toggleSize(size)}
            className={`border rounded px-3 py-1 cursor-pointer transition-colors 
                            ${selectedSizes.includes(size)
                ? 'bg-black text-white border-black'
                : 'text-gray-600 hover:bg-gray-200 border-gray-300'
              }`}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Size;
