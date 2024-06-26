import { JobAxios, UserAxios } from "@/constants/axiosInstance";
import { JobPayload } from "@/types/types.jobReducer";
import { handleErrors } from "@/util/handleErrors";
import { uploadImageToCloudinary } from "@/util/uploadImage";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const addJob = createAsyncThunk(
  "job/add-job",
  async (sendPayload: JobPayload, { rejectWithValue }) => {
    try {
      const { data } = await JobAxios.post(`/api/v1/job`, sendPayload);
      return data;
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  }
);

export const getJobWithCompany = createAsyncThunk(
  "job/get-job-company",
  async (companyId: string, { rejectWithValue }) => {
    try {
      const { data } = await JobAxios.get(`/api/v1/get-jobs/${companyId}`);
      return data;
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  }
);

export const updateJob = createAsyncThunk(
  "job/update-job",
  async (
    payload: { id: string; sendPayload: JobPayload },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await JobAxios.patch(
        `/api/v1/job/${payload.id}`,
        payload.sendPayload
      );
      return data;
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  }
);

export const deleteJob = createAsyncThunk(
  "job/delete-job",
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await JobAxios.put(`/api/v1/job/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  }
);

export const getAllJobs = createAsyncThunk(
  "job/get-alljob",
  async (
    query: {
      page: number;
      pageSize: number;
      category?: string;
      employment?: string;
      search?: string;
      skills?: string[];
      location?: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await JobAxios.get(
        `/api/v1/job?page=${query.page}&pageSize=${query.pageSize}&location=${query.location}&category=${query.category}&employment=${query.employment}&search=${query.search}&skills=${query.skills}&`
      );

      return data;
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  }
);

export const getSpecificJob = createAsyncThunk(
  "job/get-onejob",
  async (id: string, { rejectWithValue }) => {
    try {
      const { data } = await JobAxios.get(`/api/v1/job/${id}`);
      return data;
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  }
);

export const applyJob = createAsyncThunk(
  "job/apply-job",
  async (
    sendPayload: { userId: string; jobId: string; resume: File },
    { rejectWithValue }
  ) => {
    try {
      sendPayload.resume = await uploadImageToCloudinary(sendPayload.resume);
      const { data } = await JobAxios.post(`/api/v1/applicants`, sendPayload);
      await UserAxios.patch(`/user/update-profile/${sendPayload.userId}`, {
        resumes: [sendPayload.resume],
      });
      return data;
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  }
);

export const getApplicants = createAsyncThunk(
  "job/all-applicants",
  async (
    sendPayload: { companyId: string; limit: number },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await JobAxios.get(
        `api/v1/applicants/${sendPayload.companyId}`
      );
      return data;
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  }
);

export const getOneApplicant = createAsyncThunk(
  "job/get-oneapplicant",
  async (
    sendData: { jobId: string; applicantId: string },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await JobAxios.get(
        `api/v1/applicants/${sendData.jobId}/${sendData.applicantId}`
      );
      return data;
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  }
);

export const shortListApplication = createAsyncThunk(
  "job/change-applicationstatus",
  async (
    sendPayload: {
      jobId: string;
      applicantId: string;
      payload: {
        title: string;
        description: string;
        joiningDate?: string;
        interviewDate?: Date;
        status:
          | "Applied"
          | "Inreview"
          | "Shortlisted"
          | "Interview"
          | "Selected"
          | "Rejected";
      };
    },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await JobAxios.put(
        `api/v1/applicants/${sendPayload.jobId}/${sendPayload.applicantId}`,
        sendPayload.payload
      );
      return data;
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  }
);

export const scheduleInterview = createAsyncThunk(
  "job/schedule-interview",
  async (
    sendPayload: {
      jobId: string;
      applicantId: string;
      payload: {
        time: string;
        title: string;
      };
    },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await JobAxios.patch(
        `api/v1/applicants/${sendPayload.jobId}/${sendPayload.applicantId}`,
        sendPayload.payload
      );
      return data;
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  }
);

export const fetchSelectedAndRejectedCandidates = createAsyncThunk(
  "job/selected-rejected-candidate",
  async (copmanyId: string, { rejectWithValue }) => {
    try {
      const { data } = await JobAxios.post(`api/v1/candidates`, {
        companyId: copmanyId,
      });
      return data;
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  }
);

export const updateInterviewFeedback = createAsyncThunk(
  "job/update-interview-feedbkac",
  async (
    sendData: {
      jobId: string;
      applicantId: string;
      interivewId: string;
      feedbackDescription: string;
      feedback: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const { data } = await JobAxios.put(
        `api/v1/interview-feedback`,
        sendData
      );
      return data;
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  }
);

export const getMyApplication = createAsyncThunk(
  "job/getapplication",
  async (userId: string, { rejectWithValue }) => {
    try {
      const { data } = await JobAxios.get(`api/v1/application/${userId}`);
      return data;
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  }
);

// http://localhost:5005/api/job-service/api/v1/saved-jobs
export const getBookMarkJobs = createAsyncThunk(
  "job/getbookmark",
  async (jobdId: string[], { rejectWithValue }) => {
    try {
      const { data } = await JobAxios.post(`api/v1/saved-jobs`, {
        jobIds: jobdId,
      });
      return data;
    } catch (error) {
      return rejectWithValue(handleErrors(error));
    }
  }
);
