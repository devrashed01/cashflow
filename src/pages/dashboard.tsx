import {
  ArrowDownOutlined,
  ArrowUpOutlined,
  ClockCircleOutlined,
} from "@ant-design/icons";
import { Button, Card, Col, Row, Statistic, Timeline, Typography } from "antd";

import dayjs from "dayjs";
import { useTransactionContext } from "../context/TransactionContext";
import { useUserContext } from "../context/UserContext";

export default function Dashboard() {
  const { users } = useUserContext();
  const { transactions } = useTransactionContext();

  const totalSent = transactions.reduce(
    (acc, transaction) =>
      transaction.type === "sent" ? acc + transaction.amount : acc,
    0
  );

  const totalReceived = transactions.reduce(
    (acc, transaction) =>
      transaction.type === "received" ? acc + transaction.amount : acc,
    0
  );

  const balance = totalReceived - totalSent;

  return (
    <>
      <Card>
        <Row gutter={16}>
          <Col lg={6}>
            <Statistic title="Total users" value={users.length} />
            <Button style={{ marginTop: 16 }} href="/users" type="primary">
              Add user
            </Button>
          </Col>
          <Col lg={6}>
            <Statistic
              title="Total given loan"
              value={totalSent}
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
              value={totalReceived}
              precision={2}
              valueStyle={{ color: "green" }}
              prefix={<ArrowDownOutlined />}
              suffix="Taka"
            />
          </Col>
          <Col lg={6}>
            <Statistic
              title="Balance"
              value={balance}
              precision={2}
              valueStyle={{ color: balance > 0 ? "green" : "red" }}
              suffix="Taka"
            />
          </Col>
        </Row>
      </Card>
      <Timeline
        style={{ marginTop: "2rem" }}
        mode="left"
        items={transactions.map((transaction) => ({
          label: (
            <>
              {transaction.type === "sent" ? "Sent" : "Received"}:{" "}
              {dayjs(transaction.transactionDate).format("YYYY-MM-DD")}
            </>
          ),
          children: (
            <>
              {transaction.amount} Taka{" "}
              {transaction.type === "sent" ? "Sent" : "Received"}{" "}
              {transaction.type === "sent" ? "to" : "from"}{" "}
              <Typography.Text style={{ fontWeight: 500 }}>
                ({users.find((user) => user.id === transaction.userId)?.name})
              </Typography.Text>
            </>
          ),
          color: transaction.type === "sent" ? "red" : "green",
          dot: (
            <ClockCircleOutlined
              style={{
                fontSize: "16px",
                color: transaction.type === "sent" ? "red" : "green",
              }}
            />
          ),
          position: "left",
        }))}
      />
    </>
  );
}

// [
//   {
//     children: "Create a services site 2015-09-01",
//     color: "green",
//   },
//   {
//     dot: <ClockCircleOutlined style={{ fontSize: "16px" }} />,
//     children: "Technical testing 2015-09-01",
//   },
// ]
