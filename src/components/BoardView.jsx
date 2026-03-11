import { useState } from 'react'
import CreateIssueModal from './CreateIssueModal'
import { IssueTypeIcon } from './Icons'

const COLUMNS = [
  { id: 'todo', label: 'To Do', color: '#3b82f6', dot: '#3b82f6', cards: [
    { key: 'COLLAB-2004', title: 'Set up CI/CD pipeline for staging deployment', assignees: [{ initials: 'YV', color: '#667eea' }], priority: '🔴', type: 'bug' },
  ]},
  { id: 'inprogress', label: 'In Progress', color: '#f59e0b', dot: '#f59e0b', cards: [
    { key: 'COLLAB-2001', title: 'Implement parent-child issue mapping', assignees: [{ initials: 'YV', color: '#667eea' }], priority: '🔴', type: 'story' },
  ]},
  { id: 'inreview', label: 'In Review', color: '#ef4444', dot: '#ef4444', cards: [
    { key: 'COLLAB-2003', title: 'Code review for authentication module', assignees: [{ initials: 'AM', color: '#f59e0b' }], priority: '🟠', type: 'task' },
  ]},
  { id: 'readyqa', label: 'Ready For QA', color: '#10b981', dot: '#10b981', cards: [
    { key: 'COLLAB-1998', title: 'Sprint velocity tracker widget', assignees: [{ initials: 'PL', color: '#06b6d4' }], priority: '🟡', type: 'epic' },
  ]},
  { id: 'closed', label: 'Closed', color: '#6b7280', dot: '#6b7280', cards: [
    { key: 'COLLAB-1995', title: 'Dark mode toggle for dashboard', assignees: [{ initials: 'AM', color: '#f59e0b' }], priority: '🟡', type: 'story' },
  ]},
]

export default function BoardView({ project, onIssueClick }) {
  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-2 duration-500">
      {/* Board Columns */}
      <div className="flex-1 overflow-x-auto pb-4">
        <div className="flex gap-4 h-full min-w-max">
          {COLUMNS.map(col => (
            <div key={col.id} className="w-[280px] flex flex-col bg-slate-100/50 rounded-xl border border-slate-200/60 p-2.5 group/col">
              {/* Column Header */}
              <div className="flex items-center justify-between px-2 py-2 mb-2">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ background: col.dot }} />
                  <span className="text-[12px] font-bold text-slate-700 uppercase tracking-tight">{col.label}</span>
                  <span className="px-1.5 py-0.5 rounded-full bg-slate-200 text-[10px] font-black text-slate-500">{col.cards.length}</span>
                </div>
                <div className="flex items-center gap-1 opacity-0 group-hover/col:opacity-100 transition-opacity">
                  <button className="w-6 h-6 rounded flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:bg-white">+</button>
                  <button className="w-6 h-6 rounded flex items-center justify-center text-slate-400 hover:text-indigo-600 hover:bg-white">
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><circle cx="12" cy="12" r="1"/><circle cx="12" cy="5" r="1"/><circle cx="12" cy="19" r="1"/></svg>
                  </button>
                </div>
              </div>

              {/* Cards Container */}
              <div className="flex-1 flex flex-col gap-2 overflow-y-auto custom-scrollbar pr-0.5">
                {col.cards.map(card => (
                  <div
                    key={card.key}
                    className="bg-white p-3 rounded-lg border border-slate-200 shadow-sm hover:border-indigo-300 transition-all cursor-pointer group/card"
                    onClick={() => onIssueClick(card)}
                  >
                    <p className="text-[12px] font-bold text-slate-800 leading-normal mb-6 group-hover:text-indigo-600 transition-colors">{card.title}</p>
                    <div className="flex items-center justify-between mt-auto">
                       <div className="flex items-center gap-1.5">
                        <IssueTypeIcon type={card.type} size="w-3.5 h-3.5" />
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">{card.key}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <span className="text-xs">{card.priority}</span>
                        <div className="w-6 h-6 rounded-full border border-white flex items-center justify-center text-[8px] font-black text-white shadow-sm" style={{ background: card.assignees[0]?.color || '#cbd5e1' }}>
                          {card.assignees[0]?.initials || '?'}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                {/* Empty State placeholder if needed */}
                <div className="h-20 border-2 border-dashed border-slate-200 rounded-lg flex items-center justify-center opacity-40 hover:opacity-100 hover:bg-slate-50 transition-all cursor-pointer">
                   <span className="text-xl font-light text-slate-400">+</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
