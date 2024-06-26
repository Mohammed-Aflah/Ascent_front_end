import { applicationStatus } from "@/constants/applicationStatus";
import { RootState } from "@/redux/store";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/shadcn/ui/select";
import { Applicant, Job } from "@/types/types.jobReducer";
import { Video } from "lucide-react";
import { useSelector } from "react-redux";
import { ShortListModal } from "./Applications/ShortlistModal";

import { SelectingModal } from "./Applications/SelectingModal";
import { InterviewModal } from "./Applications/IntreviewModal";
import { RejectModal } from "./Applications/RejectModal";
import { format } from "date-fns";
import { InterviewShedule } from "@/components/company/InteviewSchedule";
import { convertTimeToAMPM } from "@/util/convertTimeAMPM";
import { CustomSelectItem } from "@/components/custom/customeSelectItem";
import { v4 } from "uuid";
import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { SocketContext } from "@/contexts/SocketContext";
import { UpdateFeedback } from "@/components/company/AddFeedbackModa";

export function ApplicantHiringStage() {
  const { job }: { job: Applicant } = useSelector(
    (state: RootState) => state.job
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ) as unknown as Job | Applicant | any;
  const { user } = useSelector((state: RootState) => state.userData);
  const { applicantId } = useParams();
  // const shortListBtnRef = useRef<HTMLButtonElement>(null);
  // const selectButtonRef = useRef<HTMLButtonElement>(null);
  // const interviewButton = useRef<HTMLButtonElement>(null);
  // const rejectedwButton = useRef<HTMLButtonElement>(null);
  // const handleStatusChange = (
  //   value: "Shortlisted" | "Interview" | "Rejected" | "Selected"
  // ) => {
  //   if (value === "Shortlisted") {
  //     shortListBtnRef.current?.click();
  //   } else if (value == "Selected") {
  //     selectButtonRef.current?.click();
  //   } else if (value == "Interview") {
  //     interviewButton.current?.click();
  //   } else if (value === "Rejected") {
  //     rejectedwButton.current?.click();
  //   }
  // };
  const navigate = useNavigate();
  const socket = useContext(SocketContext);
  function handleVideoCallButtonClick() {
    // to={`/company/${v4()}/`}
    const callerId = v4();
    navigate(`/company/${callerId}/`);
    socket?.emit("video-call", {
      callId: callerId,
      recieverId: applicantId,
      senderId: user?._id,
      message: "Interview Call",
      senderName: user?.name,
      senderProfile: user?.icon,
    });
  }
  return (
    <main className="w-full h-full">
      {/* <div className="hidden">
        <ShortListModal ref={shortListBtnRef} />
        <SelectingModal ref={selectButtonRef} />
        <InterviewModal ref={interviewButton} />
        <RejectModal ref={rejectedwButton} />
      </div> */}
      <div className="maintxt w-full min-h-56 p-1 space-y-2 ">
        <div className="flex justify-between ">
          <h1 className="text-2xl font-semibold">Current stage</h1>
          <Select>
            <SelectTrigger className="w-[170px] px-4 rounded-md ">
              <SelectValue placeholder="Selecte Hiring stage" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel className="text-primary bg-primary/5 m-3">
                  Stages
                </SelectLabel>
                <CustomSelectItem className="cursor-pointer flex justify-center">
                  <ShortListModal />
                </CustomSelectItem>
                <CustomSelectItem className="cursor-pointer">
                  <InterviewModal />
                </CustomSelectItem>
                <CustomSelectItem className="cursor-pointer">
                  <RejectModal />
                </CustomSelectItem>
                <CustomSelectItem className="cursor-pointer">
                  <SelectingModal />
                </CustomSelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div className="w-full h-12 flex gap-2 mt-2 ">
          {applicationStatus.map((value, index) => (
            <div
              key={index}
              className={`w-28 h-10 flex items-center justify-center  ${
                index !== 0 && "-skew-x-12"
              } ${
                value === job?.applicants?.hiringstage
                  ? "bg-primary text-white"
                  : "bg-primary/10"
              } `}
            >
              {value}
            </div>
          ))}
        </div>
        <div className="w-full">
          <div className="w-full mt-2">
            <h3 className="font-semibold text-lg">Stage Info</h3>
          </div>
          <div className="w-full flex flex-col">
            <span className="text-textPrimary">Interview date</span>
            <h3>
              {job?.applicants?.hiringstage === "Interview" ||
              job?.applicants?.hiringstage === "Selected"
                ? format(job?.applicants.interviewDate, "PPP")
                : `_Not mentioned_`}
            </h3>
          </div>
        </div>
      </div>
      <div
        className={`min-h-80 w-full overflow-y-auto p-1 space-y-3 ${
          job?.applicants?.hiringstage !== "Interview" &&
          // job?.applicants?.hiringstage !== "Selected" &&
          "pointer-events-none  opacity-30 select-none border-t"
        }`}
      >
        <div className="w-full h-12 flex justify-between">
          <h2 className="text-lg font-semibold">Interview List</h2>
          <div className="flex gap-2">
            <div
              onClick={handleVideoCallButtonClick}
              className="min-w-36 h-12 flex items-center justify-center gap-2 text-primary bg-primary/5 px-3 cursor-pointer"
            >
              Start interview
              <Video className="w-5" />
            </div>
            <InterviewShedule />
          </div>
        </div>
        <div className="w-full">
          {job?.applicants?.interviewSchedules?.map((value) => (
            <div className="w-full h-28 relative " key={value._id}>
              {/* <div className="w-full">Tomorrow - 10 july 2024</div> */}
              <div className="w-full">
                {format(
                  job?.applicants?.interviewDate as string | number | Date,
                  "PPP"
                )}
              </div>
              <div className="h-24 py-2  space-y-2">
                <div className="w-full h-full border flex items-center justify-between px-5">
                  <div className=" flex flex-col gap-2">
                    <h4 className="font-semibold">
                      {convertTimeToAMPM(value.time)} AM {value.title}
                    </h4>
                    <span>Online Interview</span>
                  </div>
                  <div className=" flex flex-col gap-2">
                    <h4 className="font-semibold">Type of review</h4>
                    <span>{value.title}</span>
                  </div>
                  <div className=" flex flex-col gap-2">
                    <h4 className="font-semibold">Feedback title</h4>
                    <span>{value.feedback?value.feedback:""}</span>
                  </div>
                  <UpdateFeedback interviewId={value._id} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
