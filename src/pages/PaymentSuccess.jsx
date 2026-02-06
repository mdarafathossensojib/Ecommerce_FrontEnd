import { Link } from "react-router";

const PaymentSuccess = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                <h1 className="text-2xl font-bold text-center mb-4">Payment Successful!</h1>
                <p className="text-gray-700 text-center mb-6">Your payment has been processed successfully.</p>
                <Link to="/shop" className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors">
                    Continue Shopping
                </Link>
                <Link to="/dashboard" className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors ml-2">
                    Go to Dashboard
                </Link>
            </div>
        </div>
    );
};

export default PaymentSuccess;