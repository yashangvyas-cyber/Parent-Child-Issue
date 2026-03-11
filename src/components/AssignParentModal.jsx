import { useState } from 'react'
import { IssueTypeIcon } from './Icons'

const ALL_ISSUES = [
  { key: 'COLLAB-1990', title: 'Q1 Platform Reliability Initiative', type: 'epic' },
  { key: 'COLLAB-1991', title: 'Dashboard & Reporting Overhaul', type: 'epic' },
  { key: 'COLLAB-1992', title: 'Mobile App Performance Sprint', type: 'epic' },
  { key: 'COLLAB-1993', title: 'API Gateway Upgrade', type: 'epic' },
  { key: 'COLLAB-1994', title: 'Security Audit & Remediation', type: 'epic' },
  { key: 'COLLAB-2000', title: 'Sprint 12 Epic: Feature Development', type: 'epic' },
  { key: 'COLLAB-2010', title: 'Infrastructure modernization initiative', type: 'epic' },
]

export default function AssignParentModal({ selectedIssues, onClose, onAssign }) {
  const [search, setSearch] = useState('')
  const [selected, setSelected] = useState(null)
  const [showWarning, setShowWarning] = useState(false)

  const selectedCount = selectedIssues.length
  const hasParentCount = selectedIssues.filter(i => i.parent).length
  const isMixed = hasParentCount > 0 && hasParentCount < selectedCount

  const filtered = ALL_ISSUES.filter(i =>
    i.key.toLowerCase().includes(search.toLowerCase()) ||
    i.title.toLowerCase().includes(search.toLowerCase())
  )

  const handleInitialAssign = () => {
    if (hasParentCount > 0) {
      setShowWarning(true)
    } else {
      onAssign(selected, 'assign')
    }
  }

  if (showWarning) {
    return (
      <div className="fixed inset-0 z-[1001] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xl animate-in fade-in duration-300">
        <div className="bg-white w-full max-w-[440px] rounded-[2.5rem] shadow-[0_32px_80px_rgba(0,0,0,0.15)] border border-slate-200/60 overflow-hidden animate-in zoom-in-95 duration-300 p-12 flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-[2rem] bg-amber-50 flex items-center justify-center text-4xl mb-8 shadow-inner shadow-amber-200/50">
             <svg className="w-10 h-10 text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
          </div>
          
          <h3 className="text-[22px] font-black text-slate-900 mb-3 tracking-tight">Overwrite Existing Parents?</h3>
          <p className="text-[14px] text-slate-500 font-medium mb-10 leading-relaxed px-2">
            {hasParentCount} of the selected issues already have a parent assigned. 
            <span className="block mt-1">Do you want to overwrite them with this new parent <span className="text-indigo-600 font-black">{selected?.key}</span>?</span>
          </p>

          <div className="flex flex-col w-full gap-3.5">
            <button 
              onClick={() => onAssign(selected, 'overwrite')}
              className="w-full h-14 bg-indigo-600 text-white rounded-2xl text-[13px] font-black uppercase tracking-widest shadow-xl shadow-indigo-600/20 hover:bg-indigo-700 hover:scale-[1.02] active:scale-95 transition-all"
            >
              Overwrite All
            </button>
            {isMixed && (
              <button 
                onClick={() => onAssign(selected, 'skip')}
                className="w-full h-14 bg-white border-2 border-slate-100 text-slate-800 rounded-2xl text-[13px] font-black uppercase tracking-widest hover:border-indigo-100 hover:bg-indigo-50/30 active:scale-95 transition-all shadow-sm"
              >
                Skip Existing
              </button>
            )}
            <button 
              onClick={() => setShowWarning(false)}
              className="w-full h-12 text-slate-400 text-[11px] font-black uppercase tracking-[0.2em] hover:text-slate-900 transition-colors mt-2"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={onClose}>
      <div 
        className="bg-white w-full max-w-lg rounded-[2rem] shadow-2xl shadow-indigo-500/10 border border-slate-200 overflow-hidden flex flex-col animate-in zoom-in-95 duration-300" 
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-slate-100">
          <div className="flex flex-col">
            <h3 className="text-lg font-black text-slate-900 tracking-tight">Assign Parent Issue</h3>
            <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Linking {selectedCount} items</p>
          </div>
          <button 
            className="w-10 h-10 rounded-2xl bg-slate-50 text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all flex items-center justify-center border border-slate-100 shadow-inner"
            onClick={onClose}
          >
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          </button>
        </div>

        {/* Selection Info */}
        <div className="px-8 py-4 bg-indigo-50/50 border-b border-indigo-100/50">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
            <span className="text-[11px] font-black text-indigo-600 uppercase tracking-wider">
               Choose a parent to link {selectedCount > 1 ? 'these' : 'this'} {selectedCount} issue{selectedCount > 1 ? 's' : ''} to
            </span>
          </div>
        </div>

        {/* Search */}
        <div className="px-8 py-5">
          <div className="relative group">
             <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <svg className="w-3.5 h-3.5 text-slate-400 group-focus-within:text-indigo-500 transition-colors" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
             </div>
             <input
               autoFocus
               value={search}
               onChange={e => setSearch(e.target.value)}
               placeholder="Search by issue key or title..."
               className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-11 pr-4 py-3 text-xs outline-none focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50 transition-all font-semibold placeholder:text-slate-300 shadow-inner"
             />
          </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto px-4 pb-4 max-h-[320px] custom-scrollbar">
          <div className="space-y-1.5 px-4">
            {filtered.map(issue => (
              <div
                key={issue.key}
                className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl cursor-pointer transition-all border group/item ${selected?.key === issue.key ? 'bg-indigo-600 border-indigo-600 shadow-lg shadow-indigo-600/20' : 'bg-white border-transparent hover:bg-slate-50 hover:border-slate-200'}`}
                onClick={() => setSelected(issue)}
              >
                <div className="w-8 h-8 flex items-center justify-center transition-colors">
                   <IssueTypeIcon type={issue.type} size="w-6 h-6" />
                </div>
                <div className="flex flex-col flex-1 gap-0.5">
                  <span className={`text-[10px] font-black uppercase tracking-widest ${selected?.key === issue.key ? 'text-indigo-200' : 'text-slate-400 group-hover/item:text-indigo-400'}`}>{issue.key}</span>
                  <span className={`text-[13px] font-bold tracking-tight ${selected?.key === issue.key ? 'text-white' : 'text-slate-700'}`}>{issue.title}</span>
                </div>
                {selected?.key === issue.key && (
                  <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center animate-in zoom-in-0 duration-300">
                    <svg className="w-3 h-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  </div>
                )}
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="py-12 text-center">
                <div className="w-16 h-16 rounded-3xl bg-slate-50 border-2 border-dashed border-slate-200 mx-auto mb-4 flex items-center justify-center text-2xl grayscale">🔎</div>
                <div className="text-[13px] font-black text-slate-800">No issues found</div>
                <div className="text-xs text-slate-400 mt-1">Try searching for a different key or title</div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-8 py-6 bg-slate-50 border-t border-slate-100 flex items-center justify-end gap-3">
          <button 
            className="px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider text-slate-500 hover:text-slate-800 hover:bg-white transition-all border border-transparent hover:border-slate-200 shadow-sm"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-lg active:scale-95 ${selected ? 'bg-indigo-600 text-white hover:bg-indigo-700 shadow-indigo-600/20' : 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none'}`}
            onClick={handleInitialAssign}
            disabled={!selected}
          >
            Assign Parent
          </button>
        </div>
      </div>
    </div>
  )
}
