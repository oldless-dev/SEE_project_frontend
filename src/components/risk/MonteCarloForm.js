// src/components/risk/MonteCarloForm.js
import React from 'react';
import { Form, Button, Row, Col, Card } from 'react-bootstrap';

const MonteCarloForm = ({
  formData,
  errors,
  handleInputChange,
  handleSubmit,
  handleReset,
  loading
}) => {
  return (
    <Card className="mb-4">
      <Card.Header as="h5">蒙特卡洛模拟输入</Card.Header>
      <Card.Body>
        <Form onSubmit={handleSubmit}>
          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="costRangeMin">
                <Form.Label>初始投资最小值</Form.Label>
                <Form.Control
                  type="number"
                  name="costRangeMin"
                  value={formData.costRangeMin}
                  onChange={handleInputChange}
                  isInvalid={!!errors.costRangeMin}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.costRangeMin}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="costRangeMax">
                <Form.Label>初始投资最大值</Form.Label>
                <Form.Control
                  type="number"
                  name="costRangeMax"
                  value={formData.costRangeMax}
                  onChange={handleInputChange}
                  isInvalid={!!errors.costRangeMax}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.costRangeMax}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="revenueMean">
                <Form.Label>年收益均值</Form.Label>
                <Form.Control
                  type="number"
                  name="revenueMean"
                  value={formData.revenueMean}
                  onChange={handleInputChange}
                  isInvalid={!!errors.revenueMean}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.revenueMean}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="revenueStd">
                <Form.Label>年收益标准差</Form.Label>
                <Form.Control
                  type="number"
                  name="revenueStd"
                  value={formData.revenueStd}
                  onChange={handleInputChange}
                  isInvalid={!!errors.revenueStd}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.revenueStd}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="discountRateMin">
                <Form.Label>折现率最小值 (%)</Form.Label>
                <Form.Control
                  type="number"
                  step="0.01"
                  name="discountRateMin"
                  value={formData.discountRateMin}
                  onChange={handleInputChange}
                  isInvalid={!!errors.discountRateMin}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.discountRateMin}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="discountRateMax">
                <Form.Label>折现率最大值 (%)</Form.Label>
                <Form.Control
                  type="number"
                  step="0.01"
                  name="discountRateMax"
                  value={formData.discountRateMax}
                  onChange={handleInputChange}
                  isInvalid={!!errors.discountRateMax}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.discountRateMax}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Row className="mb-3">
            <Col md={6}>
              <Form.Group controlId="duration">
                <Form.Label>项目持续时间 (年)</Form.Label>
                <Form.Control
                  type="number"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  isInvalid={!!errors.duration}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.duration}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="numSimulations">
                <Form.Label>模拟次数</Form.Label>
                <Form.Control
                  type="number"
                  name="numSimulations"
                  value={formData.numSimulations}
                  onChange={handleInputChange}
                  isInvalid={!!errors.numSimulations}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.numSimulations}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <div className="d-flex justify-content-end gap-2 mt-4">
            <Button
              variant="secondary"
              onClick={handleReset}
              disabled={loading}
            >
              重置
            </Button>
            <Button
              variant="primary"
              type="submit"
              disabled={loading}
            >
              {loading ? '计算中...' : '运行模拟'}
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default MonteCarloForm;