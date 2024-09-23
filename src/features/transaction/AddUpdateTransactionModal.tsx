import {
  Button,
  Col,
  DatePicker,
  Form,
  FormInstance,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
} from "antd";
import dayjs from "dayjs";
import React, { useEffect } from "react";

interface AddUpdateTransactionModalProps {
  form: FormInstance;
  isOpen: boolean;
  isLoading: boolean;
  data?: Transaction;
  categories: Category[];
  onClose: () => void;
  onSave: (transaction: Transaction) => void;
}

const typeOptions: {
  label: string;
  value: Transaction["type"];
}[] = [
  { label: "Expense", value: "expense" },
  { label: "Income", value: "income" },
];

const AddUpdateTransactionModal: React.FC<AddUpdateTransactionModalProps> = ({
  form,
  categories,
  isOpen,
  isLoading,
  onClose,
  onSave,
  data,
}) => {
  const handleSubmit = (values: Transaction) => {
    onSave(values);
  };

  useEffect(() => {
    if (data) {
      const parsedValues = {
        ...data,
        transactionDate: dayjs(data.transactionDate),
      };
      form.setFieldsValue(parsedValues);
    }
  }, [data, form]);

  return (
    <Modal
      title="Add Transaction"
      open={isOpen}
      onCancel={onClose}
      footer={null}
    >
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item
          rules={[
            {
              required: true,
            },
          ]}
          label="Category"
          name="categoryId"
        >
          <Select
            placeholder="Select category"
            options={categories.map((el) => ({
              label: el.name,
              value: el.id,
            }))}
          />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
            },
          ]}
          label="Amount"
          name="amount"
        >
          <InputNumber
            min={0}
            inputMode="numeric"
            style={{ width: "100%" }}
            placeholder="Enter your amount"
          />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
            },
          ]}
          label="Type"
          name="type"
        >
          <Select placeholder="Select your type" options={typeOptions} />
        </Form.Item>
        <Form.Item
          rules={[
            {
              required: true,
            },
          ]}
          label="Description"
          name="description"
        >
          <Input.TextArea placeholder="Enter your text" />
        </Form.Item>
        <Form.Item label="Transaction Date" name="transactionDate">
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>
        <Row justify="end" gutter={10}>
          <Col>
            <Button onClick={onClose}>Cancel</Button>
          </Col>
          <Col>
            <Button
              loading={isLoading}
              disabled={isLoading}
              type="primary"
              htmlType="submit"
            >
              {data ? "Update" : "Create"}
            </Button>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default AddUpdateTransactionModal;
