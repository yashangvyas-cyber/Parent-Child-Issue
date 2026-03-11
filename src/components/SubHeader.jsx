export default function SubHeader({ project, issue, activeTab, onTabChange, onBreadcrumbClick }) {
  const tabs = [
    { id: 'board', label: 'Board' },
    { id: 'issue-list', label: 'Issue List' },
    { id: 'backlog', label: 'Backlog' },
    { id: 'completed-sprints', label: 'Completed Sprints' },
    { id: 'notification-settings', label: 'Notification Settings' },
  ]

  const hasProject = !!(project && project.id)
  // Lock global tabs to project context. Only show if we HAVE a project but NO issue focused.
  // The official screenshot shows breadcrumbs at Home > Tasks > ProjectName when inside an issue.
  const showTabs = hasProject && !issue

  return (
    <div className={`bg-white ${showTabs ? 'border-b border-slate-200' : ''}`}>
      {/* Global Breadcrumb Row */}
      <div className="h-10 flex items-center px-6 gap-2">
        <div className="flex items-center text-[12px] text-slate-400 font-bold uppercase tracking-wider">
          <svg className="w-3.5 h-3.5 mr-2 text-slate-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1" ry="1"/></svg>
          <span className="cursor-pointer hover:text-indigo-600 transition-all">Home</span>
          <span className="mx-2 text-slate-200">/</span>
          <span 
            className="cursor-pointer hover:text-indigo-600 transition-all font-bold"
            onClick={() => onBreadcrumbClick('tasks')}
          >
            Tasks
          </span>
          
          {hasProject && (
            <>
              <span className="mx-2 text-slate-200">/</span>
              <div 
                className="flex items-center gap-1 cursor-pointer group"
                onClick={() => onBreadcrumbClick('tasks')} // Conceptually go back to project context
              >
                <div className="flex items-center gap-1 px-2 py-1 bg-indigo-50 border border-indigo-100/50 rounded-lg">
                   <span className="text-indigo-700 font-black">{project.name}</span>
                   <svg className="w-3 h-3 text-indigo-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="6 9 12 15 18 9"/></svg>
                </div>
              </div>
              <div className="ml-3 w-7 h-7 flex items-center justify-center rounded-lg hover:bg-slate-50 transition-all cursor-pointer group">
                <svg className="w-3.5 h-3.5 text-amber-400 group-hover:fill-amber-400 transition-all" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              </div>
            </>
          )}
          
          {/* Note: In official screenshot, the issue-specific hierarchy starts INSIDE the white box below the breadcrumb */}
        </div>
      </div>

      {/* Tabs Row */}
      {showTabs && (
        <div className="flex items-center px-6 h-9 gap-0 animate-in slide-in-from-top-1 duration-200 overflow-x-auto scrollbar-hide">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={`px-4 h-full text-[12px] font-bold border-b-2 transition-all whitespace-nowrap
                ${activeTab === tab.id
                  ? 'border-indigo-600 text-indigo-600'
                  : 'border-transparent text-slate-400 hover:text-slate-600 hover:border-slate-200'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
