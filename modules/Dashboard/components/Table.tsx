import { IProject } from "@/app/actions/models";
import { Col, Row, Table, TableProps } from "antd";
import { FC } from "react";
import { useDashboard } from "../context";

export const ProjectTable: FC = () => {
  const { projectList, loading } = useDashboard();
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
    },
    {
      title: "عنوان پروژه ",
      dataIndex: "Prj_Name",
      key: "Prj_Name",
      width: "20%",
    },
    {
      title: "گروه طرح",
      dataIndex: "PlanGroup",
      key: "PlanGroup",
    },
    {
      title: "دسته بندی موضوعی",
      dataIndex: "SubjectType",
      key: "SubjectType",
    },
    {
      title: "دسته بندی فنی",
      dataIndex: "TechnicalType",
      key: "TechnicalType",
    },
    {
      title: "شیوه اجرا",
      dataIndex: "Unit",
      key: "Unit",
    },
    {
      title: "اعتبار کل",
      dataIndex: "Prj_TotalCredit",
      key: "Prj_TotalCredit",
      render: (text) => Number(text)?.toLocaleString("fa-IR"),
    },
    {
      title: "پیشرفت",
      dataIndex: "PhisicalProgress",
      key: "PhisicalProgress",
      render: (text) => text?.toString() + "%",
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
