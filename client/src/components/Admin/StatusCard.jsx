import React from 'react';

const StatusCard = ({ orders }) => {
    // Count orders by status
    const countByStatus = (status) =>
        orders.filter(order => order.status === status).length;

    return (
        <div className='flex flex-wrap gap-3 mt-4'>
            {/* Pending Acceptance */}
            <div className='bg-white h-[100px] w-[300px] shadow-md border border-gray-200 flex items-center p-4'>
                <div>
                    <i className="fas fa-cogs text-5xl"></i>
                </div>
                <div className='p-2'>
                    <h2 className='text-lg'>Pending Acceptance</h2>
                    <p className='text-gray-500'>{countByStatus('placed')}</p>
                </div>
            </div>

            {/* Waiting to Ship */}
            <div className='bg-white h-[100px] w-[300px] shadow-md border border-gray-200 flex items-center p-4'>
                <div>
                    <i className="fas fa-hourglass-half text-5xl"></i>
                </div>
                <div className='p-2'>
                    <h2 className='text-lg'>Waiting to Ship</h2>
                    <p className='text-gray-500'>{countByStatus('confirmed')}</p>
                </div>
            </div>

            {/* Out for Delivery */}
            <div className='bg-white h-[100px] w-[300px] shadow-md border border-gray-200 flex items-center p-4'>
                <div>
                    <i className="fas fa-truck text-5xl"></i>
                </div>
                <div className='p-2'>
                    <h2 className='text-lg'>Out for Delivery</h2>
                    <p className='text-gray-500'>{countByStatus('out-for-delivery')}</p>
                </div>
            </div>
        </div>
    );
};

export default StatusCard;
