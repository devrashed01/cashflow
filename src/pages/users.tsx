import { PlusOutlined } from "@ant-design/icons";
import { Button, Card, Form, Popconfirm, Table } from "antd";
import { useState } from "react";
import { useTransactionContext } from "../context/TransactionContext";
import { useUserContext } from "../context/UserContext";
import AddUpdateUserModal from "../features/users/AddUpdateUserModal";

export default function Users() {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | undefined>(undefined);
  const { addUpdateUser, deleteUser, users } = useUserContext();
  const { transactions } = useTransactionContext();

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: any) => <>{text.toUpperCase()}</>,
    },
    {
      title: "Balance",
      dataIndex: "balance",
      key: "balance",
      render: (text: string, record: any) => {
        const userTransactions = transactions.filter(
          (transaction) => transaction.userId === record.id
        );
        const balance = userTransactions.reduce(
          (acc, transaction) =>
            transaction.type === "received"
              ? acc + transaction.amount
              : acc - transaction.amount,
          0
        );
        return `${balance > 0 ? "🎉" : "😢"} ${balance} Taka`;
      },
    },
    {
      title: "Total sent to him",
      dataIndex: "totalSent",
      key: "totalSent",
      render: (text: string, record: any) => {
        const totalSent = transactions.reduce(
          (acc, transaction) =>
            transaction.userId === record.id && transaction.type === "sent"
              ? acc + transaction.amount
              : acc,
          0
        );
        return `${totalSent} Taka`;
      },
    },
    {
      title: "Total received from him",
      dataIndex: "totalReceived",
      key: "totalReceived",
      render: (text: string, record: any) => {
        const totalReceived = transactions.reduce(
          (acc, transaction) =>
            transaction.userId === record.id && transaction.type === "received"
              ? acc + transaction.amount
              : acc,
          0
        );
        return `${totalReceived} Taka`;
      },
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
              setSelectedUser(record);
              setIsModalVisible(true);
            }}
          >
            Edit
          </Button>
          <Button type="default">
            <Popconfirm
              placement="topLeft"
              title="Are you sure to delete this user?"
              okText="Yes"
              cancelText="No"
              onConfirm={() => deleteUser(record.id)}
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
      <AddUpdateUserModal
        form={form}
        onClose={() => {
          form.resetFields();
          setIsModalVisible(false);
          setSelectedUser(undefined);
        }}
        onSave={addUpdateUser}
        isOpen={isModalVisible}
        data={selectedUser}
      />
      <Card
        title="Users"
        extra={
          <Button
            onClick={() => setIsModalVisible(true)}
            type="primary"
            icon={<PlusOutlined />}
          >
            Add
          </Button>
        }
        styles={{
          body: {
            padding: 0,
          },
        }}
      >
        <Table
          rowKey={"id"}
          dataSource={users}
          columns={columns}
          pagination={false}
        />
      </Card>
    </>
  );
}
