import { useState, useRef, useEffect } from 'react'
import { IssueTypeIcon } from './Icons'

/* ─── Mock Data ─────────────────────────────────── */
const EXISTING_ISSUES = [
  { key: 'COLLAB-2050', title: 'Leave settings form UI optimization', type: 'task' },
  { key: 'COLLAB-2047', title: 'Attendance > Store the metrics in table', type: 'task' },
  { key: 'COLLAB-2046', title: 'Store name of client in client access table', type: 'task' },
  { key: 'COLLAB-2044', title: 'ANALYSIS > Candidate portal for jobs', type: 'task' },
  { key: 'COLLAB-2036', title: 'Signature pulling behaviour > Proposal and offer letter', type: 'task' },
  { key: 'COLLAB-2033', title: 'Typing indicator for chat window', type: 'task' },
  { key: 'COLLAB-1589', title: 'Export timesheet report', type: 'story' },
  { key: 'COLLAB-1582', title: 'Business unit filter in recruiter efficiency report', type: 'story' },
]

const PARENT_OPTIONS = [
  { key: 'COLLAB-1234', title: 'Mobile App Overhaul', type: 'epic' },
  { key: 'COLLAB-1100', title: 'Platform Reliability Initiative Q1', type: 'epic' },
  { key: 'COLLAB-1589', title: 'Export timesheet report', type: 'story' },
  { key: 'COLLAB-1582', title: 'Business unit filter in recruiter efficiency report', type: 'story' },
]

// const TYPE_ICON = { task: '✅', story: '📗', epic: '⚡', bug: '🔴', subtask: '🔵' }

