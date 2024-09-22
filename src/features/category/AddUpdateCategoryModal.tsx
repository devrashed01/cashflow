import { Button, Col, Form, FormInstance, Input, Modal, Row } from "antd";
import React, { useEffect } from "react";

interface AddUpdateCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (transaction: Category) => void;
  data?: Category;
  form: FormInstance;
}

const AddUpdateCategoryModal: React.FC<AddUpdateCategoryModalProps> = ({
  isOpen,
  onClose,
  onSave,
  data,
  form,
}) => {
  const handleSubmit = (values: Category) => {
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
    <Modal title="Add Category" open={isOpen} onCancel={onClose} footer={null}>
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
          label="Name"
          name="name"
        >
          <Input.TextArea placeholder="Enter category name" />
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

export default AddUpdateCategoryModal;
