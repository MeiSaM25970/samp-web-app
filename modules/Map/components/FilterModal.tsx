"use client";
import { Button, Checkbox, Collapse, CollapseProps, Flex, Modal } from "antd";
import { FC, useState } from "react";
import { C2 } from "@/components/UiKit/Typography";
import Icons from "espil-icons";
import { useTheme } from "@/app/theme";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants/queryKeys";
import _ from "lodash";
import { fetchFilterOptions } from "@/modules/Dashboard/getData";
import { useMap } from "../context";
import { FilterModalMobileContainer } from "@/modules/Dashboard/styles/Filter.style";

export const FilterModalMobile: FC = () => {
  const { showFilter, setShowFilter, setFilter } = useMap();
  const {
    theme: { colors },
  } = useTheme();
  const [activeKey, setActiveKey] = useState<string | string[]>([]);
  const [checkboxStates, setCheckboxStates] = useState({
    executeState: [],
    planGroups: [],
    areaType: [],
    subjectType: [],
    technicalType: [],
    province: [],
    supervisor: [],
  });

  const handleCancel = () => {
    setFilter(undefined);
    setShowFilter(false);
    setActiveKey([]);
    setCheckboxStates({
      executeState: [],
      planGroups: [],
      areaType: [],
      subjectType: [],
      technicalType: [],
      province: [],
      supervisor: [],
    });
  };
  const handleOk = () => {
    setShowFilter(false);
  };

  const { data: options } = useQuery({
    queryKey: [queryKeys.options],
    queryFn: async () => {
      const res = await fetchFilterOptions();
      if (res) return res;
    },
  });

  // const onChange = (type: string, value: number[] | string) => {
  //   setFilter((prev) => ({
  //     ...prev,
  //     [type]: _.isArray(value) ? value.join(",") : value,
  //   }));
  // };
  const onChange = (type: string, value: number[] | string) => {
    setFilter((prev) => ({
      ...prev,
      [type]: _.isArray(value) ? value.join(",") : value,
    }));
    setCheckboxStates((prev) => ({
      ...prev,
      [type]: value,
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
          value={checkboxStates.executeState}
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
          value={checkboxStates.planGroups}
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
          value={checkboxStates.areaType}
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
          value={checkboxStates.subjectType}
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
          value={checkboxStates.technicalType}
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
          value={checkboxStates.province}
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
          value={checkboxStates.supervisor}
        />
      ),
    },
  ];
  return (
    <Modal
      title={<C2>فیلتر</C2>}
      open={showFilter}
      onCancel={handleCancel}
      footer={
        <Flex justify="space-between">
          <Button onClick={() => handleCancel()}>لغو فیلتر</Button>
          <Button type="primary" onClick={handleOk}>
            تایید
          </Button>
        </Flex>
      }
    >
      <FilterModalMobileContainer>
        <Collapse
          accordion
          items={items}
          rootClassName="filter-collapse"
          activeKey={activeKey}
          onChange={(keys) => setActiveKey(keys)}
          expandIcon={({ isActive }) => {
            if (isActive)
              return <Icons name="ArrowUpSmall" color={colors.icon.icPri} />;
            else
              return <Icons name="ArrowDownSmall" color={colors.icon.icDef} />;
          }}
        />
      </FilterModalMobileContainer>
    </Modal>
  );
};
