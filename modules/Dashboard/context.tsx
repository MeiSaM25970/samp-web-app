"use client";
import { IGetProjectArg, IProject, IProjectDetail } from "@/app/actions/models";
import { queryKeys } from "@/constants/queryKeys";
import { useQuery } from "@tanstack/react-query";
import {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useState,
} from "react";
import { getProject } from "./getData";

interface IContext {
  projectList: IProject[] | undefined;
  projectDetails: IProjectDetail | undefined;
  filter: IGetProjectArg | undefined;
  loading: boolean;
  setFilter: Dispatch<SetStateAction<IGetProjectArg | undefined>>;
}
export const DashboardContext = createContext<IContext | undefined>(undefined);

export const DashboardProvider: FC<PropsWithChildren> = ({ children }) => {
  const [filter, setFilter] = useState<IGetProjectArg>();

  const get = async () => {
    const { projectDetails, projectList } = await getProject(filter);
    return {
      projectDetails,
      projectList,
    };
  };
  const { data, isLoading } = useQuery({
    queryKey: [queryKeys.getProjectList, filter],
    queryFn: get,
  });

  const contextValue: IContext = {
    filter,
    projectDetails: data?.projectDetails,
    projectList: data?.projectList,
    loading: isLoading,
    setFilter,
  };
  return (
    <DashboardContext.Provider value={contextValue}>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const data = useContext(DashboardContext);
  if (data) return data;
  else throw console.error("Dashboard provider not found");
};
