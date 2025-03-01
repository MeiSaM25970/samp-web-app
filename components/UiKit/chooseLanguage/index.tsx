import { FC } from "react";
import { languagesOption } from "./languages.tsx";
import { ChooseLanguageContainer } from "./style";
import { ILanguages, useLanguage } from "src/store/languages";
import { USER_Language } from "src/constants/localStorage";
import { SelectUikit } from "../Inputs/index.ts";

export const ChooseLanguage: FC = () => {
  const { setCurrentLanguage, currentLanguage } = useLanguage();
  const changeLanguage = (value: ILanguages) => {
    localStorage.setItem(USER_Language, value);
    setCurrentLanguage(value);
  };

  return (
    <ChooseLanguageContainer>
      <SelectUikit
        className="choose-language"
        defaultValue={currentLanguage}
        onChange={changeLanguage}
        options={languagesOption}
        direction={"ltr"}
        allowClear={false}
      />
    </ChooseLanguageContainer>
  );
};
