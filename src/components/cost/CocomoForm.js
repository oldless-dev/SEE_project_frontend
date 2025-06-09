// src/components/cost/CocomoForm.js
import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

const CocomoForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    linesOfCode: 10000,
    teamSize: 5,
    complexity: 'medium',
    platform: 'web',
    reliability: 'high'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="linesOfCode">
          <Form.Label>代码行数 (LOC)</Form.Label>
          <Form.Control
            type="number"
            name="linesOfCode"
            value={formData.linesOfCode}
            onChange={handleChange}
            min="1000"
            required
          />
        </Form.Group>

        <Form.Group as={Col} controlId="teamSize">
          <Form.Label>团队规模</Form.Label>
          <Form.Control
            type="number"
            name="teamSize"
            value={formData.teamSize}
            onChange={handleChange}
            min="1"
            required
          />
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" controlId="complexity">
        <Form.Label>项目复杂度</Form.Label>
        <Form.Select
          name="complexity"
          value={formData.complexity}
          onChange={handleChange}
          required
        >
          <option value="low">低复杂度</option>
          <option value="medium">中等复杂度</option>
          <option value="high">高复杂度</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3" controlId="platform">
        <Form.Label>平台类型</Form.Label>
        <Form.Select
          name="platform"
          value={formData.platform}
          onChange={handleChange}
          required
        >
          <option value="web">Web应用</option>
          <option value="mobile">移动应用</option>
          <option value="desktop">桌面应用</option>
          <option value="embedded">嵌入式系统</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3" controlId="reliability">
        <Form.Label>可靠性要求</Form.Label>
        <Form.Select
          name="reliability"
          value={formData.reliability}
          onChange={handleChange}
          required
        >
          <option value="low">低可靠性</option>
          <option value="medium">中等可靠性</option>
          <option value="high">高可靠性</option>
          <option value="critical">关键任务</option>
        </Form.Select>
      </Form.Group>

      <div className="d-flex justify-content-end">
        <Button variant="primary" type="submit">计算COCOMO</Button>
      </div>
    </Form>
  );
};

export default CocomoForm;