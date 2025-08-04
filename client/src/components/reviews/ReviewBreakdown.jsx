import React from 'react'

const ReviewBreakdown = () => {
    return (
        <div className="w-full md:w-1/2 space-y-2">
            <div className="text-3xl font-bold text-yellow-500">★ 4.1</div>
            <p className="text-sm text-gray-600">7,512 global ratings</p>


            <div className="space-y-2 mt-2">
                <div className="flex items-center gap-2 text-sm">
                    <span className="w-16">5 star</span>
                    <div className="w-full h-2 bg-gray-200 rounded">
                        <div className="h-2 bg-orange-400 rounded w-[58%]"></div>
                    </div>
                    <span>58%</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                    <span className="w-16">4 star</span>
                    <div className="w-full h-2 bg-gray-200 rounded">
                        <div className="h-2 bg-orange-400 rounded w-[21%]"></div>
                    </div>
                    <span>21%</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                    <span className="w-16">3 star</span>
                    <div className="w-full h-2 bg-gray-200 rounded">
                        <div className="h-2 bg-orange-400 rounded w-[8%]" ></div>
                    </div>
                    <span>8%</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                    <span className="w-16">2 star</span>
                    <div className="w-full h-2 bg-gray-200 rounded">
                        <div className="h-2 bg-orange-400 rounded w-[3%]"></div>
                    </div>
                    <span>3%</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                    <span className="w-16">1 star</span>
                    <div className="w-full h-2 bg-gray-200 rounded">
                        <div className="h-2 bg-orange-400 rounded w-[10%]"></div>
                    </div>
                    <span>10%</span>
                </div>
            </div>
        </div>
    )
}

export default ReviewBreakdown