import { useState } from 'react'
import Sidebar from './components/Sidebar'
import TopHeader from './components/TopHeader'
import ProjectListView from './components/ProjectListView'
import BoardView from './components/BoardView'
import IssueListView from './components/IssueListView'
import IssueDetailView from './components/IssueDetailView'
import './index.css'

export default function App() {
  const [activeNav, setActiveNav] = useState('tasks')
  const [activeView, setActiveView] = useState('projects') // projects, board, issue-list, issue-detail
  const [selectedProject, setSelectedProject] = useState(null)
  const [activeTab, setActiveTab] = useState('board')
  const [selectedIssue, setSelectedIssue] = useState(null)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const handleProjectClick = (project) => {
    setSelectedProject(project)
    setActiveView('board')
    setActiveTab('board')
    setActiveNav('tasks')
  }

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    if (tab === 'board') setActiveView('board')
    else if (tab === 'issue-list') setActiveView('issue-list')
  }

  const handleIssueClick = (issue) => {
    setSelectedIssue(issue)
    setActiveView('issue-detail')
  }

  const handleBack = () => {
    setActiveView(activeTab === 'board' ? 'board' : 'issue-list')
  }

  const renderContent = () => {
    if (activeNav === 'tasks' && activeView === 'projects') {
      return <ProjectListView onProjectClick={handleProjectClick} />
    }
    if (activeView === 'board') {
      return (
        <BoardView
          project={selectedProject}
          activeTab={activeTab}
          onTabChange={handleTabChange}
          onIssueClick={handleIssueClick}
        />
      )
    }
    if (activeView === 'issue-list') {
      return (
        <IssueListView
          project={selectedProject}
          activeTab={activeTab}
          onTabChange={handleTabChange}
          onIssueClick={handleIssueClick}
        />
      )
    }
    if (activeView === 'issue-detail') {
      return (
        <IssueDetailView
          issue={selectedIssue}
          onBack={handleBack}
          project={selectedProject}
        />
      )
    }
    return (
      <div style={{ padding: 40, color: 'var(--text-muted)', textAlign: 'center' }}>
        <div style={{ fontSize: 48, marginBottom: 12 }}>🚧</div>
        <div style={{ fontSize: 16, fontWeight: 600 }}>Coming Soon</div>
      </div>
    )
  }

  return (
    <div className="flex h-screen bg-white overflow-hidden font-inter antialiased">
      <Sidebar
        activeNav={activeNav}
        onNavChange={(nav) => { setActiveNav(nav); if (nav === 'tasks') setActiveView('projects'); }}
        collapsed={sidebarCollapsed}
        onCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      <div className="flex-1 flex flex-col min-w-0 bg-slate-50/50 relative overflow-hidden">
        <TopHeader />
        <main className="flex-1 overflow-y-auto p-8 relative scroll-smooth cursor-default">
          <div className="max-w-[1600px] mx-auto">
            {renderContent()}
          </div>
        </main>
        
        {/* Subtle Decorative Gradient */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-indigo-50/30 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2 pointer-events-none -z-10" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-amber-50/20 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/2 pointer-events-none -z-10" />
      </div>
    </div>
  )
}
