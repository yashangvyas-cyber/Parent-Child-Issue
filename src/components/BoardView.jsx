import { useState } from 'react'
import CreateIssueModal from './CreateIssueModal'
import { IssueTypeIcon } from './Icons'

const COLUMNS = [
  {
    id: 'todo', label: 'To Do', color: '#3b82f6', dot: '#3b82f6',
    cards: [
      { key: 'COLLAB-2004', title: 'Set up CI/CD pipeline for staging deployment', assignees: [{ initials: 'YV', color: '#667eea' }], priority: '🔴', type: 'bug' },
      { key: 'COLLAB-2008', title: 'Design onboarding flow for new enterprise clients', assignees: [{ initials: 'SR', color: '#10b981' }], priority: '🟠', type: 'story' },
      { key: 'COLLAB-2011', title: 'Migrate legacy auth tokens to JWT', assignees: [], priority: '🔴', type: 'task' },
    ]
  },
  {
    id: 'inprogress', label: 'In Progress', color: '#f59e0b', dot: '#f59e0b',
    cards: [
      { key: 'COLLAB-2001', title: 'Implement parent-child issue mapping in task detail view', assignees: [{ initials: 'YV', color: '#667eea' }, { initials: 'AM', color: '#f59e0b' }], priority: '🔴', type: 'story' },
      { key: 'COLLAB-2002', title: 'Build bulk issue selection and parent assignment', assignees: [{ initials: 'RK', color: '#8b5cf6' }], priority: '🟠', type: 'story' },
    ]
  },
  {
    id: 'readyqa', label: 'Ready for QA', color: '#10b981', dot: '#10b981',
    cards: [
      { key: 'COLLAB-1998', title: 'Sprint velocity tracker widget', assignees: [{ initials: 'PL', color: '#06b6d4' }], priority: '🟡', type: 'epic' },
      { key: 'COLLAB-1999', title: 'Fix tooltip overflow on mobile screens', assignees: [{ initials: 'SR', color: '#10b981' }], priority: '🟡', type: 'bug' },
    ]
  },
  {
    id: 'closed', label: 'Closed', color: '#6b7280', dot: '#6b7280',
    cards: [
      { key: 'COLLAB-1995', title: 'Dark mode toggle for dashboard', assignees: [{ initials: 'AM', color: '#f59e0b' }], priority: '🟡', type: 'story' },
      { key: 'COLLAB-1996', title: 'Export issues to CSV', assignees: [{ initials: 'YV', color: '#667eea' }], priority: '🟠', type: 'task' },
      { key: 'COLLAB-1997', title: 'Notification bell integration', assignees: [{ initials: 'RK', color: '#8b5cf6' }], priority: '🟡', type: 'story' },
    ]
  },
]

