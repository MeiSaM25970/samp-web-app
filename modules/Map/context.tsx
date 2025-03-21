"use client";
import {
  IGetProjectArg,
  IMapProject,
  IProjectDetail,
} from "@/app/actions/models";
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
import { fetchProjectDetails } from "./getData";

interface IContext {
  projectDetails: IProjectDetail | undefined;
  filter: IGetProjectArg | undefined;
  loading: boolean;
  mapProjectList: IMapProject[] | undefined;
  showFilter: boolean;
  currentProjectImage: string | undefined;
  setCurrentProjectImage: Dispatch<SetStateAction<string | undefined>>;
  setShowFilter: Dispatch<SetStateAction<boolean>>;
  setFilter: Dispatch<SetStateAction<IGetProjectArg | undefined>>;
}
export const MapContext = createContext<IContext | undefined>(undefined);

export const MapProvider: FC<PropsWithChildren> = ({ children }) => {
  const [filter, setFilter] = useState<IGetProjectArg>();
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [currentProjectImage, setCurrentProjectImage] = useState<string>();

  const get = async () => {
    const { projectDetails, mapProjectList } = await fetchProjectDetails(
      filter
    );
    return {
      projectDetails,
      mapProjectList,
    };
  };

  const { data, isLoading } = useQuery({
    queryKey: [queryKeys.getProjectList, filter],
    queryFn: get,
  });

  const contextValue: IContext = {
    filter,
    projectDetails: data?.projectDetails,
    loading: isLoading,
    mapProjectList: data?.mapProjectList,
    showFilter,
    currentProjectImage,
    setCurrentProjectImage,
    setShowFilter,
    setFilter,
  };
  return (
    <MapContext.Provider value={contextValue}>{children}</MapContext.Provider>
  );
};

export const useMap = () => {
  const data = useContext(MapContext);
  if (data) return data;
  else throw console.error("Map provider not found");
};
