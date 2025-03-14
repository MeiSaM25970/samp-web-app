"use client";
import { Checkbox, Collapse, CollapseProps, Divider, Flex, Slider } from "antd";
import { Dispatch, FC, SetStateAction } from "react";
import { FilterContainer } from "../styles/Filter.style";
import Icons from "espil-icons";
import { T6 } from "@/components/UiKit/Typography";
import { useTheme } from "@/app/theme";
import _ from "lodash";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants/queryKeys";
import { IGetProjectArg } from "@/app/actions/models";
import { fetchFilterOptions } from "../getData";
import Image from "next/image";

interface IProps {
  setFilter: Dispatch<SetStateAction<IGetProjectArg | undefined>>;
}
export const Filter: FC<IProps> = ({ setFilter }) => {
  const {
    theme: { colors },
  } = useTheme();

  const { data: options } = useQuery({
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
          className="checkBoxGroup"
          onChange={(value) => onChange("subjectType", value)}
        >
          {options?.subjectType.map((i, key) => (
            <Flex gap={8} key={key} justify="space-between" align="center">
              <Checkbox value={i.value}>
                <span>{i.label}</span>
              </Checkbox>
              <span style={{ width: 24, height: 24 }}>
                <Image
                  src={i.imgUrl}
                  width={24}
                  height={24}
                  alt="icon"
                  style={{ borderRadius: 4 }}
                />
              </span>
            </Flex>
          ))}
        </Checkbox.Group>
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
    {
      key: "8",
      label: "میزان پیشرفت",
      children: (
        <Slider
          range
          defaultValue={[0, 100]}
          onChangeComplete={(value) => {
            if (value.join(",") === "0,100") onChange("progress", "");
            else onChange("progress", value.join(","));
          }}
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
