"use client";
import {
  IGetProjectArg,
  IProject,
  IProjectById,
  IProjectDetail,
} from "@/app/actions/models";
import { queryKeys } from "@/constants/queryKeys";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createContext,
  Dispatch,
  FC,
  PropsWithChildren,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { fetchProjectById, getProject } from "./getData";
import { Flex, Modal, Spin } from "antd";
import { ProjectInfo } from "./components/projectInfo/ProjectInfo";
import { useMediaQuery } from "react-responsive";
import { breakPointsMd } from "@/constants/screen";

interface IContext {
  projectList: IProject[] | undefined;
  projectDetails: IProjectDetail | undefined;
  filter: IGetProjectArg | undefined;
  loading: boolean;
  showFilter: boolean;
  projectId: string | undefined;
  search: string | undefined;
  setSearch: Dispatch<SetStateAction<string | undefined>>;
  setProjectId: Dispatch<SetStateAction<string | undefined>>;
  setFilter: Dispatch<SetStateAction<IGetProjectArg | undefined>>;
  setShowFilter: Dispatch<SetStateAction<boolean>>;
}
export const DashboardContext = createContext<IContext | undefined>(undefined);

export const DashboardProvider: FC<PropsWithChildren> = ({ children }) => {
  const [filter, setFilter] = useState<IGetProjectArg>();
  const [showFilter, setShowFilter] = useState<boolean>(false);
  const [projectId, setProjectId] = useState<string | undefined>();
  const [project, setProject] = useState<IProjectById | undefined>();
  const isMobile = useMediaQuery({ maxWidth: breakPointsMd });
  const [projectList, setProjectList] = useState<IProject[]>([]);
  const [search, setSearch] = useState<string>();
  const get = async () => {
    const { projectDetails, projectList } = await getProject(filter);
    if (projectList) setProjectList(projectList);
    return {
      projectDetails,
      projectList,
    };
  };
  const { data, isLoading } = useQuery({
    queryKey: [queryKeys.getProjectList, filter],
    queryFn: get,
  });
  const { mutate: getById, isPending: getByIdLoading } = useMutation({
    mutationFn: async (id: string) => {
      return await fetchProjectById(id);
    },
    onSuccess: (data) => {
      setProject(data);
    },
  });
  useEffect(() => {
    if (projectId) {
      getById(projectId);
    } else {
      setProject(undefined);
    }
  }, [getById, projectId]);

  useEffect(() => {
    if (search) {
      const list = data?.projectList || [];
      const filtered = list.filter(
        (item) =>
          item.Prj_ID.toLowerCase().includes(search.toLowerCase()) ||
          item.Prj_Name.toLowerCase().includes(search.toLowerCase())
      );
      setProjectList(filtered);
    } else {
      setProjectList(data?.projectList || []);
    }
  }, [data?.projectList, search]);
  const contextValue: IContext = {
    filter,
    projectDetails: data?.projectDetails,
    projectList,
    loading: isLoading,
    projectId,
    search,
    showFilter,
    setSearch,
    setProjectId,
    setFilter,
    setShowFilter,
  };
  return (
    <DashboardContext.Provider value={contextValue}>
      <Modal
        open={!!projectId}
        onCancel={() => {
          setProject(undefined);
          setProjectId(undefined);
        }}
        footer={null}
        style={{ top: 8 }}
        width={isMobile ? "auto" : "50%"}
      >
        {getByIdLoading ? (
          <Flex justify="center" align="center" className="h-[300px]">
            <Spin size="small" />
          </Flex>
        ) : (
          <ProjectInfo project={project} />
        )}
      </Modal>
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  const data = useContext(DashboardContext);
  if (data) return data;
  else throw console.error("Dashboard provider not found");
};
