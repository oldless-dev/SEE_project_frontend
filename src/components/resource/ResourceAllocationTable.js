// src/components/resource/ResourceAllocationTable.js
import React from 'react';
import { Table, Button } from 'react-bootstrap';

const ResourceAllocationTable = ({ resources, allocations, onAllocate }) => {
  // 计算每个资源的已分配数量
  const allocatedCounts = {};
  allocations.forEach(allocation => {
    if (!allocatedCounts[allocation.resource_id]) {
      allocatedCounts[allocation.resource_id] = 0;
    }
    allocatedCounts[allocation.resource_id] += allocation.quantity_used;
  });

  // 计算可用性
  const resourceAvailability = resources.map(resource => {
    const allocated = allocatedCounts[resource.resource_id] || 0;
    return {
      ...resource,
      allocated,
      available: resource.availability - allocated
    };
  });

  return (
    <div className="table-responsive">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>资源名称</th>
            <th>成本 (每单位)</th>
            <th>总可用量</th>
            <th>已分配</th>
            <th>剩余可用</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {resourceAvailability.map(resource => (
            <tr key={resource.resource_id}>
              <td>{resource.resource_name}</td>
              <td>¥{resource.cost_per_unit.toLocaleString()}</td>
              <td>{resource.availability}</td>
              <td>{resource.allocated}</td>
              <td className={resource.available === 0 ? 'text-danger' : ''}>
                {resource.available}
              </td>
              <td>
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() => onAllocate(resource)}
                  disabled={resource.available === 0}
                >
                  分配
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default ResourceAllocationTable;