import HeroCarousel from "../components/Home/Carousel/HeroCarousel";
import Category from "../components/Home/Categories/Category";
import DiscountSection from "../components/Home/Discount/DiscountSection";
import Features from "../components/Home/Features"
import Hero from "../components/Home/Hero";
import Products from "../components/Products/Products";

const Home = () => {
  return (
    <div>
      <Hero />
      <HeroCarousel />
      <Features />
      <Category />
      <Products />
      <DiscountSection />
    </div>
  );
};

export default Home;