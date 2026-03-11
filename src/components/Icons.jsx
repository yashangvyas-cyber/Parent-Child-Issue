import React from 'react'

export const IssueTypeIcon = ({ type, size = "w-4 h-4" }) => {
  const iconMap = {
    epic: (
      <div className={`${size} rounded bg-indigo-400 flex items-center justify-center p-0.5 shadow-sm`}>
        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" fill="white" stroke="none" />
        </svg>
      </div>
    ),
    story: (
      <div className={`${size} rounded bg-emerald-500 flex items-center justify-center p-0.5 shadow-sm`}>
        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke="white" strokeWidth="3" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" stroke="white" strokeWidth="3" />
        </svg>
      </div>
    ),
    task: (
      <div className={`${size} rounded bg-blue-600 flex items-center justify-center p-0.5 shadow-sm`}>
        <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" className="w-full h-full">
          <polyline points="20 6 9 17 4 12" />
        </svg>
      </div>
    ),
    bug: (
      <div className={`${size} rounded bg-rose-500 flex items-center justify-center p-1 shadow-sm`}>
        <div className="w-full h-full rounded-full bg-white" />
      </div>
    ),
  }

  // Fallback to task if type not found
  return iconMap[type?.toLowerCase()] || iconMap['task']
}
