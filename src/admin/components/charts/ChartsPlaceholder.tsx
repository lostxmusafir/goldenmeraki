export function ChartsPlaceholder() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Revenue & Sales Trend */}
      <div className="lg:col-span-2 p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h4 className="text-base font-bold text-slate-900 dark:text-slate-100">Revenue Overview</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">Monthly sales performance & order trends</p>
          </div>
          <span className="px-3 py-1 text-xs font-semibold bg-amber-50 text-amber-700 dark:bg-amber-950/40 dark:text-amber-300 rounded-full border border-amber-200 dark:border-amber-800">
            2026 YTD
          </span>
        </div>

        {/* SVG Area Chart */}
        <div className="h-64 w-full flex flex-col justify-end">
          <svg className="w-full h-48 overflow-visible" viewBox="0 0 500 150">
            <defs>
              <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.0" />
              </linearGradient>
            </defs>
            {/* Grid lines */}
            <line x1="0" y1="30" x2="500" y2="30" stroke="currentColor" className="text-slate-100 dark:text-slate-800" strokeDasharray="4" />
            <line x1="0" y1="75" x2="500" y2="75" stroke="currentColor" className="text-slate-100 dark:text-slate-800" strokeDasharray="4" />
            <line x1="0" y1="120" x2="500" y2="120" stroke="currentColor" className="text-slate-100 dark:text-slate-800" strokeDasharray="4" />

            {/* Filled Area */}
            <path
              d="M0,120 Q60,90 120,60 T240,40 T360,80 T500,20 L500,150 L0,150 Z"
              fill="url(#chartGradient)"
            />

            {/* Line path */}
            <path
              d="M0,120 Q60,90 120,60 T240,40 T360,80 T500,20"
              fill="none"
              stroke="#f59e0b"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
          </svg>
          <div className="flex justify-between text-xs text-slate-400 dark:text-slate-500 mt-4 px-2">
            <span>Jan</span>
            <span>Feb</span>
            <span>Mar</span>
            <span>Apr</span>
            <span>May</span>
            <span>Jun</span>
            <span>Jul</span>
          </div>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm">
        <h4 className="text-base font-bold text-slate-900 dark:text-slate-100 mb-1">Sales by Category</h4>
        <p className="text-xs text-slate-500 dark:text-slate-400 mb-6">Top performing product groups</p>

        <div className="space-y-4">
          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              <span>Bracelets</span>
              <span>42%</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2">
              <div className="bg-amber-500 h-2 rounded-full" style={{ width: '42%' }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              <span>Necklaces & Pendants</span>
              <span>28%</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2">
              <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '28%' }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              <span>Raw Stones & Crystals</span>
              <span>18%</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2">
              <div className="bg-sky-500 h-2 rounded-full" style={{ width: '18%' }} />
            </div>
          </div>

          <div>
            <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
              <span>Rings & Earrings</span>
              <span>12%</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-full h-2">
              <div className="bg-purple-500 h-2 rounded-full" style={{ width: '12%' }} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
