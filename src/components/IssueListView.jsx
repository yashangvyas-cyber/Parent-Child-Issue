import { useState } from 'react'
import AssignParentModal from './AssignParentModal'
import { IssueTypeIcon } from './Icons'

const ISSUES = [
  { id: 1, no: 1, type: 'story', key: 'COLLAB-2001', title: 'Implement parent-child issue mapping in task detail view', status: 'inprogress', priority: '🔴', assignees: [{ i: 'YV', c: '#667eea' }, { i: 'AM', c: '#f59e0b' }], estimate: '8h', due: 'Mar 18', parent: 'COLLAB-1990' },
  { id: 2, no: 2, type: 'story', key: 'COLLAB-2002', title: 'Build bulk issue selection and parent assignment toolbar', status: 'inprogress', priority: '🔴', assignees: [{ i: 'RK', c: '#8b5cf6' }], estimate: '5h', due: 'Mar 19', parent: null },
  { id: 3, no: 3, type: 'bug', key: 'COLLAB-2003', title: 'Fix issue key link not opening detail view in Safari', status: 'todo', priority: '🟠', assignees: [{ i: 'SR', c: '#10b981' }], estimate: '2h', due: 'Mar 20', parent: 'COLLAB-1990' },
  { id: 4, no: 4, type: 'task', key: 'COLLAB-2004', title: 'Set up CI/CD pipeline for staging deployment', status: 'todo', priority: '🔴', assignees: [], estimate: '12h', due: 'Mar 22', parent: null },
  { id: 5, no: 5, type: 'task', key: 'COLLAB-2005', title: 'Document API endpoints for third-party integration', status: 'todo', priority: '🟡', assignees: [{ i: 'PL', c: '#06b6d4' }], estimate: '4h', due: 'Mar 25', parent: null },
  { id: 6, no: 6, type: 'story', key: 'COLLAB-2006', title: 'Sprint velocity tracker widget on dashboard', status: 'readyqa', priority: '🟡', assignees: [{ i: 'YV', c: '#667eea' }], estimate: '6h', due: 'Mar 17', parent: 'COLLAB-1991' },
  { id: 7, no: 7, type: 'bug', key: 'COLLAB-2007', title: 'Tooltip overflow bug on compact mobile screens', status: 'readyqa', priority: '🟡', assignees: [{ i: 'AM', c: '#f59e0b' }], estimate: '1h', due: 'Mar 16', parent: null },
  { id: 8, no: 8, type: 'story', key: 'COLLAB-2008', title: 'Onboarding flow design for new enterprise clients', status: 'todo', priority: '🟠', assignees: [{ i: 'SR', c: '#10b981' }, { i: 'RK', c: '#8b5cf6' }], estimate: '16h', due: 'Mar 28', parent: 'COLLAB-1991' },
]

