import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { Button, Card, Col, Row, Statistic } from "antd";

export default function Dashboard() {
  console.log("dashboard page loaded...");
  return (
    <>
      <Card>
        <Row gutter={16}>
          <Col lg={6}>
            <Statistic title="Total users" value={0} />
            <Button style={{ marginTop: 16 }} href="/users" type="primary">
              Add user
            </Button>
          </Col>
          <Col lg={6}>
            <Statistic
              title="Total given loan"
              value={0}
              precision={2}
              suffix="Taka"
              valueStyle={{ color: "red" }}
              prefix={<ArrowUpOutlined />}
            />
            <Button
              style={{ marginTop: 16 }}
              href="/transactions"
              type="primary"
            >
              Add transaction
            </Button>
          </Col>
          <Col lg={6}>
            <Statistic
              title="Total received/return loan"
              value={0}
              precision={2}
              valueStyle={{ color: "green" }}
              prefix={<ArrowDownOutlined />}
              suffix="Taka"
            />
          </Col>
        </Row>
      </Card>
    </>
  );
}
