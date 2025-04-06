"use client";
import { IProject } from "@/app/actions/models";
import { Col, Progress, Row, Table, TableProps } from "antd";
import { FC } from "react";
import { useDashboard } from "../context";

export const ProjectTable: FC = () => {
  const { projectList, loading, setProjectId, setCurrentProjectImage } =
    useDashboard();
  const columns: TableProps<IProject>["columns"] = [
    {
      title: "#",
      key: "#",
      render: (text, record, index) => index + 1,
    },
    {
      title: "کد",
      dataIndex: "Prj_ID",
      key: "Prj_ID",
      sorter: (a, b) => Number(a.Prj_ID) - Number(b.Prj_ID),
    },
    {
      title: "عنوان پروژه ",
      dataIndex: "Prj_Name",
      key: "Prj_Name",
      width: "20%",
    },
    {
      title: "عرصه",
      dataIndex: "PlanGroup",
      key: "PlanGroup",
    },
    {
      title: "زیر عرصه",
      dataIndex: "SubjectType",
      key: "SubjectType",
    },
    {
      title: "دسته بندی فنی",
      dataIndex: "TechnicalType",
      key: "TechnicalType",
    },
    {
      title: "استان",
      dataIndex: "Province",
      key: "Province",
    },
    {
      title: "اعتبار کل",
      dataIndex: "Prj_TotalCredit",
      key: "Prj_TotalCredit",
      render: (text) => Number(text)?.toLocaleString("fa-IR"),
      sorter: (a, b) => Number(a.Prj_TotalCredit) - Number(b.Prj_TotalCredit),
    },
    {
      title: "پیشرفت",
      dataIndex: "PhisicalProgress",
      key: "PhisicalProgress",
      width: 110,
      render: (text) => <Progress percent={text} />,
      sorter: (a, b) => Number(a.PhisicalProgress) - Number(b.PhisicalProgress),
    },
    {
      title: "تاریخ شروع",
      dataIndex: "Prj_StartDate",
      key: "Prj_StartDate",
    },
  ];
  return (
    <Row>
      <Col span={24}>
        <Table<IProject>
          columns={columns}
          dataSource={projectList}
          loading={loading}
          onRow={(record) => ({
            onClick: () => {
              setProjectId(record?.Prj_ID);
              setCurrentProjectImage(
                record?.Image_Default as string | undefined
              );
            },
            className: "cursor-pointer select-none",
          })}
          pagination={{
            position: ["bottomCenter"],
            showSizeChanger: true,
            pageSizeOptions: ["10", "20", "50", "100"],
            showTotal: (total, range) => `${range[0]}-${range[1]} از ${total}`,
            defaultPageSize: 10,
            showQuickJumper: true,
            className: "flex items-center",
            total: projectList?.length,
          }}
          rowKey="Prj_ID"
        />
      </Col>
    </Row>
  );
};
