"use client";
import { IProjectFile } from "@/app/actions/models/project/getProjectFiles";
import { Flex, Image, Spin } from "antd";
import { FC, useState } from "react";
import { FilesContainer } from "../../styles/files.style";
import { C7, C8 } from "@/components/UiKit/Typography";
import Icons from "espil-icons";
import { useTheme } from "@/app/theme";

interface IProps {
  projectFiles: IProjectFile[] | undefined;
  loading: boolean;
}
const imageExtension = ["png", "jpg", "jpeg", "gif", "bmp", "svg"];
export const FilesComponent: FC<IProps> = ({ projectFiles, loading }) => {
  const {
    theme: { colors },
  } = useTheme();
  const [downloadLoading, setDownloadLoading] = useState<boolean>(false);
  const downloadFile = async (
    file: string,
    name: string,
    extension: string
  ) => {
    setDownloadLoading(true);

    const el = document.createElement("a");
    el.href = file;
    el.style.display = "none";
    el.download = `${name}.${extension}`;
    document.body.appendChild(el);
    el.click();

    setDownloadLoading(false);
  };
  if (loading) return <Spin size="small">درحال بارگذاری</Spin>;
  if (!projectFiles || !projectFiles.length) {
    return (
      <Flex justify="center" align="center" className="h-[200px]">
        <C8 style={{ color: colors.text.secondaryText }}>فایلی وجود ندارد.</C8>
      </Flex>
    );
  }
  return (
    <FilesContainer wrap gap={10} justify={"center"}>
      {downloadLoading && <Spin fullscreen />}
      {projectFiles.map((file, index) => {
        if (imageExtension.includes(file.Archive_Extention)) {
          return (
            <Image
              src={file.Archive_byteFile || "/images/defaultImage.svg"}
              key={index}
              alt={file.Archive_FileName}
              className="container"
            />
          );
        } else {
          return (
            <Flex
              key={index}
              justify="center"
              align="center"
              className="container file"
              onClick={() => {
                downloadFile(
                  file.Archive_byteFile,
                  file.Archive_OriginalName,
                  file.Archive_Extention
                );
              }}
            >
              <Flex vertical gap={16} justify="center" align="center">
                <Icons name="Entity" size={64} color={colors.icon.icPri} />
                <C7 className="text-center"> {file.Archive_FileName}</C7>
              </Flex>
            </Flex>
          );
        }
      })}
    </FilesContainer>
  );
};
