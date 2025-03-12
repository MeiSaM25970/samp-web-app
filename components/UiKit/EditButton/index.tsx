import { useTheme } from "@/app/theme";
import Icons from "espil-icons";
import { FC } from "react";

interface IProps {
  action?: () => void;
}
export const EditButton: FC<IProps> = ({ action }) => {
  const {
    theme: { colors },
  } = useTheme();

  return (
    <span className="cursor-pointer" onClick={action}>
      <Icons name="EditOutline" color={colors.icon.icDef} />
    </span>
  );
};
