import { useState } from 'react';
import { CheckSquare, Building2, Tag, ChevronDown } from 'lucide-react';
import { useOrders } from '../hooks/useOrders';
import { useProducts } from '../hooks/useProducts';
import { formatCurrency } from '../utils/formatters';

export function Dashboard() {
  const { orders } = useOrders();
  const { products } = useProducts();

  const [countryFilter, setCountryFilter] = useState('India');
  const [timeFilter, setTimeFilter] = useState('This month');
  const [hoveredBarIndex, setHoveredBarIndex] = useState<number | null>(10);

  // Calculations
  const totalSales = orders.reduce((sum, o) => sum + (o.totalAmount || 0), 0);
  const totalUnitsSold = orders.reduce(
    (sum, o) => sum + (o.cartItems || []).reduce((iSum: number, item: any) => iSum + (item.quantity || 0), 0),
    0
  );
  const avgOrderValue = orders.length > 0 ? Math.round(totalSales / orders.length) : 0;

  const totalStock = products.reduce((sum, p) => sum + p.stock, 0);
  const catalogTotalValue = products.reduce((sum, p) => sum + p.price * p.stock, 0);
  const avgProductPrice = products.length > 0 ? Math.round(products.reduce((sum, p) => sum + p.price, 0) / products.length) : 0;

  // Order & Catalog Status Breakdown
  const pendingCount = orders.filter((o) => o.orderStatus === 'PENDING').length;
  const processingCount = orders.filter((o) => o.orderStatus === 'PROCESSING').length;
  const deliveredCount = orders.filter((o) => o.orderStatus === 'DELIVERED').length;
  const inStockCount = products.filter((p) => p.stock > 0).length;

  // Group actual orders by day
  const ordersByDay = orders.reduce((acc: Record<string, { leads: number; revenue: number }>, order) => {
    if (!order.createdAt) return acc;
    const dateObj = new Date(order.createdAt);
    const dayStr = dateObj.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }); // e.g. "10 Aug"
    if (!acc[dayStr]) {
      acc[dayStr] = { leads: 0, revenue: 0 };
    }
    acc[dayStr].leads += 1;
    acc[dayStr].revenue += order.totalAmount || 0;
    return acc;
  }, {});

  // Generate the last 15 days dynamically to display in the chart
  const last15Days = Array.from({ length: 15 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (14 - i));
    return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
  });

  const chartDays = last15Days.map(day => ({
    day,
    leads: ordersByDay[day]?.leads || 0,
    revenue: ordersByDay[day]?.revenue || 0
  }));

  const maxLeadsValue = Math.max(...chartDays.map(item => item.leads), 0);
  const maxLeads = maxLeadsValue > 0 ? maxLeadsValue : 10;

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Top Main Heading */}
      <div className="border-b border-slate-300 pb-4">
        <h1 className="text-3xl font-black tracking-tight text-slate-900">Dashboard</h1>
      </div>

      {/* Grid: 3 Top Cards + 1 Tall Summary Right Card */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left 3 Top Metric Cards Container */}
        <div className="lg:col-span-3 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Top Card 1: TOTAL SALES */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between h-44">
              <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-sm">
                <CheckSquare className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">TOTAL SALES</span>
                <h3 className="text-2xl font-black text-slate-900 mt-1">
                  {formatCurrency(totalSales)}
                </h3>
              </div>
            </div>

            {/* Top Card 2: UNITS SOLD */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between h-44">
              <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-sm">
                <Building2 className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">UNITS SOLD</span>
                <h3 className="text-2xl font-black text-slate-900 mt-1">{totalUnitsSold}</h3>
              </div>
            </div>

            {/* Top Card 3: AVG ORDER VALUE */}
            <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between h-44">
              <div className="w-10 h-10 rounded-xl bg-slate-900 text-white flex items-center justify-center shadow-sm">
                <Tag className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">AVG ORDER VALUE</span>
                <h3 className="text-2xl font-black text-slate-900 mt-1">
                  {formatCurrency(avgOrderValue)}
                </h3>
              </div>
            </div>
          </div>

          {/* Middle Section: "Units per Status" / Catalog Breakdown */}
          <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6">
            <h3 className="text-base font-bold text-slate-900">Units per Status</h3>
            <div className="border-b border-slate-200" />

            {/* 4 Status Columns */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {/* Col 1 */}
              <div className="border-r border-slate-200 pr-4">
                <div className="w-6 h-1.5 bg-[#FACC15] mb-2" />
                <h4 className="text-xl font-black text-slate-900">{inStockCount}</h4>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-1">
                  AVAILABLE PRODUCTS
                </p>
              </div>

              {/* Col 2 */}
              <div className="border-r border-slate-200 pr-4">
                <div className="w-6 h-1.5 bg-[#64748B] mb-2" />
                <h4 className="text-xl font-black text-slate-900">{pendingCount}</h4>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-1">
                  PENDING ORDERS
                </p>
              </div>

              {/* Col 3 */}
              <div className="border-r border-slate-200 pr-4">
                <div className="w-6 h-1.5 bg-[#CBD5E1] mb-2" />
                <h4 className="text-xl font-black text-slate-900">{processingCount}</h4>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-1">
                  PROCESSING ORDERS
                </p>
              </div>

              {/* Col 4 */}
              <div className="pr-4">
                <div className="w-6 h-1.5 bg-[#0F172A] mb-2" />
                <h4 className="text-xl font-black text-slate-900">{deliveredCount}</h4>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mt-1">
                  SOLD / DELIVERED
                </p>
              </div>
            </div>

            {/* Stacked Segmented Horizontal Bar */}
            <div className="w-full h-8 rounded-lg overflow-hidden flex shadow-inner bg-slate-200">
              <div className="h-full bg-[#FACC15]" style={{ width: '25%' }} />
              <div className="h-full bg-[#64748B]" style={{ width: '20%' }} />
              <div className="h-full bg-[#CBD5E1]" style={{ width: '15%' }} />
              <div className="h-full bg-[#0F172A] flex-1" />
            </div>
          </div>
        </div>

        {/* Tall Summary Card on Far Right */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">REMAINING STOCK</span>
              <h3 className="text-2xl font-black text-slate-900 mt-1">{totalStock}</h3>
            </div>
            <div className="border-b border-slate-200" />

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">TOTAL CATALOG VALUE</span>
              <h3 className="text-2xl font-black text-slate-900 mt-1">
                {formatCurrency(catalogTotalValue)}
              </h3>
            </div>
            <div className="border-b border-slate-200" />

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">AVG ITEM PRICE</span>
              <h3 className="text-2xl font-black text-slate-900 mt-1">
                {formatCurrency(avgProductPrice)}
              </h3>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-slate-200">
            <div className="flex items-center justify-between text-xs font-bold text-slate-700">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 bg-[#0F172A] rounded-sm inline-block" />
                Sold Units
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 bg-[#FACC15] rounded-sm inline-block" />
                Remaining
              </span>
            </div>

            <div className="space-y-2">
              <div className="w-full bg-[#0F172A] h-5 rounded-md" />
              <div className="w-full bg-[#FACC15] h-7 rounded-md" />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section: Total Leads / Sales by Day Bar Chart */}
      <div className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h3 className="text-lg font-bold text-slate-900">Total Sales & Leads by Day</h3>

          {/* Right Filter Pills */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <select
                value={countryFilter}
                onChange={(e) => setCountryFilter(e.target.value)}
                className="appearance-none px-3 py-1.5 pr-8 text-xs font-bold bg-slate-50 border border-slate-300 rounded-lg cursor-pointer text-slate-800"
              >
                <option value="India">India</option>
                <option value="Global">Global</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>

            <div className="relative">
              <select
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
                className="appearance-none px-3 py-1.5 pr-8 text-xs font-bold bg-slate-50 border border-slate-300 rounded-lg cursor-pointer text-slate-800"
              >
                <option value="This month">This month</option>
                <option value="Last month">Last month</option>
                <option value="This year">This year</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            </div>
          </div>
        </div>

        <div className="border-b border-slate-200" />

        {/* Vertical Pill Bar Chart */}
        <div className="relative pt-8 pb-4">
          {/* Y Axis Labels and Horizontal Grid Lines */}
          <div className="absolute inset-x-0 top-8 bottom-10 flex flex-col justify-between pointer-events-none text-[10px] text-slate-400 font-bold">
            <div className="border-b border-slate-200 w-full flex items-center justify-between">
              <span>{Math.round(maxLeads)}</span>
            </div>
            <div className="border-b border-slate-200 w-full flex items-center justify-between">
              <span>{Math.round(maxLeads * 0.8)}</span>
            </div>
            <div className="border-b border-slate-200 w-full flex items-center justify-between">
              <span>{Math.round(maxLeads * 0.6)}</span>
            </div>
            <div className="border-b border-slate-200 w-full flex items-center justify-between">
              <span>{Math.round(maxLeads * 0.4)}</span>
            </div>
            <div className="border-b border-slate-200 w-full flex items-center justify-between">
              <span>{Math.round(maxLeads * 0.2)}</span>
            </div>
            <div className="border-b border-slate-300 w-full flex items-center justify-between">
              <span>0</span>
            </div>
          </div>

          {/* Bar Columns Container */}
          <div className="relative h-60 flex items-end justify-between px-6 z-10 pt-4">
            {chartDays.map((item, idx) => (
              <div
                key={idx}
                onMouseEnter={() => setHoveredBarIndex(idx)}
                className="relative group flex flex-col items-center h-full justify-end cursor-pointer"
              >
                {/* Floating Tooltip Bubble */}
                {hoveredBarIndex === idx && (
                  <div className="absolute -top-10 px-3 py-1.5 rounded-lg bg-slate-900 shadow-xl border border-slate-800 text-xs font-bold text-white whitespace-nowrap z-20 animate-in fade-in">
                    {item.leads} leads / {formatCurrency(item.revenue)}
                  </div>
                )}

                {/* Vertical Dark Bar */}
                <div
                  className="w-3.5 bg-slate-900 rounded-full transition-all duration-200 group-hover:bg-amber-500 group-hover:scale-110"
                  style={{ height: `${(item.leads / maxLeads) * 100}%` }}
                />
              </div>
            ))}
          </div>

          {/* X Axis Dates */}
          <div className="flex justify-between px-4 mt-3 text-[10px] font-bold text-slate-400 uppercase">
            {chartDays.map((item, idx) => (
              <span key={idx}>{idx % 2 === 0 ? item.day : ''}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
