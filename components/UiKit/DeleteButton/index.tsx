import Icons from "espil-icons";
import { FC } from "react";
import { useTheme } from "src/theme";
interface IProps {
  action?: () => void;
}
export const DeleteButton: FC<IProps> = ({ action }) => {
  const {
    theme: { colors },
  } = useTheme();
  return (
    <span className="cursor-pointer " onClick={action}>
      <Icons name="Delete" color={colors.icon.icDef} />
    </span>
  );
};
