"use server";

import { getProjectDetails } from "@/app/actions";
import { IGetProjectArg } from "@/app/actions/models";
import { getMapProjectList } from "@/app/actions/project/getMapData";

export const fetchProjectDetails = async (filterData?: IGetProjectArg) => {
  const { data: projectDetails } = await getProjectDetails(filterData);
  const { data: mapProjectList } = await getMapProjectList(filterData);
  return { projectDetails, mapProjectList };
};
