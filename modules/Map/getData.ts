"use server";

import { getProjectDetails } from "@/app/actions";
import { IGetProjectArg } from "@/app/actions/models";

export const fetchProjectDetails = async (filterData?: IGetProjectArg) => {
  const { data: projectDetails } = await getProjectDetails(filterData);
  return { projectDetails };
};
