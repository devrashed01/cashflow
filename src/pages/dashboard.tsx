import { useQuery } from "@tanstack/react-query";
import { Button, Card, Col, Row, Statistic } from "antd";
import { Link } from "react-router-dom";
import { getStatistics } from "../actions/dashboard";

export default function Dashboard() {
  const { data, isLoading } = useQuery({
    queryKey: ["statistics"],
    queryFn: getStatistics,
  });

  return (
    <>
      <Card>
        <Row gutter={16}>
          <Col lg={6}>
            <Statistic
              loading={isLoading}
              title="Total expense"
              value={data?.totalExpenses}
            />
          </Col>
          <Col lg={6}>
            <Statistic
              loading={isLoading}
              title="Total income"
              value={data?.totalIncomes}
            />
          </Col>
          <Col lg={6}>
            <Button style={{ marginTop: 16 }} type="primary">
              <Link to="/transactions">View transactions</Link>
            </Button>
          </Col>
        </Row>
      </Card>
    </>
  );
}
