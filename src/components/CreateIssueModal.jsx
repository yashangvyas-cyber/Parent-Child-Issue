import { useState, useRef, useEffect } from 'react'
import { IssueTypeIcon } from './Icons'

const PARENT_OPTIONS = [
  { key: 'COLLAB-1234', title: 'Mobile App Overhaul',                           type: 'epic'  },
  { key: 'COLLAB-1100', title: 'Platform Reliability Initiative Q1',            type: 'epic'  },
  { key: 'COLLAB-1589', title: 'Export timesheet report',                       type: 'story' },
  { key: 'COLLAB-1582', title: 'Business unit filter in recruiter efficiency',  type: 'story' },
  { key: 'COLLAB-1560', title: 'Revamp onboarding flow for new enterprise',     type: 'epic'  },
]

// const TYPE_ICON  = { task: '✅', story: '📗', epic: '⚡', bug: '🔴' }
const TYPE_COLOR = { epic: '#7c3aed', story: '#2563eb', task: '#059669', bug: '#dc2626' }

function ParentDropdown({ onSelect, onClose, style = {} }) {
  const [search, setSearch] = useState('')
  const ref = useRef(null)

  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) onClose() }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [onClose])

  const filtered = PARENT_OPTIONS.filter(p =>
    p.key.toLowerCase().includes(search.toLowerCase()) ||
    p.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div ref={ref} 
      className="absolute top-full mt-1.5 left-0 w-[340px] bg-white border-[1.5px] border-blue-500 rounded-xl shadow-premium z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200"
      style={style}
    >
      <div className="p-2.5 border-b border-slate-100 bg-slate-50/50">
        <input
          autoFocus
          value={search}
          onChange={e => setSearch(e.target.value)}
          placeholder="Search by issue key or title"
          className="w-full bg-white border border-slate-200 rounded-lg px-3.5 py-1.5 text-xs outline-none focus:border-blue-300 focus:ring-4 focus:ring-blue-50 transition-all font-medium"
        />
      </div>
      <div className="max-h-[280px] overflow-y-auto">
        {filtered.length === 0 ? (
          <div className="p-6 text-center text-slate-400 text-xs">No issues found</div>
        ) : filtered.map(p => (
          <div
            key={p.key}
            onMouseDown={() => onSelect(p)}
            className="flex items-center gap-3 px-4 py-2.5 cursor-pointer text-xs hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-b-0"
          >
            <IssueTypeIcon type={p.type} />
            <span className="font-bold min-w-[90px]" style={{ color: TYPE_COLOR[p.type] }}>{p.key}</span>
            <span className="text-slate-700 flex-1 truncate font-medium">{p.title}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function CreateIssueModal({ onClose }) {
  const [title, setTitle]           = useState('')
  const [parent, setParent]               = useState({ key: 'COLLAB-1234', title: 'Mobile App Overhaul', type: 'epic' })
  const [showParent, setShowParent]       = useState(false)
  const [showSidebarParent, setShowSidebarParent] = useState(false)
  const [status, setStatus]               = useState('To Do')
  const btnRef = useRef(null)
  const sidebarParentRef = useRef(null)

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-[2px] flex items-center justify-center z-[200] p-4 animate-in fade-in duration-200" onClick={onClose}>
      <div className="bg-white rounded-2xl w-full max-w-[760px] max-h-[90vh] shadow-premium flex flex-col overflow-hidden animate-in zoom-in-95 slide-in-from-bottom-4 duration-300" onClick={e => e.stopPropagation()}>

        {/* ─── Modal Header ───────────────────────── */}
        <div className="flex items-center gap-4 px-6 py-4 border-b border-slate-100 bg-white">
          <span className="text-[15px] font-black text-slate-800 tracking-tight">Create Issue</span>
          <span className="w-px h-4 bg-slate-200" />

          {/* ─── SELECT PARENT button ─────────────── */}
          <div className="relative" ref={btnRef}>
            {parent ? (
              /* SELECTED state */
              <button
                onClick={() => setShowParent(v => !v)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-full text-[11px] font-bold shadow-sm transition-all hover:shadow-md active:scale-95"
                style={{
                  background: parent.type === 'epic' ? '#ede9fe' : '#dbeafe',
                  border: `1px solid ${parent.type === 'epic' ? '#c4b5fd' : '#93c5fd'}`,
                  color: TYPE_COLOR[parent.type],
                }}
              >
                <IssueTypeIcon type={parent.type} size="w-3.5 h-3.5" />
                <span className="tracking-wide">{parent.key}</span>
                {/* Clear X */}
                <span
                  onClick={e => { e.stopPropagation(); setParent(null); setShowParent(false) }}
                  className="ml-1 opacity-60 hover:opacity-100 transition-opacity"
                >✕</span>
              </button>
            ) : (
              /* DEFAULT state */
              <button
                onClick={() => setShowParent(v => !v)}
                className="flex items-center gap-2 px-4 py-1.5 bg-white border border-slate-200 rounded-full text-[11px] font-bold text-slate-500 hover:border-slate-300 hover:bg-slate-50 transition-all shadow-sm active:scale-95"
              >
                Select Parent <span className="text-[10px] opacity-40">▾</span>
              </button>
            )}

            {/* Dropdown */}
            {showParent && (
              <ParentDropdown
                onSelect={p => { setParent(p); setShowParent(false) }}
                onClose={() => setShowParent(false)}
              />
            )}
          </div>

          {/* Status selector */}
          <div className="ml-auto flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-1.5 bg-blue-600 text-white rounded-lg text-[11px] font-black uppercase tracking-widest cursor-pointer hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-95">
              {status} <span className="opacity-60">▾</span>
            </div>
            <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-400 transition-colors">✕</button>
          </div>
        </div>

        {/* ─── Modal Body ─────────────────────────── */}
        <div className="flex flex-1 overflow-hidden bg-slate-50/20">

          {/* Left column */}
          <div className="flex-1 px-8 py-6 overflow-y-auto border-r border-slate-100">
            {/* Title */}
            <div className="mb-8 group">
              <div className="text-[12px] font-black text-slate-400 uppercase tracking-widest mb-2.5 flex items-center gap-1.5">
                Title <span className="text-red-500 font-bold">*</span>
              </div>
              <input
                autoFocus
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="What needs to be done?"
                className="w-full bg-white border-2 border-slate-100 rounded-xl px-4 py-3 text-[15px] font-semibold text-slate-900 outline-none focus:border-blue-500 shadow-sm transition-all placeholder:text-slate-300"
              />
            </div>

            {/* Description */}
            <div className="mb-4">
              <div className="text-[12px] font-black text-slate-400 uppercase tracking-widest mb-2.5">Description</div>

              {/* Toolbar */}
              <div className="flex items-center gap-1 px-3 py-2 bg-slate-50 border border-slate-200 border-b-0 rounded-t-xl overflow-x-auto scrollbar-hide">
                {['Normal', '𝐁', '𝐼', 'U̲', 'S̶', 'A', 'A', '≡', '⊟', '🔗', '<>', '↗'].map((t, i) => (
                  <button key={i} className="w-7 h-7 flex items-center justify-center rounded-md hover:bg-white hover:text-blue-600 hover:shadow-sm text-[13px] text-slate-500 font-medium transition-all">{t}</button>
                ))}
              </div>
              <textarea
                placeholder="Add a detailed description..."
                className="w-full min-h-[220px] bg-white border border-slate-200 rounded-b-xl px-4 py-3 text-[14px] text-slate-700 outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-300 transition-all resize-none shadow-sm placeholder:text-slate-300"
              />
            </div>
          </div>

          {/* Right sidebar */}
          <div className={`w-[240px] px-5 py-6 bg-slate-50/50 flex flex-col gap-6 select-none ${showSidebarParent ? 'overflow-visible' : 'overflow-y-auto'}`}>
            {[
              { label: 'Assignee',       value: null,     action: '+ Add', action2: 'Assign to me' },
              { label: 'Reporter',       value: null,     action: '+ Add' },
              { label: 'Issue Type',     value: 'Task',   icon: <IssueTypeIcon type="task" size="w-3.5 h-3.5" /> },
              { label: 'Parent',         isParent: true },
              { label: 'Priority',       value: 'Medium', icon: '=' },
              { label: 'Sprint',         value: 'Select Sprint' },
              { label: 'Due Date',       value: 'Select Date' },
              { label: 'Estimated Time', value: 'Add Estimation' },
            ].map(field => (
              <div key={field.label} className="relative group" ref={field.isParent ? sidebarParentRef : null}>
                <div className="text-[10px] font-black text-slate-400 uppercase tracking-[0.1em] mb-2">{field.label}</div>
                
                {field.action ? (
                  <div className="flex flex-col gap-1.5">
                    <button className="w-fit bg-indigo-50 border border-indigo-100 text-indigo-600 px-3 py-1 rounded-lg text-xs font-bold hover:bg-indigo-100 transition-all active:scale-95 shadow-sm">{field.action}</button>
                    {field.action2 && <span className="text-[10px] text-indigo-400 font-bold cursor-pointer hover:text-indigo-600 hover:underline px-1">{field.action2}</span>}
                  </div>
                ) : (
                  <div 
                    onClick={() => {
                      if (field.isParent) setShowSidebarParent(!showSidebarParent)
                    }}
                    className={`flex items-center justify-between gap-2 px-3 py-1.5 rounded-lg border transition-all cursor-pointer min-h-[32px] ${
                      (field.isParent || field.label === 'Sprint' || field.label === 'Priority') 
                      ? 'bg-white border-slate-200 shadow-sm hover:border-blue-300 hover:bg-blue-50/30' 
                      : 'border-transparent hover:bg-slate-100'
                    }`}
                  >
                    <div className="flex items-center gap-2 flex-1 overflow-hidden">
                      {field.isParent ? (
                        parent ? (
                          <>
                            <IssueTypeIcon type={parent.type} size="w-3.5 h-3.5" />
                            <span className="font-extrabold text-blue-600 text-[11px] uppercase tracking-tighter">{parent.key}</span>
                            <span className="text-[11px] text-slate-500 font-medium truncate">{parent.title}</span>
                          </>
                        ) : (
                          <span className="text-[11px] font-bold text-slate-400">Select Parent</span>
                        )
                      ) : (
                        <>
                          {field.icon && <span className="text-sm">{field.icon}</span>}
                          <span className={`text-[11px] font-bold truncate ${field.value?.startsWith('Select') ? 'text-slate-300' : 'text-slate-700'}`}>{field.value}</span>
                        </>
                      )}
                    </div>
                    
                    <div className="flex items-center gap-1.5 flex-shrink-0">
                      {field.isParent && parent && (
                        <span 
                          onClick={e => { e.stopPropagation(); setParent(null) }}
                          className="w-4 h-4 flex items-center justify-center rounded-full hover:bg-slate-200 text-slate-400 text-[10px] transition-colors"
                        >✕</span>
                      )}
                      {field.label === 'Due Date' && <span className="text-xs">📅</span>}
                      {field.label === 'Estimated Time' && <span className="text-xs">⏱</span>}
                      {!['Due Date','Estimated Time','Assignee','Reporter'].includes(field.label) && <span className="text-[10px] text-slate-300 group-hover:text-blue-400 transition-colors">▾</span>}
                    </div>
                  </div>
                )}

                {field.isParent && showSidebarParent && (
                  <ParentDropdown 
                    style={{ position: 'absolute', top: '100%', right: 0, left: 'auto', width: 360 }}
                    onSelect={p => { setParent(p); setShowSidebarParent(false) }} 
                    onClose={() => setShowSidebarParent(false)} 
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* ─── Footer ─────────────────────────────── */}
        <div className="flex justify-end gap-3 px-6 py-4 border-t border-slate-100 bg-white">
          <button 
            onClick={onClose} 
            className="px-6 py-2 border border-slate-200 rounded-xl text-[13px] font-bold text-slate-600 bg-white hover:bg-slate-50 hover:border-slate-300 transition-all active:scale-95 shadow-sm"
          >Cancel</button>
          <button 
            className="px-8 py-2 bg-blue-600 border border-blue-700 rounded-xl text-[13px] font-black text-white hover:bg-blue-700 shadow-lg shadow-blue-200 transition-all active:scale-95 active:shadow-inner"
          >Create Issue</button>
        </div>
      </div>
    </div>
  )
}