/* ─── Choose Existing Inline Dropdown ───────────── */
function ChooseExistingDropdown({ search, onChoose, onClose }) {
  const ref = useRef(null)

  useEffect(() => {
    const handler = (e) => { if (ref.current && !ref.current.contains(e.target)) onClose() }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [onClose])

  const filtered = EXISTING_ISSUES.filter(i =>
    i.key.toLowerCase().includes(search.toLowerCase()) ||
    i.title.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div ref={ref} className="absolute top-full mt-1.5 inset-x-0 bg-white border-[1.5px] border-blue-500 rounded-xl shadow-premium z-50 flex flex-col overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
      <div className="overflow-y-auto max-h-[280px]">
        {filtered.length === 0 ? (
          <div className="p-4 text-center text-slate-400 text-xs">No issues found</div>
        ) : filtered.map(issue => (
          <div
            key={issue.key}
            onMouseDown={() => onChoose(issue)}
            className="flex items-center gap-3 px-4 py-2.5 cursor-pointer text-xs hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-b-0"
          >
            <IssueTypeIcon type={issue.type} />
            <span className="text-blue-600 font-bold min-w-[90px]">{issue.key}</span>
            <span className="text-slate-700 flex-1 truncate">{issue.title}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── Main Component ─────────────────────────────── */
export default function IssueDetailView({ issue, onBack, project }) {
  const pKey  = issue?.key   || 'COLLAB-2002'
  const pTitle = issue?.title || 'Issue parent child re-assignment in bulk'

  // Visibility state for the add-child entry area
  const [showChildAddRow, setShowChildAddRow] = useState(false)

  // Child issues state
  const [children, setChildren] = useState([
    { key: 'COLLAB-2003', title: 'Fix issue key link in Safari',       statusLabel: 'To Do',     statusClass: 'badge-todo'     },
    { key: 'COLLAB-2006', title: 'Sprint velocity tracker widget',      statusLabel: 'Ready QA',  statusClass: 'badge-readyqa'  },
  ])
  const [childType, setChildType]     = useState('Sub-Task')
  const [childInput, setChildInput]   = useState('')
  const [isSearching, setIsSearching] = useState(false)

  // Sidebar Parent state
  const [parent, setParent]                         = useState({ key: 'COLLAB-1234', title: 'Mobile App Overhaul', type: 'epic' })
  const [showParentDropdown, setShowParentDropdown] = useState(false)
  const [parentSearch, setParentSearch]             = useState('')
  const parentRef                                   = useRef(null)

  // Activity
  const [actTab, setActTab]   = useState('Comments')
  const [comment, setComment] = useState('')

  const addChild = () => {
    if (!childInput.trim()) return
    setChildren(prev => [...prev, {
      key: `COLLAB-${2020 + prev.length}`,
      title: childInput.trim(),
      statusLabel: 'To Do', statusClass: 'badge-todo'
    }])
    setChildInput('')
  }

  const linkExisting = (chosen) => {
    if (!children.find(c => c.key === chosen.key)) {
      setChildren(prev => [...prev, {
        key: chosen.key, title: chosen.title,
        statusLabel: 'To Do', statusClass: 'badge-todo'
      }])
    }
    setIsSearching(false)
    setChildInput('')
  }

  const unlinkChild = (key) => setChildren(prev => prev.filter(c => c.key !== key))

  const filteredParents = PARENT_OPTIONS.filter(p =>
    p.key.toLowerCase().includes(parentSearch.toLowerCase()) ||
    p.title.toLowerCase().includes(parentSearch.toLowerCase())
  )

  // Close parent dropdown when clicking outside
  useEffect(() => {
    const handler = (e) => { if (parentRef.current && !parentRef.current.contains(e.target)) setShowParentDropdown(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  const actionBtnStyle = {
    display: 'flex', alignItems: 'center', gap: 5,
    padding: '5px 12px', background: 'var(--bg)',
    border: '1px solid var(--border)', borderRadius: 5,
    fontSize: 12, fontWeight: 500, cursor: 'pointer', color: 'var(--text-primary)',
  }

  return (
    <div className="flex flex-col h-full bg-white">

      {/* ─── Top Bar ───────────────────────────────── */}
      <div className="flex items-center gap-3 px-5 py-2.5 border-b border-slate-100 bg-white shadow-sm">
        <div className="flex items-center gap-2 text-[13px]">
          {parent && (
            <>
              <span className="text-indigo-600 font-medium cursor-pointer flex items-center gap-2 hover:text-indigo-700 group">
                <IssueTypeIcon type={parent.type} size="w-4 h-4" />
                {parent.key}
              </span>
              <span className="text-slate-400 font-light">/</span>
            </>
          )}
          <span className="text-blue-600 font-bold flex items-center gap-1.5 bg-blue-50/50 px-2.5 py-1 rounded-lg border border-blue-100/50 shadow-sm">
            <IssueTypeIcon type="task" size="w-3.5 h-3.5" />
            {pKey}
          </span>
        </div>

        {/* Right actions */}
        <div className="ml-auto flex items-center gap-2.5">
          <button className="flex items-center justify-center w-7 h-7 border border-slate-200 rounded-md hover:bg-slate-50 text-slate-500 transition-colors">▶</button>
          <button className="flex items-center gap-1 px-2.5 py-1 border border-slate-200 rounded-md text-xs text-slate-500 hover:bg-slate-50 transition-colors">👁 3</button>
          <div className="flex items-center gap-1.5 px-3.5 py-1.5 bg-amber-500 text-white rounded-md text-xs font-bold cursor-pointer hover:bg-amber-600 shadow-md transition-all active:scale-95">
            In Progress 🧑‍💻 ▾
          </div>
          <button className="text-lg text-slate-400 hover:text-slate-600 transition-colors px-1">⋮</button>
        </div>
      </div>

      {/* ─── Body ───────────────────────────────────── */}
      <div className="flex flex-1 overflow-hidden">

        {/* LEFT PANEL */}
        <div className="flex-1 overflow-y-auto px-10 py-8 bg-slate-50/30">

          {/* Title */}
          <h1 className="text-2xl font-extrabold text-slate-900 mb-6 leading-tight tracking-tight">
            <span className="text-slate-400 font-normal">ANALYSIS {'>'} </span>
            {pTitle}
          </h1>

          {/* Action Bar */}
          <div className="flex gap-2.5 mb-8">
            <button className="flex items-center gap-2 px-3.5 py-1.5 bg-white border border-slate-200 rounded-lg text-[13px] font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 hover:shadow-sm transition-all active:scale-95">
              <span className="text-base">📎</span> Attach
            </button>
            <button 
              className={`flex items-center gap-2 px-3.5 py-1.5 border rounded-lg text-[13px] font-semibold transition-all active:scale-95 ${showChildAddRow ? 'bg-indigo-50 border-indigo-200 text-indigo-600 shadow-inner' : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 hover:shadow-sm'}`}
              onClick={() => {
                setShowChildAddRow(!showChildAddRow)
                if (showChildAddRow) setIsSearching(false)
              }}
            >
              <span className="text-base">👶</span> Add Child
            </button>
            <button className="flex items-center gap-2 px-3.5 py-1.5 bg-white border border-slate-200 rounded-lg text-[13px] font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 hover:shadow-sm transition-all active:scale-95">
              <span className="text-base">🔗</span> Link Issue
            </button>
            <button className="flex items-center gap-2 px-3.5 py-1.5 bg-white border border-slate-200 rounded-lg text-[13px] font-semibold text-slate-700 hover:bg-slate-50 hover:border-slate-300 hover:shadow-sm transition-all active:scale-95">
              <span className="text-base">☑</span> Add Checklist
            </button>
          </div>

          {/* Description */}
          <div className="mb-10 group">
            <div className="text-[14px] font-bold text-slate-800 mb-3 flex items-center gap-2">
              Description
              <span className="opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-slate-400">✎</span>
            </div>
            <div className="text-[14px] text-slate-600 leading-relax bg-white p-5 rounded-xl border border-slate-100 shadow-sm">
              <p className="mb-3">As of now in the bulk import of issues, we do not allow parent child relation.</p>
              <p className="mb-3">All of the records would be imported as independent issues.</p>
              <p className="font-medium text-slate-700">We want to provide a mechanism where after the file is imported, the project manager can assign the parent child relationship so that correct mapping can be done for <span className="text-indigo-600 font-bold underline decoration-indigo-200 underline-offset-4">all</span> imported issues.</p>
            </div>
          </div>

          {/* ─── CHILD ISSUES ─────────────────────── */}
          <div className="mb-10">
            <div className="text-[14px] font-bold text-slate-800 mb-4 flex items-center gap-2">
              Child Issues <span className="text-slate-400 font-normal text-xs bg-slate-100 px-2 py-0.5 rounded-full">{children.length}</span>
            </div>

            {/* Existing children - ALWAYS VISIBLE */}
            {children.length > 0 && (
              <div className="flex flex-col gap-2 mb-4">
                {children.map(child => (
                  <div key={child.key} className="flex items-center gap-3 px-4 py-3 bg-white border border-slate-200/60 rounded-xl shadow-sm hover:border-indigo-200 transition-all group">
                    <span className="text-sm">✅</span>
                    <span className="text-blue-600 font-bold text-[13px] min-w-[90px] cursor-pointer hover:underline decoration-2 underline-offset-4">{child.key}</span>
                    <span className="flex-1 text-[13px] text-slate-700 font-medium">{child.title}</span>
                    <span className={`badge ${child.statusClass} scale-90 origin-right`}>{child.statusLabel}</span>
                    <button
                      onClick={() => unlinkChild(child.key)}
                      title="Unlink child issue"
                      className="opacity-0 group-hover:opacity-100 transition-opacity w-7 h-7 flex items-center justify-center rounded-lg hover:bg-red-50 hover:text-red-500 text-slate-400"
                    >✕</button>
                  </div>
                ))}
              </div>
            )}

            {/* Add child entry row - TOGGLEABLE via Add Child button */}
            {showChildAddRow && (
              <div className="border border-slate-200 rounded-xl overflow-visible relative shadow-sm bg-white animate-in zoom-in-95 duration-200">
                {!isSearching ? (
                  /* DEFAULT STATE: Sub-Task + Write Here */
                  <>
                    <div className="flex items-center p-1">
                      <div className="px-3 bg-slate-50 border-r border-slate-100 h-10 flex items-center gap-2 flex-shrink-0 rounded-l-lg">
                        <select
                          value={childType}
                          onChange={e => setChildType(e.target.value)}
                          className="bg-transparent text-xs font-bold text-slate-600 cursor-pointer outline-none hover:text-indigo-600 transition-colors"
                        >
                          <option>Sub-Task</option>
                          <option>Task</option>
                          <option>Bug</option>
                          <option>Story</option>
                        </select>
                      </div>

                      <input
                        value={childInput}
                        onChange={e => setChildInput(e.target.value)}
                        onKeyDown={e => e.key === 'Enter' && addChild()}
                        placeholder="Write Here..."
                        className="flex-1 h-10 px-4 text-[13px] outline-none placeholder-slate-300 font-medium"
                      />
                    </div>
                    <div className="flex items-center justify-between px-4 py-2 bg-slate-50/50 rounded-b-xl border-t border-slate-100">
                      <button
                        onClick={() => { setIsSearching(true); setChildInput('') }}
                        className="text-xs font-bold text-indigo-600 hover:text-indigo-700 underline decoration-indigo-200 underline-offset-4 decoration-2 transition-all flex items-center gap-1.5"
                      >
                        <span className="text-sm">🔍</span> Choose Existing
                      </button>
                      <div className="flex gap-2">
                        <button onClick={() => setShowChildAddRow(false)} className="px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-bold text-slate-600 bg-white hover:bg-slate-50 transition-all">Cancel</button>
                        <button onClick={addChild} className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all shadow-sm ${childInput.trim() ? 'bg-indigo-600 text-white hover:bg-indigo-700 active:scale-95' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}>Add</button>
                      </div>
                    </div>
                  </>
                ) : (
                  /* ACTIVE SEARCH STATE: Full-width search bar with back arrow */
                  <div className="relative p-1">
                    <div className="flex items-center gap-2 px-3 py-1 text-slate-400 focus-within:text-slate-900 transition-colors">
                      <button 
                        onClick={() => setIsSearching(false)}
                        className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-500 transition-all"
                      >
                        ←
                      </button>
                      <input
                        autoFocus
                        value={childInput}
                        onChange={e => setChildInput(e.target.value)}
                        placeholder="Search for a work item..."
                        className="flex-1 h-10 text-[13px] outline-none font-semibold placeholder-slate-300"
                      />
                    </div>
                    <ChooseExistingDropdown
                      search={childInput}
                      onChoose={linkExisting}
                      onClose={() => setIsSearching(false)}
                    />
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ─── ACTIVITY ─────────────────────────── */}
          <div className="mt-4">
            <div className="text-[14px] font-bold text-slate-800 mb-6">Activity</div>
            {/* Tabs */}
            <div className="flex items-center gap-4 border-b border-slate-100 mb-8 overflow-x-auto scrollbar-hide">
              {['Comments', 'History', 'Checklist History', 'Work Logs'].map(t => (
                <button key={t}
                  onClick={() => setActTab(t)}
                  className={`px-1 pb-3 text-[13px] font-bold transition-all whitespace-nowrap border-b-2 ${actTab === t ? 'text-indigo-600 border-indigo-600' : 'text-slate-400 border-transparent hover:text-slate-600'}`}>
                  {t}
                </button>
              ))}
              <span className="ml-auto text-[11px] font-bold text-slate-400 uppercase tracking-widest pb-3">Newest First ⇅</span>
            </div>

            {actTab === 'Comments' && (
              <div className="space-y-12">
                <div className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white shadow-sm flex items-center justify-center font-bold text-slate-500 text-xs flex-shrink-0">YV</div>
                  <div className="flex-1">
                    <input
                      value={comment}
                      onChange={e => setComment(e.target.value)}
                      placeholder="Write a comment..."
                      className="w-full bg-white border border-slate-200 rounded-xl px-5 py-3 text-[13px] outline-none shadow-sm focus:border-indigo-300 focus:ring-4 focus:ring-indigo-50 transition-all"
                    />
                    <div className="mt-2 flex gap-3 text-[11px] font-bold text-slate-400">
                      <span>Pro-tip: Press M to comment</span>
                    </div>
                  </div>
                </div>

                <div className="text-center py-10 opacity-60">
                  <div className="w-24 h-24 rounded-3xl bg-slate-100 border-2 border-dashed border-slate-200 mx-auto mb-6 flex items-center justify-center text-4xl grayscale group hover:grayscale-0 transition-all duration-500">
                    💬
                  </div>
                  <div className="text-sm font-bold text-slate-900 mb-1">No comments found.</div>
                  <div className="text-xs text-slate-400">Be the first to share your thoughts!</div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* ─── RIGHT SIDEBAR ──────────────────────── */}
        <div className="w-[340px] border-l border-slate-100 overflow-y-auto flex-shrink-0 bg-white">

          {/* Assignee */}
          <SidebarField label="Assignee">
            <div className="flex flex-col gap-3">
              <AssigneeRow initials="KP" color="#f59e0b" name="Kamlesh Puraswani" />
              <AssigneeRow initials="YV" color="#10b981" name="Yashang Vyas" showX />
              <button className="mt-2 px-3.5 py-1.5 bg-indigo-50 text-indigo-600 rounded-lg text-xs font-bold hover:bg-indigo-100 transition-all flex items-center gap-2 w-fit shadow-sm">
                <span className="text-sm">+</span> Add
              </button>
            </div>
          </SidebarField>

          {/* Reporter */}
          <SidebarField label="Reporter">
            <AssigneeRow initials="BG" color="#1e293b" name="Bhumi Goklani" showX />
          </SidebarField>

          {/* Issue Type */}
          <SidebarField label="Issue Type">
            <DropdownRow icon="✅" value="Task" />
          </SidebarField>

          {/* ─── PARENT FIELD ─────────────────────── */}
          <SidebarField label="Parent">
            <div ref={parentRef} className="relative flex-1">
              {parent ? (
                /* Populated state */
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-50 border border-indigo-100 rounded-full text-xs font-bold text-indigo-700 cursor-pointer hover:bg-indigo-100 transition-all shadow-sm">
                  <IssueTypeIcon type={parent.type} size="w-3.5 h-3.5" />
                  <span>{parent.key}</span>
                  <span className="text-[10px] text-indigo-400 font-medium max-w-[120px] truncate">
                    {parent.title}
                  </span>
                  {/* Clear X */}
                  <button
                    onClick={e => { e.stopPropagation(); setParent(null) }}
                    className="ml-1 hover:text-indigo-900 transition-colors"
                  >✕</button>
                </div>
              ) : (
                /* Empty / search state */
                <button
                  onClick={() => setShowParentDropdown(v => !v)}
                  className="px-4 py-1.5 bg-white border border-dashed border-slate-200 rounded-full text-xs font-bold text-slate-400 hover:border-indigo-400 hover:text-indigo-600 transition-all"
                >+ Set Parent</button>
              )}

              {/* Parent Dropdown */}
              {showParentDropdown && (
                <div className="absolute top-full mt-2 inset-x-0 bg-white border-[1.5px] border-blue-500 rounded-xl shadow-premium z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="p-2 border-b border-slate-100">
                    <input
                      autoFocus
                      value={parentSearch}
                      onChange={e => setParentSearch(e.target.value)}
                      placeholder="Search items..."
                      className="w-full bg-slate-50 border border-slate-100 rounded-lg px-3 py-1.5 text-xs outline-none focus:bg-white transition-all font-medium"
                    />
                  </div>
                  <div className="max-h-[200px] overflow-y-auto">
                    {filteredParents.map(p => (
                      <div
                        key={p.key}
                        onClick={() => { setParent(p); setShowParentDropdown(false); setParentSearch('') }}
                        className="flex items-center gap-3 px-4 py-2.5 cursor-pointer text-xs hover:bg-slate-50 transition-colors border-b border-slate-50 last:border-b-0"
                      >
                        <span>{TYPE_ICON[p.type]}</span>
                        <span className="text-blue-600 font-bold min-w-[80px]">{p.key}</span>
                        <span className="text-slate-700 flex-1 truncate">{p.title}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </SidebarField>

          {/* Priority */}
          <SidebarField label="Priority">
            <DropdownRow icon="=" value="Medium" />
          </SidebarField>

          {/* Sprint */}
          <SidebarField label="Sprint">
            <div className="bg-slate-50 px-3 py-2 rounded-lg flex justify-between items-center text-xs font-bold hover:bg-slate-100 cursor-pointer transition-all border border-slate-100">
              <span className="text-slate-700">March 2026 <span className="text-emerald-500 font-black text-[10px] ml-1 uppercase">Active</span></span>
              <span className="text-slate-400">▾</span>
            </div>
          </SidebarField>

          {/* Tag */}
          <SidebarField label="Tag">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="bg-indigo-50 border border-indigo-100 rounded-lg text-[11px] font-black text-indigo-600 px-2.5 py-1 flex items-center gap-1.5 shadow-sm">
                BA <span className="cursor-pointer text-indigo-400 hover:text-indigo-800 transition-colors">✕</span>
              </span>
              <div className="ml-auto flex gap-2 text-slate-400 text-xs font-bold">
                <button className="hover:text-red-500 transition-all">✕</button>
                <span className="cursor-pointer hover:text-indigo-600">▾</span>
              </div>
            </div>
          </SidebarField>

          {/* Due Date */}
          <SidebarField label="Due Date">
            <div className="flex justify-between items-center text-xs font-bold text-slate-400 hover:text-slate-700 cursor-pointer transition-all px-1">
              <span>Select Date</span><span className="text-sm">📅</span>
            </div>
          </SidebarField>

          {/* Estimated Time */}
          <SidebarField label="Estimated Time">
            <div className="flex justify-between items-center text-xs font-bold text-slate-400 hover:text-slate-700 cursor-pointer transition-all px-1">
              <span>Add Estimation</span><span className="text-sm">⏱</span>
            </div>
          </SidebarField>

          {/* Time Tracking */}
          <div className="px-5 py-5 border-b border-slate-50">
            <div className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-4">Time Tracking</div>
            <div className="flex justify-between items-end mb-2">
              <div className="text-[11px] font-bold text-slate-500">Logged Time</div>
              <div className="text-[11px] font-black text-indigo-600">0d 0h 0m</div>
            </div>
            <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner">
              <div className="w-[10%] h-full bg-indigo-500 rounded-full shadow-sm" />
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 bg-slate-50/50 flex justify-between gap-6 border-t border-slate-100">
            <div>
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Created by</div>
              <div className="text-xs font-extrabold text-slate-800">Bhumi Goklani</div>
              <div className="text-[10px] text-slate-400 mt-0.5">24 Feb 2026</div>
            </div>
            <div className="text-right">
              <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">Modified by</div>
              <div className="text-xs font-extrabold text-slate-800">Yashang Vyas</div>
              <div className="text-[10px] text-slate-400 mt-0.5">10 Mar 2026</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

/* ─── Small helpers ─────────────────────────────── */
function SidebarField({ label, children }) {
  return (
    <div className="px-5 py-4 border-b border-slate-50 flex flex-col gap-2">
      <span className="text-[11px] font-black text-slate-400 uppercase tracking-widest">{label}</span>
      <div className="flex-1">{children}</div>
    </div>
  )
}

function AssigneeRow({ initials, color, name, showX }) {
  return (
    <div className="flex items-center gap-3 group">
      <div className="w-8 h-8 rounded-xl flex items-center justify-center text-[10px] font-black text-white shadow-sm ring-2 ring-white" style={{ background: color }}>
        {initials}
      </div>
      <span className="text-xs font-bold text-slate-700 flex-1 group-hover:text-indigo-600 transition-colors">{name}</span>
      {showX && (
        <button className="opacity-0 group-hover:opacity-100 transition-opacity w-5 h-5 flex items-center justify-center rounded-md hover:bg-slate-100 text-slate-400">
          ✕
        </button>
      )}
    </div>
  )
}

function DropdownRow({ icon, value }) {
  return (
    <div className="flex items-center gap-2 text-xs font-bold text-slate-700 cursor-pointer hover:text-indigo-600 transition-all p-1">
      <span className="text-sm">{icon}</span>
      <span className="flex-1">{value}</span>
      <span className="text-slate-400">▾</span>
    </div>
  )
}
