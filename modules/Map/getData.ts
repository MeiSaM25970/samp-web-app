"use server";

import { getProjectById, getProjectDetails } from "@/app/actions";
import { IGetProjectArg } from "@/app/actions/models";
import { getMapProjectList } from "@/app/actions/project/getMapData";
import { getProjectFiles } from "@/app/actions/project/getProjectFiles";

export const fetchProjectDetails = async (filterData?: IGetProjectArg) => {
  const { data: projectDetails } = await getProjectDetails(filterData);
  const { data: mapProjectList } = await getMapProjectList(filterData);
  return { projectDetails, mapProjectList };
};
export const fetchProjectFiles = async (projectId: string | undefined) => {
  const { data: projectFiles } = await getProjectFiles("25800");
  return projectFiles || [];
};
export const fetchProjectById = async (projectId: string | undefined) => {
  if (!projectId) return undefined;
  const { data: projectData } = await getProjectById(projectId);
  return projectData;
};
