"use server";

import { getProjectDetails, getProjectList } from "@/app/actions";
import { IGetProjectArg } from "@/app/actions/models";

export const getProject = async (filterData?: IGetProjectArg) => {
  const { data: projectList } = await getProjectList(filterData);
  const { data: projectDetails } = await getProjectDetails(filterData);
  return { projectList, projectDetails };
};
