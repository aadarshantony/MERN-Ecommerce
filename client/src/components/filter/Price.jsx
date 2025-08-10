import React, { useState } from 'react';

const Price = ({ onChange }) => {
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(5000);

    const handleMinChange = (e) => {
        const value = Number(e.target.value);
        setMinPrice(value);
        onChange && onChange(value, maxPrice);
    };

    const handleMaxChange = (e) => {
        const value = Number(e.target.value);
        setMaxPrice(value);
        onChange && onChange(minPrice, value);
    };

    return (
        <div className="p-4">
            <h2 className="text-xl">Price (₹)</h2>

            {/* Min / Max Input Fields */}
            <div className="flex items-center gap-4 mt-2">
                <input
                    type="number"
                    min="0"
                    max={maxPrice}
                    value={minPrice}
                    onChange={handleMinChange}
                    className="w-24 border border-gray-300 rounded px-2 py-1 text-sm"
                />
                <span>-</span>
                <input
                    type="number"
                    min={minPrice}
                    max="5000"
                    value={maxPrice}
                    onChange={handleMaxChange}
                    className="w-24 border border-gray-300 rounded px-2 py-1 text-sm"
                />
            </div>

            {/* Range Sliders */}
            <input
                type="range"
                min="0"
                max="5000"
                step="50"
                value={minPrice}
                onChange={handleMinChange}
                className="w-full h-2 cursor-pointer bg-gray-200 rounded-lg mt-3"
            />
            <input
                type="range"
                min="0"
                max="5000"
                step="50"
                value={maxPrice}
                onChange={handleMaxChange}
                className="w-full h-2 cursor-pointer bg-gray-200 rounded-lg mt-2"
            />

            {/* Price Labels */}
            <div className="flex justify-between text-sm text-gray-600 mt-2">
                <span>₹{minPrice.toLocaleString('en-IN')}</span>
                <span>₹{maxPrice.toLocaleString('en-IN')}+</span>
            </div>
        </div>
    );
};

export default Price;