const StatusBadge = ({ status }) => {
  const map = { 
    todo: ['bg-slate-100 text-slate-500 border-slate-200', 'To Do'], 
    inprogress: ['bg-indigo-50 text-indigo-600 border-indigo-100', 'In Progress'], 
    readyqa: ['bg-emerald-50 text-emerald-600 border-emerald-100', 'Ready QA'], 
    closed: ['bg-slate-800 text-slate-400 border-slate-700', 'Closed'] 
  }
  const [cls, label] = map[status] || ['bg-slate-100 text-slate-500 border-slate-200', status]
  return (
    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider border shadow-sm ${cls}`}>
      {label}
    </span>
  )
}

export default function IssueListView({ project, activeTab, onTabChange, onIssueClick }) {
  const [checked, setChecked] = useState([1, 2, 3])
  const [showAssignModal, setShowAssignModal] = useState(false)

  const allChecked = checked.length === ISSUES.length
  const toggleAll = () => setChecked(allChecked ? [] : ISSUES.map(i => i.id))
  const toggleOne = (id) => setChecked(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-2 duration-500">

      {/* Table Container */}
      <div className="bg-white border border-slate-200/60 rounded-3xl shadow-xl shadow-slate-200/40 overflow-hidden relative group/list">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                <th className="px-6 py-4 w-12">
                  <input 
                    type="checkbox" 
                    checked={allChecked} 
                    onChange={toggleAll}
                    className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 transition-all cursor-pointer"
                  />
                </th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.1em] text-slate-400">#</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.1em] text-slate-400">Task</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.1em] text-slate-400 text-center">Priority</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.1em] text-slate-400">Status</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.1em] text-slate-400">Assignee</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.1em] text-slate-400">Timeline</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              {ISSUES.map((issue) => (
                <tr 
                  key={issue.id} 
                  className={`group hover:bg-slate-50/80 transition-all cursor-pointer ${checked.includes(issue.id) ? 'bg-indigo-50/30' : ''}`}
                  onClick={() => toggleOne(issue.id)}
                >
                  <td className="px-6 py-5">
                    <input 
                      type="checkbox" 
                      checked={checked.includes(issue.id)} 
                      onChange={() => toggleOne(issue.id)}
                      onClick={e => e.stopPropagation()}
                      className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 transition-all cursor-pointer"
                    />
                  </td>
                  <td className="px-6 py-5">
                    <span className="text-xs font-black text-slate-300 group-hover:text-slate-500 transition-colors uppercase">{issue.key.split('-')[1]}</span>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col gap-1 max-w-md">
                      <div className="flex items-center gap-2">
                        <IssueTypeIcon type={issue.type} />
                        <span 
                          className="text-[14px] font-black text-slate-800 tracking-tight group-hover:text-indigo-600 transition-colors truncate"
                          onClick={(e) => { e.stopPropagation(); onIssueClick(issue); }}
                        >
                          {issue.title}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                         <span className="text-[10px] font-black text-slate-400 uppercase tracking-wider">{issue.key}</span>
                         {issue.parent && (
                            <>
                              <span className="w-1 h-1 bg-slate-200 rounded-full" />
                              <span className="flex items-center gap-1 text-[10px] font-black text-indigo-400 uppercase tracking-widest">
                                <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"><path d="M12 19V5M12 5l-7 7m7-7l7 7"/></svg>
                                {issue.parent}
                              </span>
                            </>
                         )}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-center">
                    <span className="text-sm filter drop-shadow-sm grayscale group-hover:grayscale-0 transition-all opacity-60 group-hover:opacity-100">{issue.priority}</span>
                  </td>
                  <td className="px-6 py-5">
                    <StatusBadge status={issue.status} />
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex -space-x-1.5 transition-transform group-hover:-translate-x-1">
                      {issue.assignees.map((a, idx) => (
                        <div key={idx} className="w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-[9px] font-black text-white shadow-sm" style={{ background: a.c }}>{a.i}</div>
                      ))}
                      {issue.assignees.length === 0 && (
                        <div className="w-7 h-7 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] text-slate-400 shadow-sm">
                          <svg className="w-4 h-4 text-slate-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-5">
                    <div className="flex flex-col gap-1 text-right">
                      <span className="text-[11px] font-black text-slate-700 tracking-tighter">{issue.due}</span>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{issue.estimate} Est.</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Floating Bulk Toolbar */}
      {checked.length > 0 && (
        <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[200] flex items-center gap-6 px-8 py-4 bg-slate-900 text-white rounded-[2.5rem] shadow-2xl shadow-indigo-500/20 border border-slate-800 border-t-slate-700 animate-in fade-in slide-in-from-bottom-10 duration-500">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center text-white font-black text-sm shadow-lg shadow-indigo-600/30">
              {checked.length}
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-black uppercase tracking-widest text-slate-200">Selected</span>
              <span className="text-[10px] font-bold text-slate-500">Managing {checked.length > 1 ? 'Batch' : 'Issue'}</span>
            </div>
          </div>
          
          <div className="h-10 w-[1px] bg-slate-800 mx-2" />
          
          <div className="flex items-center gap-1.5">
            {[
              { id: 'parent', label: 'Assign Parent', icon: <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>, onClick: () => setShowAssignModal(true), primary: true },
              { id: 'assignee', label: 'Assignee', icon: <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="8.5" cy="7" r="4"/><line x1="20" y1="8" x2="20" y2="14"/><line x1="23" y1="11" x2="17" y2="11"/></svg> },
              { id: 'label', label: 'Label', icon: <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7"/></svg> },
              { id: 'delete', label: 'Delete', icon: <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>, danger: true },
            ].map((btn) => (
              <button 
                key={btn.id}
                onClick={btn.onClick}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-wider transition-all active:scale-95 ${btn.primary ? 'bg-indigo-600 text-white hover:bg-indigo-500 shadow-md shadow-indigo-600/20' : btn.danger ? 'text-rose-400 hover:bg-rose-500/10' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
              >
                {btn.icon}
                {btn.label}
              </button>
            ))}
          </div>

          <button 
            className="w-10 h-10 rounded-2xl bg-slate-800 text-slate-500 hover:text-white hover:bg-slate-700 transition-all flex items-center justify-center border border-slate-700 ml-4 shadow-inner"
            onClick={() => setChecked([])}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>
      )}

      {/* Assign Parent Modal */}
      {showAssignModal && (
        <AssignParentModal
          selectedIssues={ISSUES.filter(i => checked.includes(i.id))}
          onClose={() => setShowAssignModal(false)}
          onAssign={(parent, strategy) => {
            const count = strategy === 'skip' 
              ? ISSUES.filter(i => checked.includes(i.id) && !i.parent).length
              : checked.length;
            
            alert(`Parent ${parent.key} assigned to ${count} issue(s) using strategy: ${strategy}`)
            setShowAssignModal(false)
            setChecked([])
          }}
        />
      )}
    </div>
  )
}
