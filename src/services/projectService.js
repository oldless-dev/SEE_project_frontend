// src/services/projectService.js
// 模拟项目数据服务
export const fetchProjects = async () => {
  // 模拟API请求延迟
  await new Promise(resolve => setTimeout(resolve, 500));

  return [
    {
      project_id: 1,
      name: '电子商务平台开发',
      description: '构建一个全功能的B2C电子商务平台',
      start_date: '2023-01-15',
      end_date: '2023-07-30',
      total_budget: 500000
    },
    {
      project_id: 2,
      name: '移动银行应用',
      description: '为银行客户开发移动端银行服务应用',
      start_date: '2023-03-01',
      end_date: '2023-10-31',
      total_budget: 750000
    },
    {
      project_id: 3,
      name: '企业资源规划系统',
      description: '定制开发ERP系统以优化企业流程',
      start_date: '2023-02-10',
      end_date: '2023-12-15',
      total_budget: 1200000
    }
  ];
};

export const createProject = async (projectData) => {
  // 模拟API请求延迟
  await new Promise(resolve => setTimeout(resolve, 300));

  return {
    project_id: Math.floor(Math.random() * 1000) + 4,
    ...projectData
  };
};