"use server";

import {
  getFilterOptions,
  getProjectById,
  getProjectDetails,
  getProjectList,
} from "@/app/actions";
import { IGetProjectArg } from "@/app/actions/models";
import { getMarker } from "@/app/actions/project/getMarker";
import { getProjectFiles } from "@/app/actions/project/getProjectFiles";

export const getProject = async (filterData?: IGetProjectArg) => {
  const { data: projectList } = await getProjectList(filterData);
  const { data: projectDetails } = await getProjectDetails(filterData);
  return { projectList, projectDetails };
};

export const fetchFilterOptions = async () => {
  const { data } = await getFilterOptions();
  return data;
};

export const fetchProjectFiles = async (projectId: string | undefined) => {
  if (!projectId) return undefined;
  const { data: projectFiles } = await getProjectFiles(projectId);
  return projectFiles || [];
};
export const fetchProjectById = async (projectId: string | undefined) => {
  if (!projectId) return undefined;
  const { data: projectData } = await getProjectById(projectId);
  return projectData;
};

export const fetchMarker = async (subjectType?: string) => {
  const { marker } = await getMarker(subjectType);
  return marker;
};
