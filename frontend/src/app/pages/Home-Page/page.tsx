import Header from "@/app/components/home-page/Header";
import HeroSection from "@/app/components/home-page/HeroSection";
import HowItWorks from "@/app/components/home-page/HowItWorks";
import RolesCarousel from "@/app/components/home-page/Roles-carousel";

export default function HomePage() {
	return (
		<main className="bg-black text-white">
			<Header />
			<HeroSection />
			<RolesCarousel />
			<HowItWorks />
		</main>
	)
}
