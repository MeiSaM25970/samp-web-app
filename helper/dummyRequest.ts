import { UploadRequestOption } from "rc-upload/lib/interface";

export const dummyRequest: (options: UploadRequestOption) => void = ({
  file,
  onSuccess,
}) => {
  setTimeout(() => {
    if (onSuccess) {
      onSuccess("done");
      return file;
    }
  }, 0);
};
