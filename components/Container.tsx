import React from 'react';

function Container({children}: {children: React.ReactNode}) {
    return (
        <div className="flex-1 flex flex-col md:flex-row gap-6 items-center pb-[20px] md:pb-[180px]">
            {children}
        </div>
    );
}

export default Container;
