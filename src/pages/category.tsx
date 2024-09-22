import { PlusOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Button, Card, Form, Popconfirm, Table } from "antd";
import { useState } from "react";
import { deleteCategoryAction, getCategoriesAction } from "../actions/category";
import AddUpdateCategoryModal from "../features/category/AddUpdateCategoryModal";

export default function Category() {
  const [form] = Form.useForm();
  const queryClient = useQueryClient();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedTransaction, setSelectedTransaction] = useState<
    Category | undefined
  >(undefined);

  const { data, isLoading } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategoriesAction,
  });

  const { mutate } = useMutation({
    mutationFn: deleteCategoryAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Action",
      key: "action",
      width: 200,
      render: (text: string, record: any) => (
        <>
          <Button style={{ marginRight: 10 }} type="primary">
            <Popconfirm
              placement="topLeft"
              title="Are you sure to modify this transaction?"
              okText="Yes"
              cancelText="No"
              onConfirm={() => {
                setSelectedTransaction(record);
                setIsModalVisible(true);
              }}
            >
              Edit
            </Popconfirm>
          </Button>
          <Button type="default">
            <Popconfirm
              placement="topLeft"
              title="Are you sure to delete this transaction?"
              okText="Yes"
              cancelText="No"
              onConfirm={() => mutate(record.id)}
            >
              Delete
            </Popconfirm>
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
      <AddUpdateCategoryModal
        form={form}
        onClose={() => {
          form.resetFields();
          setIsModalVisible(false);
          setSelectedTransaction(undefined);
        }}
        onSave={() => {}}
        isOpen={isModalVisible}
        data={selectedTransaction}
      />
      <Card
        title="Category"
        extra={
          <Button
            onClick={() => setIsModalVisible(true)}
            type="primary"
            icon={<PlusOutlined />}
          >
            Add Category
          </Button>
        }
        styles={{
          body: {
            padding: 0,
          },
        }}
      >
        <Table
          loading={isLoading}
          scroll={{ x: 768 }}
          rowKey={"id"}
          dataSource={data}
          columns={columns}
          pagination={false}
        />
      </Card>
    </>
  );
}
