import { PlusOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { App, Button, Card, Form, Popconfirm, Table } from "antd";
import { useState } from "react";
import {
  createCategoryAction,
  deleteCategoryAction,
  getCategoriesAction,
  updateCategoryAction,
} from "../actions/category";
import AddUpdateCategoryModal from "../features/category/AddUpdateCategoryModal";

export default function Category() {
  const [form] = Form.useForm();
  const { message } = App.useApp();
  const queryClient = useQueryClient();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedTransaction, setSelectedTransaction] = useState<
    Category | undefined
  >(undefined);

  const { data, isLoading, isRefetching } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategoriesAction,
  });

  const { mutate: handleDeleteCategory } = useMutation({
    mutationFn: deleteCategoryAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  const { mutate: handleCreateCategory, isPending: isCreating } = useMutation({
    mutationFn: createCategoryAction,
    onSuccess: () => {
      form.resetFields();
      setIsModalVisible(false);
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
    onError: (error) => {
      message.error(error.message);
    },
  });

  const { mutate: handleUpdateCategory, isPending: isUpdating } = useMutation({
    mutationFn: (data: Category) =>
      updateCategoryAction(data, selectedTransaction!.id),
    onSuccess: () => {
      setSelectedTransaction(undefined);
      form.resetFields();
      setIsModalVisible(false);
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
          <Button
            style={{ marginRight: 10 }}
            type="primary"
            onClick={() => {
              setSelectedTransaction(record);
              setIsModalVisible(true);
            }}
          >
            Edit
          </Button>
          <Button type="default">
            <Popconfirm
              placement="topLeft"
              title="Are you sure to delete this transaction?"
              okText="Yes"
              cancelText="No"
              onConfirm={() => handleDeleteCategory(record.id)}
            >
              Delete
            </Popconfirm>
          </Button>
        </>
      ),
    },
  ];

  const handleCreateUpdateCategory = (values: Category) => {
    if (selectedTransaction) {
      handleUpdateCategory(values);
    } else {
      handleCreateCategory(values);
    }
  };

  return (
    <>
      <AddUpdateCategoryModal
        isLoading={isUpdating || isCreating}
        form={form}
        onClose={() => {
          form.resetFields();
          setIsModalVisible(false);
        }}
        onSave={handleCreateUpdateCategory}
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
          loading={isLoading || isRefetching}
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
