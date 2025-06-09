// src/components/metrics/MetricResults.js
import React from 'react';
import { Card, Table } from 'react-bootstrap';

const MetricResults = ({ results }) => {
  if (!results) return null;

  const getNPVStatus = (npv) => {
    if (npv > 0) return { text: "可行", variant: "success" };
    if (npv < 0) return { text: "不可行", variant: "danger" };
    return { text: "盈亏平衡", variant: "warning" };
  };

  const getROIStatus = (roi) => {
    if (roi > 0.2) return { text: "优秀", variant: "success" };
    if (roi > 0.1) return { text: "良好", variant: "info" };
    if (roi > 0) return { text: "一般", variant: "warning" };
    return { text: "亏损", variant: "danger" };
  };

  const npvStatus = getNPVStatus(results.npv);
  const roiStatus = getROIStatus(results.roi);

  return (
    <Card>
      <Card.Header>经济指标分析结果</Card.Header>
      <Card.Body>
        <Table striped bordered>
          <tbody>
            <tr>
              <td><strong>投资回报率 (ROI)</strong></td>
              <td className={`text-${roiStatus.variant}`}>
                {(results.roi * 100).toFixed(2)}%
                <span className="ms-2 badge bg-{roiStatus.variant}">
                  {roiStatus.text}
                </span>
              </td>
            </tr>
            <tr>
              <td><strong>净现值 (NPV)</strong></td>
              <td className={`text-${npvStatus.variant}`}>
                ¥{results.npv.toLocaleString('zh-CN', { maximumFractionDigits: 2 })}
                <span className="ms-2 badge bg-{npvStatus.variant}">
                  {npvStatus.text}
                </span>
              </td>
            </tr>
            <tr>
              <td><strong>内部收益率 (IRR)</strong></td>
              <td>{(results.irr * 100).toFixed(2)}%</td>
            </tr>
            <tr>
              <td><strong>回收期</strong></td>
              <td>{results.paybackPeriod.toFixed(2)} 年</td>
            </tr>
          </tbody>
        </Table>

        <div className="mt-3">
          <h6>投资分析:</h6>
          <p>
            {results.npv > 0 ? (
              <span className="text-success">
                该项目具有投资价值，预计净现值 ¥{results.npv.toLocaleString()}，
                投资回报率 {(results.roi * 100).toFixed(2)}%。
              </span>
            ) : (
              <span className="text-danger">
                该项目投资风险较高，预计净现值 ¥{results.npv.toLocaleString()}，
                投资回报率 {(results.roi * 100).toFixed(2)}%。
              </span>
            )}
          </p>
        </div>
      </Card.Body>
    </Card>
  );
};

export default MetricResults;