export default function BoardView({ project, activeTab, onTabChange, onIssueClick }) {
  const [showCreate, setShowCreate] = useState(false)

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-3 duration-700">
      {/* Page Header Area */}
      <div className="flex flex-col gap-6 mb-8">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest">
              <span>Projects</span>
              <span className="text-slate-300">/</span>
              <span className="text-indigo-500">{project?.name || 'CollabCRM Platform'}</span>
            </div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tight">Project Board</h2>
          </div>
          <button 
            className="bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-black text-xs shadow-lg shadow-indigo-100 hover:bg-indigo-700 hover:shadow-indigo-200 transition-all active:scale-95 flex items-center gap-2"
            onClick={() => setShowCreate(true)}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
            </svg>
            Create Issue
          </button>
        </div>

        {/* View Switcher & Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 p-2 bg-slate-100/50 rounded-2xl border border-slate-200/50">
          <div className="flex items-center bg-white p-1 rounded-xl shadow-sm border border-slate-200/60">
            {['board', 'issue-list'].map(tab => (
              <button
                key={tab}
                className={`px-4 py-2 rounded-lg text-[11px] font-black uppercase tracking-wider transition-all ${activeTab === tab ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100' : 'text-slate-500 hover:text-slate-800'}`}
                onClick={() => onTabChange(tab)}
              >
                {tab === 'board' ? 'Card Board' : 'Table List'}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div className="flex -space-x-2 group cursor-pointer">
              {[{ i: 'YV', c: '#667eea' }, { i: 'SR', c: '#10b981' }, { i: 'AM', c: '#f59e0b' }].map((a, idx) => (
                <div key={idx} className="w-8 h-8 rounded-full border-2 border-white flex items-center justify-center text-[10px] font-black text-white shadow-sm ring-1 ring-slate-100 group-hover:scale-110 transition-transform" style={{ background: a.c }}>{a.i}</div>
              ))}
              <div className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[8px] font-black text-slate-500 shadow-sm ring-1 ring-slate-100">+2</div>
            </div>
            <div className="h-6 w-[1px] bg-slate-200 mx-1" />
            <button className="h-8 px-3 rounded-lg border border-slate-200 text-[10px] font-black uppercase tracking-wider text-slate-500 hover:bg-white hover:border-slate-300 transition-all flex items-center gap-1.5 shadow-sm">
              <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/></svg>
              Labels
            </button>
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 border border-emerald-100/50 shadow-sm">
              <span className="text-[10px] font-black text-emerald-600 uppercase tracking-tighter">Active Sprint 12</span>
              <span className="w-1 h-1 bg-emerald-300 rounded-full" />
              <span className="text-[10px] font-bold text-emerald-500">Ends in 2d</span>
            </div>
          </div>
        </div>
      </div>

      {/* Board Columns */}
      <div className="flex-1 overflow-x-auto pb-4 scroll-smooth">
        <div className="flex gap-6 h-full min-w-max">
          {COLUMNS.map(col => (
            <div key={col.id} className="w-80 flex flex-col bg-slate-100/40 rounded-3xl border border-slate-200/50 p-3 group/col">
              <div className="flex items-center justify-between px-3 py-2 mb-4">
                <div className="flex items-center gap-2.5">
                  <span className="w-2.5 h-2.5 rounded-full shadow-sm" style={{ background: col.dot }} />
                  <span className="text-[13px] font-black text-slate-800 tracking-tight">{col.label}</span>
                  <span className="px-1.5 py-0.5 rounded-md bg-white border border-slate-200 text-[10px] font-black text-slate-400 shadow-sm">{col.cards.length}</span>
                </div>
                <button className="w-6 h-6 rounded-lg bg-white border border-slate-200 flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:border-indigo-200 transition-all shadow-sm opacity-0 group-hover/col:opacity-100">+</button>
              </div>

              <div className="flex-1 flex flex-col gap-3 overflow-y-auto pr-1 custom-scrollbar">
                {col.cards.map(card => (
                  <div 
                    key={card.key} 
                    className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:shadow-slate-200/30 hover:-translate-y-1 transition-all cursor-pointer group/card"
                    onClick={() => onIssueClick(card)}
                  >
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <span className="text-[13px] font-bold text-slate-700 leading-tight group-hover/card:text-indigo-600 transition-colors">{card.title}</span>
                    </div>
                    
                    <div className="flex items-center justify-between pt-3 border-t border-slate-50">
                      <div className="flex items-center gap-2">
                        <IssueTypeIcon type={card.type} size="w-4 h-4" />
                        <span className="text-[10px] font-black text-slate-400 group-hover/card:text-indigo-400 uppercase tracking-wider">{card.key}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs leading-none grayscale group-hover/card:grayscale-0 transition-all">{card.priority}</span>
                        <div className="flex -space-x-1.5">
                          {card.assignees.map((a, i) => (
                            <div key={i} className="w-5 h-5 rounded-full border border-white flex items-center justify-center text-[7px] font-black text-white shadow-sm" style={{ background: a.color }}>{a.initials}</div>
                          ))}
                          {card.assignees.length === 0 && (
                             <div className="w-5 h-5 rounded-full border border-slate-100 bg-slate-50 flex items-center justify-center">
                                <svg className="w-3 h-3 text-slate-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                             </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Create Issue Modal */}
      {showCreate && <CreateIssueModal onClose={() => setShowCreate(false)} />}
    </div>
  )
}
