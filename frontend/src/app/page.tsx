import Header from "./components/Header"
import HeroSection from "./pages/HeroSection"
import HowItWorks from "./pages/HowItWorks"
import RolesCarousel from "./pages/Roles-carousel"

export default function Home() {
	return (
		<main className="bg-black text-white">
			<Header />
			<HeroSection />
      <RolesCarousel/>
      <HowItWorks/>
		</main>
	)
}
