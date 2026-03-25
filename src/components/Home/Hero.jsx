import {Link} from 'react-router';
import { ShoppingCart, TrendingUp, Users, Package } from 'lucide-react';

const Hero = () => {
  const features = [
    {
      icon: ShoppingCart,
      title: 'Easy Shopping',
      description: 'Browse and buy from our wide selection of products',
    },
    {
      icon: TrendingUp,
      title: 'Best Prices',
      description: 'Get the best deals and discounts on quality products',
    },
    {
      icon: Users,
      title: 'Customer Support',
      description: '24/7 support team ready to help you anytime',
    },
    {
      icon: Package,
      title: 'Fast Delivery',
      description: 'Quick and reliable delivery to your doorstep',
    },
  ];

  return (
    <main className="bg-linear-to-b from-slate-50 to-white sm:mb-20">
      {/* Hero Section */}
      <section className="px-4 pt-20 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 mb-6 text-balance">
            Welcome to PhiMart
          </h1>
          <p className="text-xl text-gray-600 mb-8 text-balance">
            Your one-stop shop for quality products at unbeatable prices
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/shop">
              <button className="bg-primary text-white font-semibold py-3 px-6 rounded-lg transition-colors cursor-pointer">
                Shop Now
              </button>
            </Link>
            <Link to="/about">
              <button className="bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold py-3 px-6 rounded-lg transition-colors cursor-pointer">
                Learn More
              </button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-lg border border-gray-200 hover:border-gray-300 bg-white hover:shadow-lg transition-all"
              >
                <Icon className="w-8 h-8 text-primary mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default Hero;
