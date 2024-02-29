import Hero from "@/components/Landing_components/Hero";
import CompanyHighlites from "@/components/Landing_components/HiglihtesCompanies";


const LandingPage = () => {
  return (
    <div className="flex flex-col ">
      <div className="w-full bg-accenting dark:bg-grid-small-white/[0.2] bg-grid-small-black/[0.2] relative ">
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-background bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <section className="w-[90%] md:w-[85%] mx-auto relative ">
          <Hero />
        </section>
      </div>
        <CompanyHighlites />
    </div>
  );
};
export default LandingPage;
