import HeroCarousel from "../components/Home/Carousel/HeroCarousel";
import Category from "../components/Home/Categories/Category";
import DiscountSection from "../components/Home/Discount/DiscountSection";
import Features from "../components/Home/Features"
import Products from "../components/Products/Products";

const Home = () => {
  return (
    <div>
      <HeroCarousel />
      <Features />
      <Category />
      <Products />
      <DiscountSection />
    </div>
  );
};

export default Home;