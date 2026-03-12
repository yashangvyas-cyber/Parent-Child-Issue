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

export default function IssueListView({ project, activeTab, onTabChange, onIssueClick, activeBulkAction, onCancelBulkAction }) {
  const [checked, setChecked] = useState([])
  const [showAssignModal, setShowAssignModal] = useState(false)

  const allChecked = checked.length === ISSUES.length && ISSUES.length > 0;
  const toggleAll = () => setChecked(allChecked ? [] : ISSUES.map(i => i.id))
  const toggleOne = (id) => setChecked(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id])

  const isBulkMode = !!activeBulkAction;

  const handleBulkActionConfirm = () => {
    if (activeBulkAction === 'parent') {
      setShowAssignModal(true)
    } else {
      alert(`Action ${activeBulkAction} applied to ${checked.length} issues`)
      onCancelBulkAction()
      setChecked([])
    }
  }

  const handleCancelClick = () => {
    onCancelBulkAction()
    setChecked([])
  }

  const actionLabels = {
    parent: 'Assign Parent',
    assignee: 'Assignee',
    label: 'Label',
    delete: 'Delete'
  }

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-2 duration-500">

      {/* Table Container */}
      <div className="bg-white border border-slate-200/60 rounded-3xl shadow-xl shadow-slate-200/40 overflow-hidden relative group/list">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[1000px]">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/50">
                {isBulkMode && (
                  <th className="px-6 py-3 min-w-[300px]">
                    <div className="flex items-center gap-4">
                      <input 
                        type="checkbox" 
                        checked={allChecked} 
                        onChange={toggleAll}
                        className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 transition-all cursor-pointer"
                      />
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={handleBulkActionConfirm}
                          disabled={checked.length === 0}
                          className={`px-3 py-1.5 rounded-lg text-[11px] font-black uppercase tracking-wider transition-all disabled:opacity-50 ${activeBulkAction === 'delete' ? 'bg-rose-500 text-white shadow-md shadow-rose-500/20 hover:bg-rose-600' : 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20 hover:bg-indigo-700'} `}
                        >
                          {actionLabels[activeBulkAction]}
                        </button>
                        <button 
                          onClick={handleCancelClick}
                          className="px-3 py-1.5 rounded-lg text-[11px] font-black uppercase tracking-wider text-slate-600 border border-slate-300 hover:border-slate-400 hover:bg-slate-50 transition-all bg-white"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </th>
                )}
                {!isBulkMode && (
                  <th className="px-6 py-4 w-12 text-[10px] font-black uppercase tracking-[0.1em] text-slate-400">#</th>
                )}
                {isBulkMode && (
                  <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.1em] text-slate-400">#</th>
                )}
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
                  className={`group hover:bg-slate-50/80 transition-all cursor-pointer ${isBulkMode && checked.includes(issue.id) ? 'bg-indigo-50/30' : ''}`}
                  onClick={() => isBulkMode ? toggleOne(issue.id) : null}
                >
                  {isBulkMode && (
                    <td className="px-6 py-5">
                      <input 
                        type="checkbox" 
                        checked={checked.includes(issue.id)} 
                        onChange={() => toggleOne(issue.id)}
                        onClick={e => e.stopPropagation()}
                        className="w-4 h-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 transition-all cursor-pointer"
                      />
                    </td>
                  )}
                  {!isBulkMode && (
                    <td className="px-6 py-5">
                      <span className="text-xs font-black text-slate-300 group-hover:text-slate-500 transition-colors uppercase">{issue.key.split('-')[1]}</span>
                    </td>
                  )}
                  {isBulkMode && (
                    <td className="px-6 py-5">
                      <span className="text-xs font-black text-slate-300 group-hover:text-slate-500 transition-colors uppercase">{issue.key.split('-')[1]}</span>
                    </td>
                  )}
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
            onCancelBulkAction()
          }}
        />
      )}
    </div>
  )
}
