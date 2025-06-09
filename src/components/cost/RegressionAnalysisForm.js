// src/components/cost/RegressionAnalysisForm.js
import React, { useState } from 'react';
import { Form, Button, Table } from 'react-bootstrap';

const RegressionAnalysisForm = ({ onSubmit }) => {
  const [dataPoints, setDataPoints] = useState([
    { size: 1000, cost: 50000 },
    { size: 2000, cost: 90000 },
    { size: 3000, cost: 120000 },
    { size: 4000, cost: 150000 },
    { size: 5000, cost: 180000 },
  ]);

  const [newPoint, setNewPoint] = useState({ size: '', cost: '' });
  const [targetSize, setTargetSize] = useState(3500);

  const handleAddPoint = () => {
    if (newPoint.size && newPoint.cost) {
      setDataPoints([...dataPoints, {
        size: Number(newPoint.size),
        cost: Number(newPoint.cost)
      }]);
      setNewPoint({ size: '', cost: '' });
    }
  };

  const handleRemovePoint = (index) => {
    const newData = [...dataPoints];
    newData.splice(index, 1);
    setDataPoints(newData);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      dataPoints,
      targetSize
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <h5>历史项目数据</h5>
      <Table striped bordered className="mb-3">
        <thead>
          <tr>
            <th>项目规模</th>
            <th>实际成本</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {dataPoints.map((point, index) => (
            <tr key={index}>
              <td>{point.size} LOC</td>
              <td>¥{point.cost.toLocaleString()}</td>
              <td>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => handleRemovePoint(index)}
                >
                  删除
                </Button>
              </td>
            </tr>
          ))}
          <tr>
            <td>
              <Form.Control
                type="number"
                placeholder="规模"
                value={newPoint.size}
                onChange={(e) => setNewPoint({...newPoint, size: e.target.value})}
              />
            </td>
            <td>
              <Form.Control
                type="number"
                placeholder="成本"
                value={newPoint.cost}
                onChange={(e) => setNewPoint({...newPoint, cost: e.target.value})}
              />
            </td>
            <td>
              <Button
                variant="outline-success"
                size="sm"
                onClick={handleAddPoint}
              >
                添加
              </Button>
            </td>
          </tr>
        </tbody>
      </Table>

      <Form.Group className="mb-3" controlId="targetSize">
        <Form.Label>目标项目规模 (LOC)</Form.Label>
        <Form.Control
          type="number"
          value={targetSize}
          onChange={(e) => setTargetSize(e.target.value)}
          min="100"
          required
        />
      </Form.Group>

      <div className="d-flex justify-content-end">
        <Button variant="primary" type="submit">运行回归分析</Button>
      </div>
    </Form>
  );
};

export default RegressionAnalysisForm;