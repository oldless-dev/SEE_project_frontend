// src/components/risk/DecisionTree.js
import React, { useState } from 'react';
import {Button, Card, Col, Form, Row} from 'react-bootstrap';
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState
} from 'reactflow';
import 'reactflow/dist/style.css';

const DecisionTree = ({ projectId, risks }) => {
  const [decisionTree, setDecisionTree] = useState({
    name: '项目决策',
    options: [
      { name: '继续投资', value: 500000, probability: 0.6 },
      { name: '缩减规模', value: 300000, probability: 0.3 },
      { name: '放弃项目', value: -100000, probability: 0.1 }
    ]
  });

  const [newOption, setNewOption] = useState({ name: '', value: '', probability: '' });

  const initialNodes = [
    {
      id: '1',
      type: 'input',
      data: { label: decisionTree.name },
      position: { x: 250, y: 0 }
    },
    ...decisionTree.options.map((option, i) => ({
      id: `2-${i}`,
      data: {
        label: `${option.name}\n价值: ¥${option.value.toLocaleString()}\n概率: ${(option.probability * 100).toFixed(0)}%`
      },
      position: { x: i * 200, y: 100 }
    }))
  ];

  const initialEdges = decisionTree.options.map((option, i) => ({
    id: `e1-${i}`,
    source: '1',
    target: `2-${i}`,
    animated: true,
    label: `${(option.probability * 100).toFixed(0)}%`
  }));

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const handleAddOption = () => {
    if (newOption.name && newOption.value && newOption.probability) {
      const updatedOptions = [
        ...decisionTree.options,
        {
          name: newOption.name,
          value: parseFloat(newOption.value),
          probability: parseFloat(newOption.probability) / 100
        }
      ];

      setDecisionTree({ ...decisionTree, options: updatedOptions });
      setNewOption({ name: '', value: '', probability: '' });

      // 更新节点
      const newNodes = [
        ...initialNodes,
        {
          id: `2-${updatedOptions.length - 1}`,
          data: {
            label: `${newOption.name}\n价值: ¥${parseFloat(newOption.value).toLocaleString()}\n概率: ${newOption.probability}%`
          },
          position: { x: (updatedOptions.length - 1) * 200, y: 100 }
        }
      ];

      const newEdges = [
        ...initialEdges,
        {
          id: `e1-${updatedOptions.length - 1}`,
          source: '1',
          target: `2-${updatedOptions.length - 1}`,
          animated: true,
          label: `${newOption.probability}%`
        }
      ];

      setNodes(newNodes);
      setEdges(newEdges);
    }
  };

  // 计算期望值
  const expectedValue = decisionTree.options.reduce(
    (sum, option) => sum + (option.value * option.probability), 0
  );

  return (
    <div className="analysis-section">
      <h4 className="section-title">决策树分析</h4>

      <div style={{ height: 300, border: '1px solid #ddd', borderRadius: 8, marginBottom: 20 }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          fitView
        >
          <Background />
          <Controls />
          <MiniMap />
        </ReactFlow>
      </div>

      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h5>决策选项</h5>
          <p className="mb-0">
            <strong>期望值:</strong> ¥{expectedValue.toLocaleString('zh-CN', { maximumFractionDigits: 2 })}
          </p>
        </div>

        <div>
          <Button variant="outline-primary" size="sm">保存决策树</Button>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>决策选项</th>
              <th>预期价值 (¥)</th>
              <th>概率 (%)</th>
              <th>期望值 (¥)</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            {decisionTree.options.map((option, index) => (
              <tr key={index}>
                <td>{option.name}</td>
                <td>{option.value.toLocaleString()}</td>
                <td>{(option.probability * 100).toFixed(1)}%</td>
                <td>{(option.value * option.probability).toLocaleString('zh-CN', { maximumFractionDigits: 2 })}</td>
                <td>
                  <Button variant="outline-danger" size="sm">删除</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Card className="mt-3">
        <Card.Body>
          <h5>添加新选项</h5>
          <Form>
            <Row>
              <Col md={4}>
                <Form.Group>
                  <Form.Label>选项名称</Form.Label>
                  <Form.Control
                    type="text"
                    value={newOption.name}
                    onChange={(e) => setNewOption({...newOption, name: e.target.value})}
                    placeholder="例如：外包开发"
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group>
                  <Form.Label>预期价值 (¥)</Form.Label>
                  <Form.Control
                    type="number"
                    value={newOption.value}
                    onChange={(e) => setNewOption({...newOption, value: e.target.value})}
                    placeholder="例如：250000"
                  />
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group>
                  <Form.Label>概率 (%)</Form.Label>
                  <Form.Control
                    type="number"
                    value={newOption.probability}
                    onChange={(e) => setNewOption({...newOption, probability: e.target.value})}
                    placeholder="0-100"
                    min="0"
                    max="100"
                    step="1"
                  />
                </Form.Group>
              </Col>
              <Col md={2} className="d-flex align-items-end">
                <Button variant="primary" onClick={handleAddOption}>添加</Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default DecisionTree;