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
import React, { useEffect } from "react";

interface AddUpdateTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (transaction: Transaction) => void;
  data?: Transaction;
  form: FormInstance;
}

const typeOptions: {
  label: string;
  value: Transaction["type"];
}[] = [
  { label: "Received", value: "received" },
  { label: "Sent", value: "sent" },
];

const AddUpdateTransactionModal: React.FC<AddUpdateTransactionModalProps> = ({
  isOpen,
  onClose,
  onSave,
  data,
  form,
}) => {
  const handleSubmit = (values: Transaction) => {
    onSave(values);
    onClose();
    form.resetFields();
  };

  useEffect(() => {
    if (data) {
      const parsedValues = {
        ...data,
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
        <Form.Item hidden name="id">
          <Input />
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
          label="Transaction Date"
          name="transactionDate"
        >
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          rules={[
            {
              required: true,
            },
          ]}
          label="Text"
          name="text"
        >
          <Input.TextArea placeholder="Enter your text" />
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
            style={{ width: "100%" }}
            placeholder="Enter your amount"
          />
        </Form.Item>
        <Row justify="end" gutter={10}>
          <Col>
            <Button onClick={onClose}>Cancel</Button>
          </Col>
          <Col>
            <Button type="primary" htmlType="submit">
              {data ? "Update" : "Create"}
            </Button>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default AddUpdateTransactionModal;
