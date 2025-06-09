// src/components/cost/FunctionPointForm.js
import React, { useState } from 'react';
import { Form, Button, Table } from 'react-bootstrap';

const FunctionPointForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    inputs: { count: 5, complexity: 'average' },
    outputs: { count: 7, complexity: 'average' },
    inquiries: { count: 3, complexity: 'low' },
    files: { count: 4, complexity: 'high' },
    interfaces: { count: 2, complexity: 'average' },
    adjustmentFactor: 65
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes('.')) {
      const [category, field] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [category]: {
          ...prev[category],
          [field]: value
        }
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Table striped bordered className="mb-4">
        <thead>
          <tr>
            <th>功能类型</th>
            <th>数量</th>
            <th>复杂度</th>
            <th>权重</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>输入</td>
            <td>
              <Form.Control
                type="number"
                name="inputs.count"
                value={formData.inputs.count}
                onChange={handleChange}
                min="0"
                required
              />
            </td>
            <td>
              <Form.Select
                name="inputs.complexity"
                value={formData.inputs.complexity}
                onChange={handleChange}
                required
              >
                <option value="low">低</option>
                <option value="average">中</option>
                <option value="high">高</option>
              </Form.Select>
            </td>
            <td>3-6</td>
          </tr>
          <tr>
            <td>输出</td>
            <td>
              <Form.Control
                type="number"
                name="outputs.count"
                value={formData.outputs.count}
                onChange={handleChange}
                min="0"
                required
              />
            </td>
            <td>
              <Form.Select
                name="outputs.complexity"
                value={formData.outputs.complexity}
                onChange={handleChange}
                required
              >
                <option value="low">低</option>
                <option value="average">中</option>
                <option value="high">高</option>
              </Form.Select>
            </td>
            <td>4-7</td>
          </tr>
          <tr>
            <td>查询</td>
            <td>
              <Form.Control
                type="number"
                name="inquiries.count"
                value={formData.inquiries.count}
                onChange={handleChange}
                min="0"
                required
              />
            </td>
            <td>
              <Form.Select
                name="inquiries.complexity"
                value={formData.inquiries.complexity}
                onChange={handleChange}
                required
              >
                <option value="low">低</option>
                <option value="average">中</option>
                <option value="high">高</option>
              </Form.Select>
            </td>
            <td>3-6</td>
          </tr>
          <tr>
            <td>文件</td>
            <td>
              <Form.Control
                type="number"
                name="files.count"
                value={formData.files.count}
                onChange={handleChange}
                min="0"
                required
              />
            </td>
            <td>
              <Form.Select
                name="files.complexity"
                value={formData.files.complexity}
                onChange={handleChange}
                required
              >
                <option value="low">低</option>
                <option value="average">中</option>
                <option value="high">高</option>
              </Form.Select>
            </td>
            <td>7-15</td>
          </tr>
          <tr>
            <td>接口</td>
            <td>
              <Form.Control
                type="number"
                name="interfaces.count"
                value={formData.interfaces.count}
                onChange={handleChange}
                min="0"
                required
              />
            </td>
            <td>
              <Form.Select
                name="interfaces.complexity"
                value={formData.interfaces.complexity}
                onChange={handleChange}
                required
              >
                <option value="low">低</option>
                <option value="average">中</option>
                <option value="high">高</option>
              </Form.Select>
            </td>
            <td>5-10</td>
          </tr>
        </tbody>
      </Table>

      <Form.Group className="mb-3" controlId="adjustmentFactor">
        <Form.Label>调整因子 (0-100)</Form.Label>
        <Form.Range
          name="adjustmentFactor"
          value={formData.adjustmentFactor}
          onChange={handleChange}
          min="0"
          max="100"
        />
        <div className="d-flex justify-content-between">
          <span>0</span>
          <span>{formData.adjustmentFactor}</span>
          <span>100</span>
        </div>
      </Form.Group>

      <div className="d-flex justify-content-end">
        <Button variant="primary" type="submit">计算功能点</Button>
      </div>
    </Form>
  );
};

export default FunctionPointForm;