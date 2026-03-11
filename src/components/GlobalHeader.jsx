import Logo from './Logo'

export default function GlobalHeader() {
  return (
    <header className="h-12 bg-white border-b border-slate-200 flex items-center px-4 gap-6 z-[200]">
      {/* Logo & Brand */}
      <div className="flex items-center gap-2 cursor-pointer">
        <Logo className="w-[110px]" />
      </div>

      {/* STAGING Badge */}
      <div className="px-3 py-1 bg-red-600 text-white text-[10px] font-black tracking-widest rounded-md shadow-sm">
        STAGING
      </div>

      {/* Global Search */}
      <div className="flex-1 flex justify-center px-4">
        <div className="max-w-md w-full relative group">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors">
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </div>
          <input 
            placeholder="Search people by name, email, code..."
            className="w-full bg-slate-50 border border-slate-200 rounded-lg py-1.5 pl-9 pr-4 text-[11px] font-medium text-slate-700 outline-none focus:bg-white focus:border-indigo-400 focus:ring-4 focus:ring-indigo-50 transition-all placeholder:text-slate-400"
          />
        </div>
      </div>

      {/* Global Actions */}
      <div className="flex items-center gap-1.5">
        {/* Now Button */}
        <button className="flex items-center gap-1.5 px-3 py-1.5 h-8 bg-white border border-slate-200 rounded-lg text-[11px] font-black text-slate-700 hover:bg-slate-50 transition-all">
          Now
          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="6 9 12 15 18 9"/></svg>
        </button>

        <div className="h-6 w-[1px] bg-slate-200 mx-1" />

        {/* Action Icons */}
        <div className="flex items-center">
          <button className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
          </button>
          <button className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all relative">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
            <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-rose-500 border border-white rounded-full" />
          </button>
        </div>

        {/* Profile Avatar */}
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-indigo-700 flex items-center justify-center text-white text-[10px] font-black shadow-sm cursor-pointer ml-1">
          YV
        </div>
      </div>
    </header>
  )
}
