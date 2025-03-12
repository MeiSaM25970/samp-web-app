import { Button, Checkbox, Collapse, CollapseProps, Flex, Modal } from "antd";
import { FC } from "react";
import { useDashboard } from "../../context";
import { C2 } from "@/components/UiKit/Typography";
import { FilterModalMobileContainer } from "../../styles/Filter.style";
import Icons from "espil-icons";
import { useTheme } from "@/app/theme";
import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/constants/queryKeys";
import { fetchFilterOptions } from "../../getData";
import _ from "lodash";

export const FilterModalMobile: FC = () => {
  const { showFilter, setShowFilter, setFilter } = useDashboard();
  const {
    theme: { colors },
  } = useTheme();

  const handleCancel = () => {
    setFilter(undefined);
    setShowFilter(false);
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
    <Modal
      title={<C2>فیلتر</C2>}
      open={showFilter}
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
