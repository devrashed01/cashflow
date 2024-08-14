import { Button, Col, Form, FormInstance, Input, Modal, Row } from "antd";
import React, { useEffect } from "react";

interface AddUpdateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (user: User) => void;
  data?: User;
  form: FormInstance;
}

const AddUpdateUserModal: React.FC<AddUpdateUserModalProps> = ({
  isOpen,
  onClose,
  onSave,
  data,
  form,
}) => {
  const handleSubmit = (values: User) => {
    onSave(values);
    onClose();
    form.resetFields();
  };

  useEffect(() => {
    if (data) {
      form.setFieldsValue(data);
    }
  }, [data, form]);

  return (
    <Modal title="Add User" open={isOpen} onCancel={onClose} footer={null}>
      <Form form={form} layout="vertical" onFinish={handleSubmit}>
        <Form.Item hidden name="id">
          <Input />
        </Form.Item>
        <Form.Item label="Name" name="name">
          <Input placeholder="Enter your name" />
        </Form.Item>
        <Row justify="end" gutter={10}>
          <Col>
            <Button onClick={onClose}>Cancel</Button>
          </Col>
          <Col>
            <Button type="primary" htmlType="submit">
              Create
            </Button>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default AddUpdateUserModal;
