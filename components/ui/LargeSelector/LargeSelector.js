import Link from 'next/link';

const Hero = (props) => {
    const { link, title } = props;

    return (
        <div className="flex items-center justify-center text-5xl flex-1 hover:bg-teal-600 cursor-pointer duration-500 ease-in-out hover:text-yellow-red-900">
            <Link href={link}>{title}</Link>
        </div>
    );
};

export default Hero;
