
import React from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, BarChart, Bar 
} from 'recharts';

const data = [
  { name: 'Mon', views: 4000, subs: 240, revenue: 2400 },
  { name: 'Tue', views: 3000, subs: 139, revenue: 2210 },
  { name: 'Wed', views: 2000, subs: 980, revenue: 2290 },
  { name: 'Thu', views: 2780, subs: 390, revenue: 2000 },
  { name: 'Fri', views: 1890, subs: 480, revenue: 2181 },
  { name: 'Sat', views: 2390, subs: 380, revenue: 2500 },
  { name: 'Sun', views: 3490, subs: 430, revenue: 2100 },
];

const StatCard: React.FC<{ label: string; value: string; trend: string; color: string }> = ({ label, value, trend, color }) => (
  <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700 shadow-lg">
    <p className="text-slate-400 text-sm font-medium mb-1">{label}</p>
    <h3 className="text-3xl font-bold">{value}</h3>
    <p className={`text-sm mt-2 font-semibold ${trend.startsWith('+') ? 'text-emerald-400' : 'text-rose-400'}`}>
      {trend} <span className="text-slate-500 font-normal">vs last week</span>
    </p>
  </div>
);

export const Dashboard: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard label="Total Views" value="1.2M" trend="+12.5%" color="blue" />
        <StatCard label="Subscribers" value="45.8K" trend="+8.2%" color="emerald" />
        <StatCard label="Est. Revenue" value="$4,280" trend="-2.4%" color="amber" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
          <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
            Views Over Time
          </h4>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#f8fafc' }}
                  itemStyle={{ color: '#3b82f6' }}
                />
                <Area type="monotone" dataKey="views" stroke="#3b82f6" fillOpacity={1} fill="url(#colorViews)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
          <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
            <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
            Subscriber Growth
          </h4>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '8px', color: '#f8fafc' }}
                  cursor={{ fill: '#334155' }}
                />
                <Bar dataKey="subs" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
      
      <div className="bg-slate-800 p-6 rounded-2xl border border-slate-700">
        <h4 className="text-lg font-bold mb-4">Top Performing Videos</h4>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-slate-500 border-b border-slate-700">
                <th className="pb-4 font-medium">Video Title</th>
                <th className="pb-4 font-medium text-right">Views</th>
                <th className="pb-4 font-medium text-right">Avg Duration</th>
                <th className="pb-4 font-medium text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-700">
              {[
                { title: "Building a React App with Gemini API", views: "125K", duration: "8:42", status: "Trending" },
                { title: "The Future of AI Content Creation", views: "82K", duration: "12:15", status: "Active" },
                { title: "10 Tips for Viral Shorts", views: "245K", duration: "0:58", status: "Viral" },
              ].map((v, i) => (
                <tr key={i} className="hover:bg-slate-700/50 transition-colors">
                  <td className="py-4 font-medium">{v.title}</td>
                  <td className="py-4 text-right text-slate-300">{v.views}</td>
                  <td className="py-4 text-right text-slate-300">{v.duration}</td>
                  <td className="py-4 text-right">
                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                      v.status === 'Viral' ? 'bg-rose-500/20 text-rose-400' : 'bg-emerald-500/20 text-emerald-400'
                    }`}>
                      {v.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
