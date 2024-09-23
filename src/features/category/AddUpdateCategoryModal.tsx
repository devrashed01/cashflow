import { Button, Col, Form, FormInstance, Input, Modal, Row } from "antd";
import React, { useEffect } from "react";

interface AddUpdateCategoryModalProps {
  isOpen: boolean;
  isLoading: boolean;
  onClose: () => void;
  onSave: (transaction: Category) => void;
  data?: Category;
  form: FormInstance;
}

const AddUpdateCategoryModal: React.FC<AddUpdateCategoryModalProps> = ({
  isOpen,
  isLoading,
  onClose,
  onSave,
  data,
  form,
}) => {
  const handleSubmit = (values: Category) => {
    onSave(values);
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
        <Form.Item label="Description" name="description">
          <Input.TextArea placeholder="Enter description" />
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

export default AddUpdateCategoryModal;
