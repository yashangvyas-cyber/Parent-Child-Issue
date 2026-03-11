import { useState, useRef, useEffect } from 'react'
import { IssueTypeIcon } from './Icons'

/* ─── Mock Data ─────────────────────────────────── */
const EXISTING_ISSUES = [
  { key: 'COLLAB-2050', title: 'Leave settings form UI optimization', type: 'task' },
  { key: 'COLLAB-2047', title: 'Attendance > Store the metrics in table', type: 'task' },
  { key: 'COLLAB-2046', title: 'Store name of client in client access table', type: 'task' },
  { key: 'COLLAB-2044', title: 'ANALYSIS > Candidate portal for jobs', type: 'task' },
  { key: 'COLLAB-1589', title: 'Export timesheet report', type: 'story' },
]

const PARENT_OPTIONS = [
  { key: 'COLLAB-1234', title: 'Mobile App Overhaul', type: 'epic' },
  { key: 'COLLAB-1100', title: 'Platform Reliability Initiative Q1', type: 'epic' },
]

const STATUSES = [
  { label: 'To Do', color: 'bg-slate-200 text-slate-700' },
  { label: 'In Progress', color: 'bg-amber-500 text-white' },
  { label: 'In Review', color: 'bg-indigo-600 text-white' },
  { label: 'Closed', color: 'bg-emerald-600 text-white' },
]

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
    <div ref={ref} className="absolute top-full mt-1.5 inset-x-0 bg-white border-[1.5px] border-indigo-500 rounded-xl shadow-premium z-50 flex flex-col overflow-hidden">
      <div className="overflow-y-auto max-h-[280px]">
        {filtered.length === 0 ? (
          <div className="p-4 text-center text-slate-400 text-xs">No issues found</div>
        ) : filtered.map(issue => (
          <div
            key={issue.key}
            onMouseDown={() => onChoose(issue)}
            className="flex items-center gap-3 px-4 py-2.5 cursor-pointer text-xs hover:bg-slate-50 border-b border-slate-50 last:border-b-0"
          >
            <IssueTypeIcon type={issue.type} size="w-3.5 h-3.5" />
            <span className="text-indigo-600 font-bold min-w-[90px]">{issue.key}</span>
            <span className="text-slate-700 flex-1 truncate">{issue.title}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

/* ─── Main Component ─────────────────────────────── */
export default function IssueDetailView({ issue, onBack, project }) {
  const [parent, setParent] = useState({ key: 'COLLAB-1234', title: 'Mobile App Overhaul', type: 'epic' })
  const [showParentDropdown, setShowParentDropdown] = useState(false)
  const [parentSearch, setParentSearch] = useState('')
  const parentRef = useRef(null)

  const [title, setTitle] = useState(issue?.title || 'Issue parent child re-assignment in bulk')
  const [status, setStatus] = useState('In Progress')
  
  // Children
  const [children, setChildren] = useState([
    { key: 'COLLAB-2003', title: 'Fix issue key link in Safari', statusLabel: 'To Do', statusClass: 'bg-slate-100 text-slate-500' },
    { key: 'COLLAB-2006', title: 'Sprint velocity tracker widget', statusLabel: 'Ready QA', statusClass: 'bg-emerald-50 text-emerald-600' },
  ])
  const [showChildAddRow, setShowChildAddRow] = useState(false)
  const [childInput, setChildInput] = useState('')
  const [isSearching, setIsSearching] = useState(false)

  // Tabs
  const [actTab, setActTab] = useState('Comments')

  const handleRemoveParent = () => {
    setParent(null)
    // The requirement: "result should be page refreshes and then from the breadcrumb and now the only task will be shown."
    // In our SPA context, we update the state which re-renders the hierarchy header.
  }

  return (
    <div className="flex flex-col h-full bg-white font-['Outfit'] select-none">
      
      {/* ─── INTERNAL SUB-HEADER (Breadcrumbs & Actions) ─── */}
      <div className="flex items-center justify-between px-6 py-3 border-b border-slate-100">
        <div className="flex items-center gap-2 text-[13px] font-bold">
          {parent && (
            <>
              <div className="flex items-center gap-2 text-indigo-600 hover:text-indigo-800 cursor-pointer group pr-1">
                <IssueTypeIcon type={parent.type} size="w-4 h-4" />
                <span>{parent.key}</span>
              </div>
              <span className="text-slate-300 font-light">/</span>
            </>
          )}
          <div className="flex items-center gap-2 bg-indigo-50 border border-indigo-100/50 px-2.5 py-1.5 rounded-lg shadow-sm">
            <IssueTypeIcon type="task" size="w-4 h-4" />
            <span className="text-indigo-700">{issue?.key || 'COLLAB-2002'}</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-slate-50">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
          </button>
          <div className="flex items-center gap-1.5 px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-bold text-slate-500 hover:bg-slate-50 cursor-pointer shadow-sm">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            3
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-amber-500 text-white rounded-lg text-xs font-black shadow-lg shadow-amber-200 cursor-pointer hover:bg-amber-600 active:scale-95 transition-all">
            {status} <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="6 9 12 15 18 9"/></svg>
          </div>
          <button className="text-lg text-slate-400 font-black hover:text-slate-600 px-1">⋮</button>
          <button onClick={onBack} className="text-slate-400 hover:text-rose-500 ml-2 font-black">✕</button>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* LEFT PANEL */}
        <div className="flex-1 overflow-y-auto custom-scrollbar bg-slate-50/20 px-12 py-10">
          <div className="max-w-[800px]">
            <h1 className="text-2xl font-black text-slate-900 mb-8 leading-tight tracking-tight">
              <span className="text-slate-400 font-bold uppercase italic mr-2 border-r border-slate-200 pr-3">ANALYSIS</span>
              {title}
            </h1>

            {/* Main Action Buttons */}
            <div className="flex gap-2.5 mb-10">
              {[
                { label: 'Attach', icon: '📎' },
                { label: 'Add Child', icon: '👶', active: showChildAddRow, onClick: () => setShowChildAddRow(!showChildAddRow) },
                { label: 'Link Issue', icon: '🔗' },
                { label: 'Add Checklist', icon: '☑' }
              ].map(btn => (
                <button 
                  key={btn.label}
                  onClick={btn.onClick}
                  className={`flex items-center gap-2 px-4 py-2 border rounded-xl text-[13px] font-black transition-all active:scale-95
                    ${btn.active 
                      ? 'bg-indigo-600 border-indigo-600 text-white shadow-lg' 
                      : 'bg-white border-slate-200 text-slate-700 hover:border-indigo-400 hover:text-indigo-600 shadow-sm'}`}
                >
                  <span className="text-base">{btn.icon}</span> {btn.label}
                </button>
              ))}
            </div>

            {/* Description */}
            <div className="mb-12 group bg-white p-6 rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/40">
              <h3 className="text-[14px] font-black text-slate-800 mb-4 flex items-center justify-between">
                Description
                <button className="opacity-0 group-hover:opacity-100 text-indigo-500 text-xs">Edit</button>
              </h3>
              <div className="text-[14px] text-slate-600 leading-relaxed font-medium">
                <p className="mb-4">Configure and implement a robust CI/CD pipeline to automate the deployment of the collabCRM-prototype to the staging environment.</p>
                <p className="mb-4 text-indigo-600/80 font-bold">Ensure all automated tests pass before any code is merged into the staging branch.</p>
                <p className="bg-indigo-50/50 p-4 rounded-xl border border-indigo-100 italic">This includes setting up GitHub Actions, configuring environment variables, and establishing a secure connection to the staging server for seamless delivery.</p>
              </div>
            </div>

            {/* Child Issues */}
            <div className="mb-12">
              <h3 className="text-[14px] font-black text-slate-800 mb-6 uppercase tracking-wider">Child Issues</h3>
              <div className="space-y-3">
                {children.map(child => (
                  <div key={child.key} className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm hover:border-indigo-300 transition-all group">
                    <IssueTypeIcon type="subtask" size="w-4 h-4" />
                    <span className="text-indigo-600 font-black text-[13px] min-w-[90px]">{child.key}</span>
                    <span className="flex-1 text-[13px] text-slate-700 font-bold">{child.title}</span>
                    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-tight ${child.statusClass}`}>{child.statusLabel} <svg className="inline w-3 h-3 ml-1 opacity-50" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="6 9 12 15 18 9"/></svg></span>
                    <button className="opacity-0 group-hover:opacity-100 w-8 h-8 flex items-center justify-center rounded-lg hover:bg-rose-50 hover:text-rose-500 text-slate-300 transition-all font-black">✕</button>
                  </div>
                ))}
                
                {showChildAddRow && (
                   <div className="bg-white rounded-2xl border-2 border-indigo-500 shadow-premium overflow-hidden animate-in zoom-in-95 duration-200">
                      <div className="flex h-12">
                        <div className="px-4 bg-slate-50 border-r border-slate-200 flex items-center gap-2">
                           <span className="text-[11px] font-black text-slate-500 uppercase tracking-tight">Sub-Task</span>
                           <svg className="w-3 h-3 text-slate-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="6 9 12 15 18 9"/></svg>
                        </div>
                        <input
                          autoFocus
                          value={childInput}
                          onChange={e => setChildInput(e.target.value)}
                          placeholder="Write Here..."
                          className="flex-1 px-4 text-[13px] font-bold outline-none"
                        />
                      </div>
                      <div className="bg-slate-50 px-4 py-2 flex justify-between items-center border-t border-slate-200">
                         <button className="text-indigo-600 text-[11px] font-black underline decoration-2 underline-offset-4 decoration-indigo-200">Choose Existing</button>
                         <div className="flex gap-2">
                           <button onClick={() => setShowChildAddRow(false)} className="px-4 py-1.5 bg-white border border-slate-200 rounded-lg text-[11px] font-black text-slate-600">Cancel</button>
                           <button className="px-5 py-1.5 bg-indigo-600 rounded-lg text-[11px] font-black text-white shadow-lg shadow-indigo-200">Add</button>
                         </div>
                      </div>
                   </div>
                )}
              </div>
            </div>

            {/* Activity */}
            <div className="mt-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex gap-8 border-b-2 border-slate-100 flex-1">
                   {['Comments', 'History', 'Checklist History', 'Work Logs'].map(t => (
                     <button key={t} onClick={() => setActTab(t)} className={`pb-3 text-[13px] font-black tracking-tight border-b-2 transition-all ${actTab === t ? 'border-indigo-600 text-indigo-600' : 'border-transparent text-slate-400 hover:text-slate-600'}`}>{t}</button>
                   ))}
                </div>
              </div>
              <div className="relative">
                 <div className="flex gap-4">
                   <div className="w-10 h-10 rounded-2xl bg-indigo-100 flex items-center justify-center text-indigo-700 font-black text-xs border-2 border-white shadow-sm ring-4 ring-indigo-50/30">YV</div>
                   <div className="flex-1 relative">
                      <textarea placeholder="Write here..." className="w-full h-24 bg-white border-2 border-slate-100 p-4 rounded-2xl text-[13px] font-bold outline-none focus:border-indigo-500 focus:shadow-premium transition-all resize-none"></textarea>
                      <div className="absolute right-4 bottom-4 flex items-center gap-3">
                        <span className="text-[10px] font-bold text-slate-400">Press M to comment</span>
                        <button className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-lg shadow-indigo-200"><svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 11"/></svg></button>
                      </div>
                   </div>
                 </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR - MATCHING OFFICIAL REFERENCE */}
        <div className="w-[320px] bg-white border-l border-slate-100 overflow-y-auto custom-scrollbar flex-shrink-0">
          
          {/* Assignee */}
          <SidebarField label="Assignee">
            <div className="space-y-3">
              <div className="flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-orange-400 text-white flex items-center justify-center text-[10px] font-black">KP</div>
                  <span className="text-[12px] font-bold text-slate-700">Kamlesh Puraswani</span>
                </div>
                <button className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-rose-500 transition-all font-black">✕</button>
              </div>
              <div className="flex items-center justify-between group">
                <div className="flex items-center gap-3">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500 text-white flex items-center justify-center text-[10px] font-black">YV</div>
                  <span className="text-[12px] font-bold text-slate-700">Yashang Vyas</span>
                </div>
                <button className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-rose-500 transition-all font-black">✕</button>
              </div>
              <button className="mt-2 w-full flex items-center justify-center h-8 rounded-lg bg-indigo-50 text-indigo-700 text-[11px] font-black hover:bg-indigo-100 transition-all border border-indigo-100/50">+ Add</button>
            </div>
          </SidebarField>

          {/* Reporter */}
          <SidebarField label="Reporter">
            <div className="flex items-center justify-between group">
              <div className="flex items-center gap-3">
                <div className="w-7 h-7 rounded-lg bg-slate-800 text-white flex items-center justify-center text-[10px] font-black">BG</div>
                <span className="text-[12px] font-bold text-slate-700">Bhumi Goklani</span>
              </div>
              <button className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-rose-500 transition-all font-black">✕</button>
            </div>
          </SidebarField>

          {/* Issue Type */}
          <SidebarField label="Issue Type">
             <div className="flex items-center justify-between px-3 h-9 bg-slate-50/50 rounded-xl border border-slate-100 cursor-pointer group">
               <div className="flex items-center gap-2">
                 <IssueTypeIcon type="task" size="w-3.5 h-3.5" />
                 <span className="text-[12px] font-bold text-slate-700">Task</span>
               </div>
               <svg className="w-3 h-3 text-slate-300 group-hover:text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="6 9 12 15 18 9"/></svg>
             </div>
          </SidebarField>

          {/* Priority */}
          <SidebarField label="Priority">
             <div className="flex items-center justify-between px-3 h-9 bg-slate-50/50 rounded-xl border border-slate-100 cursor-pointer group">
               <div className="flex items-center gap-2">
                 <span className="w-3 h-1 bg-amber-400 rounded-full"></span>
                 <span className="text-[12px] font-bold text-slate-700">Medium</span>
               </div>
               <svg className="w-3 h-3 text-slate-300 group-hover:text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="6 9 12 15 18 9"/></svg>
             </div>
          </SidebarField>

          {/* Sprint */}
          <SidebarField label="Sprint">
             <div className="flex items-center justify-between px-3 h-9 bg-slate-50 rounded-xl border border-slate-100 cursor-pointer border-l-4 border-l-emerald-500">
               <div className="flex items-center gap-2">
                 <span className="text-[12px] font-black text-slate-800">March 2026</span>
                 <span className="text-[9px] font-black text-emerald-600 uppercase bg-emerald-100/50 px-1.5 py-0.5 rounded">Active</span>
               </div>
               <svg className="w-3 h-3 text-slate-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="6 9 12 15 18 9"/></svg>
             </div>
          </SidebarField>

          {/* Parent */}
          <SidebarField label="Parent">
            <div ref={parentRef} className="relative">
              {parent ? (
                <div onClick={() => setShowParentDropdown(!showParentDropdown)} className="flex items-center gap-2 px-3 py-1.5 bg-indigo-50 border border-indigo-200 rounded-xl text-[11px] font-black text-indigo-700 cursor-pointer shadow-sm group">
                  <IssueTypeIcon type={parent.type} size="w-3.5 h-3.5" />
                  <span className="truncate flex-1">{parent.key} <span className="opacity-50 font-bold ml-1">{parent.title}</span></span>
                  <button onClick={(e) => { e.stopPropagation(); handleRemoveParent(); }} className="hover:text-rose-500 transition-all">✕</button>
                </div>
              ) : (
                <button onClick={() => setShowParentDropdown(!showParentDropdown)} className="w-full flex items-center justify-center h-9 bg-white border-2 border-dashed border-slate-200 rounded-xl text-[11px] font-black text-slate-400 hover:border-indigo-400 hover:text-indigo-600 transition-all">+ Set Parent</button>
              )}
              {showParentDropdown && (
                <div className="absolute top-full mt-2 inset-x-0 z-[100]">
                  <ChooseExistingDropdown 
                    search={parentSearch} 
                    onChoose={(p) => { setParent(p); setShowParentDropdown(false); }} 
                    onClose={() => setShowParentDropdown(false)} 
                  />
                </div>
              )}
            </div>
          </SidebarField>

          {/* Tag */}
          <SidebarField label="Tag">
             <div className="flex items-center justify-between px-3 h-9 bg-slate-50/50 rounded-xl border border-slate-100 group">
               <div className="flex items-center gap-1.5">
                 <span className="px-2 py-0.5 bg-indigo-50 border border-indigo-100 rounded text-[10px] font-black text-indigo-700">BA <button className="ml-1 hover:text-rose-500">×</button></span>
               </div>
               <div className="flex items-center gap-2">
                 <button className="text-slate-300 hover:text-rose-500 text-xs font-black">✕</button>
                 <svg className="w-3 h-3 text-slate-300 group-hover:text-indigo-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="6 9 12 15 18 9"/></svg>
               </div>
             </div>
          </SidebarField>

          {/* Due Date & Estimation */}
          <SidebarField label="Due Date">
            <div className="flex items-center justify-between text-[11px] font-black text-slate-400 cursor-pointer hover:text-slate-700">
              Select Date <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            </div>
          </SidebarField>

          <SidebarField label="Estimated Time">
            <div className="flex items-center justify-between text-[11px] font-black text-slate-400 cursor-pointer hover:text-slate-700">
              Add Estimation <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
            </div>
          </SidebarField>

          {/* Time Tracking */}
          <div className="px-6 py-6 border-b border-slate-50">
             <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Time Tracking</h4>
             <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden shadow-inner mb-3">
               <div className="w-[85%] h-full bg-emerald-500 rounded-full shadow-lg shadow-emerald-100"></div>
             </div>
             <div className="flex justify-between items-center text-[10px] font-black">
                <span className="text-slate-400">Logged: <span className="text-indigo-600">6h</span></span>
                <span className="text-slate-400">Total: <span className="text-slate-700">8h</span></span>
             </div>
          </div>

        </div>
      </div>
    </div>
  )
}

/* ─── Helpers ─────────────────── */
function SidebarField({ label, children }) {
  return (
    <div className="px-6 py-4 border-b border-slate-50">
      <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-3">{label}</h4>
      {children}
    </div>
  )
}
