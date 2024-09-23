import { PlusOutlined } from "@ant-design/icons";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { App, Button, Card, Form, Popconfirm, Table, Tag } from "antd";
import { ColumnsType } from "antd/es/table";
import dayjs from "dayjs";
import { useState } from "react";
import { getCategoriesAction } from "../actions/category";
import {
  createTransactionAction,
  deleteTransactionAction,
  getTransactionsAction,
  updateTransactionAction,
} from "../actions/transaction";
import AddUpdateTransactionModal from "../features/transaction/AddUpdateTransactionModal";

export default function Transaction() {
  const [form] = Form.useForm();
  const { message } = App.useApp();
  const queryClient = useQueryClient();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedTransaction, setSelectedTransaction] = useState<
    Transaction | undefined
  >(undefined);

  const { data: categories } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategoriesAction,
  });

  const { data, isLoading, isRefetching } = useQuery({
    queryKey: ["transactions"],
    queryFn: getTransactionsAction,
  });

  const { mutate: handleDeleteTransaction } = useMutation({
    mutationFn: deleteTransactionAction,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
  });

  const { mutate: handleCreateTransaction, isPending: isCreating } =
    useMutation({
      mutationFn: createTransactionAction,
      onSuccess: () => {
        form.resetFields();
        setIsModalVisible(false);
        queryClient.invalidateQueries({ queryKey: ["transactions"] });
        queryClient.invalidateQueries({ queryKey: ["categories"] });
      },
      onError: (error) => {
        message.error(error.message);
      },
    });

  const { mutate: handleUpdateTransaction, isPending: isUpdating } =
    useMutation({
      mutationFn: (data: Transaction) =>
        updateTransactionAction(data, selectedTransaction!.id),
      onSuccess: () => {
        setSelectedTransaction(undefined);
        form.resetFields();
        setIsModalVisible(false);
        queryClient.invalidateQueries({ queryKey: ["transactions"] });
        queryClient.invalidateQueries({ queryKey: ["categories"] });
      },
    });

  const columns: ColumnsType<Transaction> = [
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (value) => `${value} Taka`,
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
      render: (type) => (
        <Tag color={type === "expense" ? "red" : "blue"}>{type}</Tag>
      ),
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      render: (category) => category.name,
    },
    // {
    //   title: "Status",
    //   dataIndex: "status",
    //   key: "status",
    //   render: (value: boolean) => {
    //     return <Switch checked={value} />;
    //   },
    // },
    {
      title: "Transaction date",
      dataIndex: "transactionDate",
      key: "transactionDate",
      render: (date) => dayjs(date).format("DD-MM-YYYY"),
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
              onConfirm={() => handleDeleteTransaction(record.id)}
            >
              Delete
            </Popconfirm>
          </Button>
        </>
      ),
    },
  ];

  const handleCreateUpdateTransaction = (values: Transaction) => {
    if (selectedTransaction) {
      handleUpdateTransaction(values);
    } else {
      handleCreateTransaction(values);
    }
  };

  return (
    <>
      <AddUpdateTransactionModal
        categories={categories ?? []}
        isLoading={isUpdating || isCreating}
        form={form}
        onClose={() => {
          form.resetFields();
          setIsModalVisible(false);
        }}
        onSave={handleCreateUpdateTransaction}
        isOpen={isModalVisible}
        data={selectedTransaction}
      />
      <Card
        title="Transaction"
        extra={
          <Button
            onClick={() => setIsModalVisible(true)}
            type="primary"
            icon={<PlusOutlined />}
          >
            Add Transaction
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
