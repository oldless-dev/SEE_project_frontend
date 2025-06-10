// src/pages/ProjectList.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import ProjectCard from '../components/ProjectCard';
// import ProjectForm from '../components/ProjectForm';
import { fetchProjects, createProject } from '../services/projectService';

export default function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const loadProjects = async () => {
      const data = await fetchProjects();
      setProjects(data);
    };
    loadProjects();
  }, []);

  const handleCreateProject = async (projectData) => {
    const newProject = await createProject(projectData);
    setProjects([...projects, newProject]);
    setShowForm(false);
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>项目管理</h1>
        <button className="btn btn-primary" onClick={() => setShowForm(true)}>
          创建新项目
        </button>
      </div>

      {showForm && (
        <div className="card mb-4">
          <div className="card-body">
            {/*<ProjectForm onSubmit={handleCreateProject} onCancel={() => setShowForm(false)} />*/}
          </div>
        </div>
      )}

      <div className="row">
        {projects.map(project => (
          <div className="col-md-6 col-lg-4 mb-4" key={project.project_id}>
            <Link to={`/cost-estimation/${project.project_id}`} style={{ textDecoration: 'none' }}>
              {/*<ProjectCard project={project} />*/}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}