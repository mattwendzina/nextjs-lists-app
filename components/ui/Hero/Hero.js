import Link from 'next/link';

const Hero = () => {
    return (
        <div className="border border-gray-200 shadow-md p-1 flex flex-col md:flex-row md:align-center md:justify-center ">
            <div className="flex items-center justify-center text-5xl flex-1 hover:bg-teal-600 cursor-pointer duration-500 ease-in-out hover:text-yale-blue-900">
                <Link href="/lists">Select a List</Link>
            </div>
            <div className="flex items-center justify-center text-5xl flex-1 hover:bg-teal-600 cursor-pointer duration-500 ease-in-out hover:text-yale-blue-900">
                <Link href="/createList">Create a List</Link>
            </div>
        </div>
    );
};

export default Hero;
