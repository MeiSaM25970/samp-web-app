"use client";
import { IProjectFile } from "@/app/actions/models/project/getProjectFiles";
import { Flex, Image, Spin } from "antd";
import { FC } from "react";
import { FilesContainer } from "../styles/files.style";

interface IProps {
  projectFiles: IProjectFile[] | undefined;
  loading: boolean;
}
const imageExtension = ["png", "jpg", "jpeg", "gif", "bmp", "svg"];
export const FilesComponent: FC<IProps> = ({ projectFiles, loading }) => {
  if (loading) return <Spin size="small">درحال بارگذاری</Spin>;
  if (!projectFiles || !projectFiles.length) {
    return <div>فایلی وجود ندارد.</div>;
  }
  return (
    <FilesContainer wrap gap={10}>
      {projectFiles.map((file, index) => {
        if (imageExtension.includes(file.Archive_Extention)) {
          const filename =
            file.Archive_Category +
            "/" +
            file.Archive_Group +
            "/" +
            file.Prj_ID +
            "/" +
            file.Archive_SavedName;

          return (
            <Image
              src={`/api/files/${encodeURIComponent(filename)}`}
              key={index}
              alt={file.Archive_FileName}
              className="container"
              //   width={160}
              //   height={160}
            />
          );
        } else {
          return (
            <Flex
              key={index}
              justify="center"
              align="center"
              className="container"
            >
              {file.Archive_FileName}
            </Flex>
          );
        }
      })}
    </FilesContainer>
  );
};
