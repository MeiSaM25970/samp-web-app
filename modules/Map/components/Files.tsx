"use client";
import { IProjectFile } from "@/app/actions/models/project/getProjectFiles";
import { Flex, Image, Spin } from "antd";
import { FC, useState } from "react";
import { FilesContainer } from "../styles/files.style";
import { C7, C8 } from "@/components/UiKit/Typography";
import Icons from "espil-icons";
import { useTheme } from "@/app/theme";
import axios from "axios";
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
  const downloadFile = async (file: IProjectFile) => {
    try {
      setDownloadLoading(true);
      const filename =
        file.Archive_Category +
        "/" +
        file.Archive_Group +
        "/" +
        file.Prj_ID +
        "/" +
        file.Archive_SavedName;
      const response = await axios.get<Blob>(
        `/api/files/${encodeURIComponent(filename)}`,
        {
          responseType: "blob",
        }
      );
      if (response) {
        const blob = new Blob([response.data], {
          type: response.headers["content-type"] || "application/octet-stream",
        });
        const url = URL.createObjectURL(blob);

        const el = document.createElement("a");
        el.href = url;
        el.style.display = "none";
        el.download = `${file.Archive_FileName}.${file.Archive_Extention}`;
        document.body.appendChild(el);
        el.click();

        // پاک کردن لینک از حافظه
        URL.revokeObjectURL(url);
        document.body.removeChild(el);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setDownloadLoading(false);
    }
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
                downloadFile(file);
              }}
            >
              <Flex vertical gap={16}>
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
