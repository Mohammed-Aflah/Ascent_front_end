import { ExploreByCategory } from "@/components/Landing_components/ExploreByCategory";
import Hero from "@/components/Landing_components/Hero";
import CompanyHighlites from "@/components/Landing_components/HiglihtesCompanies";
// import { JobPostDisplaySection } from "@/components/Landing_components/JobPostBox";
import { RootState } from "@/redux/store";
import { Skeleton } from "@/shadcn/ui/skeleton";
import { useSelector } from "react-redux";

const LandingPage = () => {
  const { user } = useSelector((state: RootState) => state.userData);
  return (
    <div className="flex flex-col  ">
      <div
        className={`w-full  ${
          !user &&
          "dark:bg-dot-white/[0.2] bg-dot-black/[0.2] relative bg-accenting"
        } `}
      >
        {!user && (
          <div className="absolute pointer-events-none inset-0 flex items-center justify-center   [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        )}
        <section
          className={`${
            !user ? "w-[90%] md:w-[85%]" : "w-[95%] md:w-[95%]"
          } mx-auto relative `}
        >
          <Hero />
        </section>
      </div>
      <CompanyHighlites />
      <ExploreByCategory />
      <main
        className={`${
          !user ? "w-[90%] md:w-[85%]" : "w-[95%] md:w-[95%]"
        } h-56 mx-auto mt-10 rounded-md mb-10`}
      >
        <Skeleton className="h-full w-full" />
      </main>
      <main
        className={`${
          !user ? "w-[90%] md:w-[85%]" : "w-[95%] md:w-[95%]"
        } h-56 mx-auto mt-10 rounded-md mb-10`}
      >
        <Skeleton className="h-full w-full" />
      </main>

      {/* <JobPostDisplaySection/> */}
    </div>
  );
};
export default LandingPage;
