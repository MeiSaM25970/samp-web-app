"use client";
import { Checkbox, Collapse, CollapseProps, Divider, Flex, Spin } from "antd";
import { Dispatch, FC, SetStateAction } from "react";
import { FilterContainer } from "../styles/Filter.style";
import Icons from "espil-icons";
import { C7, T6 } from "@/components/UiKit/Typography";
import { useTheme } from "@/app/theme";
import _ from "lodash";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants/queryKeys";
import { IGetProjectArg } from "@/app/actions/models";
import { fetchFilterOptions } from "../getData";

interface IProps {
  setFilter: Dispatch<SetStateAction<IGetProjectArg | undefined>>;
}
export const Filter: FC<IProps> = ({ setFilter }) => {
  const {
    theme: { colors },
  } = useTheme();

  const { data: options, isLoading } = useQuery({
    queryKey: [queryKeys.options],
    queryFn: async () => {
      const res = await fetchFilterOptions();
      if (res) return res;
    },
  });
  const onChange = (type: string, value: number[] | string) => {
    setFilter((prev) => ({
      ...prev,
      [type]: _.isArray(value) ? value.join(",") : value,
    }));
  };
  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: "وضعیت",
      children: (
        <Checkbox.Group
          options={options?.executeState}
          className="checkBoxGroup"
          onChange={(value) => onChange("executeState", value)}
        />
      ),
    },
    {
      key: "2",
      label: "طرح",
      children: (
        <Checkbox.Group
          options={options?.planGroups}
          className="checkBoxGroup"
          onChange={(value) => onChange("planGroups", value)}
        />
      ),
    },
    {
      key: "3",
      label: "عرصه",
      children: (
        <Checkbox.Group
          options={options?.areaType}
          className="checkBoxGroup"
          onChange={(value) => onChange("areaType", value)}
        />
      ),
    },
    {
      key: "4",
      label: "زیر عرصه",
      children: (
        <Checkbox.Group
          options={options?.subjectType}
          className="checkBoxGroup"
          onChange={(value) => onChange("subjectType", value)}
        />
      ),
    },
    {
      key: "5",
      label: "نوع پروژه",
      children: (
        <Checkbox.Group
          options={options?.technicalType}
          className="checkBoxGroup"
          onChange={(value) => onChange("technicalType", value)}
        />
      ),
    },
    {
      key: "6",
      label: "استان",
      children: (
        <Checkbox.Group
          options={options?.province}
          className="checkBoxGroup"
          onChange={(value) => onChange("province", value)}
        />
      ),
    },
    {
      key: "7",
      label: "مهندس ناظر",
      children: (
        <Checkbox.Group
          options={options?.supervisor}
          className="checkBoxGroup"
          onChange={(value) => onChange("supervisor", value)}
        />
      ),
    },
  ];
  return (
    <FilterContainer>
      <Flex gap={16}>
        <Icons name="Filter" />
        <T6>فیلتر</T6>
      </Flex>
      <Divider className="!my-[16px]" />
      {isLoading && (
        <Spin>
          <C7>در حال بارگذاری...</C7>
        </Spin>
      )}
      <Collapse
        accordion
        items={items}
        rootClassName="filter-collapse"
        expandIcon={({ isActive }) => {
          if (isActive)
            return <Icons name="ArrowUpSmall" color={colors.icon.icPri} />;
          else return <Icons name="ArrowDownSmall" color={colors.icon.icDef} />;
        }}
      />
    </FilterContainer>
  );
};
