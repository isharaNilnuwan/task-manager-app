"use client";
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const handleClick = () => {
    router.push('/tasks');
  };

  return (
    // <div className="flex items-center justify-center h-screen">

    //   <button
    //     onClick={handleClick}
    //     className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition-colors duration-300"
    //   >
    //     Go to Task Manager App
    //   </button>
    // </div>
     <div className="flex flex-col items-center justify-center h-screen p-4">
     <h1 className="text-3xl font-bold text-gray-800 mb-6">
       Feeling overwhelmed with your to-do list?
     </h1>
     <p className="text-lg text-gray-600 mb-8">
       Simplify your life and take control of your tasks with our intuitive task manager.
     </p>
     <button onClick={handleClick}
       className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition-colors duration-300"
     >
       Manage My Tasks
     </button>
   </div>
  );
}
