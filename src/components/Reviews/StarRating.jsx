import { FaStar } from "react-icons/fa";


const StarRating = ({ rating, onChange }) => {
    return (
        <div className="flex space-x-1 mb-2">
            {[...Array(5)].map((_, index) => {
                const value = index + 1;
                return (<FaStar onClick={() => onChange(value)} key={value} size={24} className={`cursor-pointer transition-colors duration-200 ${value <= rating ? "text-yellow-300" : "text-gray-300"} hover:text-yellow-300`} />);
            })}
        </div>
    );
};

export default StarRating;