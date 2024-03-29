import { Job } from "@/types/types.jobReducer";

import { useEffect, useState } from "react";
import { Bookmark, Sparkles } from "lucide-react";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { getSpecificJob } from "@/redux/actions/jobActions";
interface ChildProp {
  jobData: Job;
}
export function JobCompanyCard2({ jobData }: ChildProp) {
  const [job, setJob] = useState<Job>();
  useEffect(() => {
    setJob(jobData);
  }, [jobData]);
  const dispatch: AppDispatch = useDispatch();
  const hadleClick = (id: string) => {
    dispatch(getSpecificJob(id));
  };
  return (
    <div
      className="w-full h-36 border  flex justify-center items-center hover:bg-backgroundAccent transition-all duration-500 cursor-pointer rounded-[5px]"
      onClick={() => hadleClick(job?._id ?? "")}
    >
      <div className="w-[95%] h-[80%] flex justify-between">
        <div className="flex items-start w-20  ">
          <img
            src={job?.company?.icon}
            alt=""
            className="h-8  object-cover rounded-full "
          />
        </div>
        <div className="w-full flex flex-col  gap-1 ">
          <div>
            <h1 className="maintxt text-sm  ">{job?.company?.name}</h1>
          </div>
          <div className="flex gap-4 ">
            <div>
              <h2 className="company_text font-semibold text-lg">
                {job?.jobTitle}
              </h2>
            </div>
          </div>
          <div className="maintxt flex gap-1">
            {/* <MapPin className="w-4 text-textPrimary" /> */}
            {job?.joblocation}
          </div>
          <div>
            <h1 className="maintxt">
              INR {job?.salaryrange.from} - {job?.salaryrange.to} (Employ st)
            </h1>
          </div>
        </div>
        <div className="w-60 flex flex-col items-end  gap-2  justify-between">
          <Bookmark />
          <div className="maintxt text-green-600 flex gap-1">
            <Sparkles className="w-4" />
            <span>Easy Apply</span>
          </div>
        </div>
      </div>
    </div>
  );
}
