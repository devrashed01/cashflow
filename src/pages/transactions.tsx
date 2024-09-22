import { PlusOutlined } from "@ant-design/icons";
import { Button, Card, Form, Popconfirm, Table } from "antd";
import { useState } from "react";
import AddUpdateTransactionModal from "../features/transactions/AddUpdateTransactionModal";

export default function Transactions() {
  const [form] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [selectedTransaction, setSelectedTransaction] = useState<
    Transaction | undefined
  >(undefined);

  const columns = [
    {
      title: "Text",
      dataIndex: "text",
      key: "text",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
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
              // onConfirm={() => deleteTransaction(record.id)}
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
      <AddUpdateTransactionModal
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
        title="Transactions"
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
          scroll={{ x: 768 }}
          rowKey={"id"}
          dataSource={[]}
          columns={columns}
          pagination={false}
        />
      </Card>
    </>
  );
}
