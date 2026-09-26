import { Users, ShoppingBag, DollarSign, BookOpen } from 'lucide-react';

export default function AdminDashboard() {
  const stats = [
    { name: 'Total Revenue', value: '₹45,200', icon: DollarSign, color: 'text-green-400', bg: 'bg-green-400/10' },
    { name: 'Total Orders', value: '124', icon: ShoppingBag, color: 'text-brand-purple', bg: 'bg-brand-purple/10' },
    { name: 'Total Customers', value: '89', icon: Users, color: 'text-brand-purple', bg: 'bg-brand-purple/10' },
    { name: 'Active Courses', value: '24', icon: BookOpen, color: 'text-blue-400', bg: 'bg-blue-400/10' },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold text-text-primary mb-8">Dashboard Overview</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="bg-surface-main p-6 rounded-2xl border border-border-light shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.bg}`}>
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>
              </div>
              <p className="text-text-secondary text-sm font-medium">{stat.name}</p>
              <h3 className="text-2xl font-bold text-text-primary mt-1">{stat.value}</h3>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Orders Table */}
        <div className="bg-surface-main rounded-2xl border border-border-light shadow-sm overflow-hidden">
          <div className="p-6 border-b border-border-light flex justify-between items-center">
            <h2 className="text-lg font-bold text-text-primary">Recent Orders</h2>
            <button className="text-sm text-brand-purple hover:underline">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-surface-subtle text-text-secondary text-sm">
                  <th className="px-6 py-3 font-medium">Order ID</th>
                  <th className="px-6 py-3 font-medium">Customer</th>
                  <th className="px-6 py-3 font-medium">Amount</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="text-sm text-text-secondary divide-y divide-border-light">
                {[1, 2, 3, 4, 5].map((i) => (
                  <tr key={i} className="hover:bg-surface-soft transition-colors">
                    <td className="px-6 py-4">#ORD-00{i}</td>
                    <td className="px-6 py-4">user{i}@example.com</td>
                    <td className="px-6 py-4">₹499</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-green-500/20 text-green-600 rounded-full text-xs font-medium border border-green-500/30">
                        Success
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Top Selling Courses */}
        <div className="bg-surface-main rounded-2xl border border-border-light shadow-sm overflow-hidden">
          <div className="p-6 border-b border-border-light">
            <h2 className="text-lg font-bold text-text-primary">Top Selling Courses</h2>
          </div>
          <div className="p-6 space-y-4">
            {[
              { title: 'Digital Marketing Mastery', sales: 45 },
              { title: 'Freelancing Starter Guide', sales: 38 },
              { title: 'WordPress Website Development', sales: 24 },
            ].map((course, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded bg-surface-subtle flex items-center justify-center font-bold text-text-secondary mr-4">
                    {idx + 1}
                  </div>
                  <span className="text-text-primary text-sm font-medium">{course.title}</span>
                </div>
                <span className="text-brand-purple font-bold">{course.sales} sales</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
