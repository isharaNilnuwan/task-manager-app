import React from 'react';
import Link from 'next/link';
import { Cardano, Chart1, DirectInbox, Home, Setting2, TaskSquare } from 'iconsax-react';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {

    const sideMenues = [
        {
            name: "Home",
            svgUrl: <Home size="31" color="#FF8A65"/>,
            path: "/"
        },
        {
            name: "Tasks",
            svgUrl: <TaskSquare size="31" color="#FF8A65"/>,
            path: "/tasks"
        },
        {
            name: "Report",
            svgUrl: <Chart1 size="31" color="#FF8A65"/>,
            path: "/report"
        },
        {
            name: "Insight",
            svgUrl: <Cardano size="31" color="#FF8A65"/>,
            path: "/insight"
        },
        {
            name: "Inbox",
            svgUrl: <DirectInbox size="31" color="#FF8A65"/>,
            path: "/inbox"
        },
        {
            name: "Settings",
            svgUrl: <Setting2 size="31" color="#FF8A65"/>,
            path: "/settings"
        }
    ];


    //to-do :use a portal to set the nav bar search element to set dynamically
    return (
        <div className="flex h-screen bg-gray-100 min-w-[1058px]">
            {/* Sidebar */}
            <div className="hidden md:flex flex-col w-80 bg-white">
                <div className="flex items-center justify-center h-16 border-r border-b">
                    <span className="text-black font-bold ">Code94 Labs</span>
                </div>
                <div className="flex flex-col flex-1 overflow-y-auto border-r">
                    <nav className="flex-1 px-7 py-4">
                        {sideMenues.map((menu) => (
                            <Link
                                key={menu.name}
                                href={menu.path}
                                className="flex items-center px-4 py-2 text-gray-600 hover:bg-blue-500 hover:text-gray-100 bg-gray-100 mt-3 rounded font-inter gap-3"
                            >
                                {menu.svgUrl}
                                {menu.name}
                            </Link>
                        ))}
                    </nav>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex flex-col flex-1 overflow-y-auto">
                <header className="flex items-center justify-between h-16 bg-white border-b border-gray-200">
                    <div className="flex items-center px-4">
                        <button className="text-gray-500 focus:outline-none focus:text-gray-700" aria-label="Toggle Sidebar ">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                        <input className="mx-4 w-full border rounded-md px-4 py-2" type="text" placeholder="Search" aria-label="Search" />
                    </div>
                    <div className="flex items-center pr-4">
                        <button className="flex items-center text-gray-500 hover:text-gray-700 focus:outline-none focus:text-gray-700" aria-label="Logout">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l-7-7 7-7m5 14l7-7-7-7" />
                            </svg>
                        </button>
                    </div>
                </header>
                <main className="flex-1 p-4 overflow-y-auto">
                    {children}
                </main>
            </div>
        </div>
    );
};

export default MainLayout;
