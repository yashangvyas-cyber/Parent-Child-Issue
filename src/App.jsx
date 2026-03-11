import { useState } from 'react'
import Sidebar from './components/Sidebar'
import GlobalHeader from './components/GlobalHeader'
import SubHeader from './components/SubHeader'
import FilterBar from './components/FilterBar'
import BoardView from './components/BoardView'
import IssueListView from './components/IssueListView'
import IssueDetailView from './components/IssueDetailView'
import ProjectListView from './components/ProjectListView'
import CreateIssueModal from './components/CreateIssueModal'

function App() {
  const [activeNav, setActiveNav] = useState('tasks')
  const [activeTab, setActiveTab] = useState('board')
  const [selectedProject, setSelectedProject] = useState(null)
  const [selectedIssue, setSelectedIssue] = useState(null)
  const [showCreateModal, setShowCreateModal] = useState(false)

  const projects = [
    { id: 1, name: 'Yopmail', type: 'Hire Base Project', role: 'Business Analyst (BA)', status: 'Active' },
    { id: 2, name: 'CollabCRM Platform', type: 'Hire Base Project', role: 'Developer', status: 'In Progress' },
    { id: 3, name: 'Parent-Child Issue Mapping', type: 'Fixed Cost', role: 'UI/UX Designer', status: 'Active' },
  ]

  const handleNavChange = (navId) => {
    setActiveNav(navId)
    // If clicking "Tasks" (the module), reset project selection to show project list (same as official)
    if (navId === 'tasks') {
      setSelectedProject(null)
      setSelectedIssue(null)
    }
  }

  const handleProjectSelect = (p) => {
    setSelectedProject(p)
    setActiveTab('board')
    setSelectedIssue(null)
  }

  const handleIssueSelect = (issue) => {
    setSelectedIssue(issue)
  }

  const renderMainContent = () => {
    if (activeNav === 'tasks') {
      // 1. No Project Selected -> Show Official Project Table
      if (!selectedProject) {
        return <ProjectListView projects={projects} onSelect={handleProjectSelect} />
      }

      // 2. Issue Selected -> Show Detail (hide tabs at layout level)
      if (selectedIssue) {
        return <IssueDetailView issue={selectedIssue} onBack={() => setSelectedIssue(null)} />
      }

      // 3. Project Selected -> Show Board or List
      return activeTab === 'board'
        ? <BoardView project={selectedProject} onIssueClick={handleIssueSelect} />
        : <IssueListView project={selectedProject} activeTab={activeTab} onTabChange={setActiveTab} onIssueClick={handleIssueSelect} />
    }

    return (
      <div className="flex-1 flex items-center justify-center bg-slate-50/50">
        <div className="text-center space-y-4 animate-in fade-in zoom-in duration-500">
          <div className="w-16 h-16 bg-white rounded-3xl shadow-xl shadow-slate-200 flex items-center justify-center mx-auto border border-slate-100">
            <svg className="w-8 h-8 text-indigo-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
          </div>
          <h2 className="text-xl font-black text-slate-800 uppercase tracking-tight">{activeNav.replace('-', ' ')} view</h2>
          <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">Coming Soon in Future Update</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen bg-white font-['Outfit'] select-none overflow-hidden">
      <GlobalHeader />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar active={activeNav} onNavChange={handleNavChange} />

        <main className="flex-1 flex flex-col bg-white overflow-hidden relative">
          {/* CONDITIONAL HEADERS BASED ON CONTEXT */}
          {activeNav === 'tasks' && (
            <>
              {/* If no project selected, or if project selected but no issue detail: show Breadcrumbs */}
              <SubHeader 
                project={selectedProject}
                issue={selectedIssue}
                activeTab={activeTab} 
                onTabChange={setActiveTab} 
                onBreadcrumbClick={handleNavChange}
              />
              
              {/* Only show FilterBar on Board/List views (NOT in Project List, NOT in Issue Detail) */}
              {selectedProject && !selectedIssue && (
                <FilterBar onCreateIssue={() => setShowCreateModal(true)} />
              )}
            </>
          )}

          <div className="flex-1 overflow-auto bg-slate-50/30">
            {renderMainContent()}
          </div>
        </main>
      </div>

      {showCreateModal && <CreateIssueModal onClose={() => setShowCreateModal(false)} />}
    </div>
  )
}

export default App
