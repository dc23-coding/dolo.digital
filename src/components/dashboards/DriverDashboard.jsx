import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Truck, DollarSign, CheckCircle, AlertTriangle, X, Mail, Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/contexts/AuthContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const DriverDashboard = () => {
  const { user, userRole } = useAuth();
  const [loads, setLoads] = useState([]);
  const [payments, setPayments] = useState([]);
  const [selectedLoad, setSelectedLoad] = useState(null);
  const [activeView, setActiveView] = useState('dashboard');
  const [stats, setStats] = useState({
    completedLoads: 0,
    totalEarnings: 0,
    upcomingLoads: 0,
    complianceAlerts: []
  });

  useEffect(() => {
    const fetchDriverData = async () => {
      let loadQuery = supabase.from('loads').select('*').order('pickup_time', { ascending: true });
      let payrollQuery = supabase.from('payroll').select('*').order('payment_date', { ascending: false });

      if (userRole !== 'admin') {
        loadQuery = loadQuery.eq('driver_id', user.id);
        payrollQuery = payrollQuery.eq('driver_id', user.id);
      }

      const { data: loadsData } = await loadQuery;
      const { data: paymentsData } = await payrollQuery;

      if (loadsData) setLoads(loadsData);
      if (paymentsData) setPayments(paymentsData);

      setStats({
        completedLoads: loadsData?.filter(load => load.status === 'Completed').length || 0,
        totalEarnings: paymentsData?.reduce((sum, payment) => sum + Number(payment.amount), 0) || 0,
        upcomingLoads: loadsData?.filter(load => load.status === 'Scheduled').length || 0,
        complianceAlerts: []
      });
    };

    fetchDriverData();
  }, [user.id, userRole]);

  const chartData = payments.map(payment => ({
    date: new Date(payment.payment_date).toLocaleDateString(),
    amount: Number(payment.amount)
  }));

  const handleStatusUpdate = async (loadId, newStatus) => {
    const { error } = await supabase
      .from('loads')
      .update({ status: newStatus })
      .eq('id', loadId);

    if (!error) {
      setLoads(loads.map(load => (load.id === loadId ? { ...load, status: newStatus } : load)));
      setSelectedLoad({ ...selectedLoad, status: newStatus });
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-3xl font-bold">Driver Dashboard</h1>
        <p className="text-muted-foreground mt-2">Welcome back! Here's your control panel.</p>
      </motion.div>

      {/* Navigation Buttons */}
      <div className="flex gap-2 mb-4">
        <Button variant={activeView === 'dashboard' ? 'default' : 'outline'} onClick={() => setActiveView('dashboard')}>
          Dashboard
        </Button>
        <Button variant={activeView === 'loads' ? 'default' : 'outline'} onClick={() => setActiveView('loads')}>
          <Truck className="h-4 w-4 mr-1" /> My Loads
        </Button>
        <Button variant={activeView === 'payroll' ? 'default' : 'outline'} onClick={() => setActiveView('payroll')}>
          <DollarSign className="h-4 w-4 mr-1" /> Payroll History
        </Button>
        <Button variant={activeView === 'messages' ? 'default' : 'outline'} onClick={() => setActiveView('messages')}>
          <Mail className="h-4 w-4 mr-1" /> Messages
        </Button>
        <Button variant="outline" disabled>
          <Wrench className="h-4 w-4 mr-1" /> Dolo Tools (Coming Soon)
        </Button>
      </div>

      {/* Conditional Views */}
      {activeView === 'dashboard' && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard icon={<Truck />} label="Completed Loads" value={stats.completedLoads} />
            <StatCard icon={<DollarSign />} label="Total Earnings" value={`$${stats.totalEarnings.toFixed(2)}`} />
            <StatCard icon={<CheckCircle />} label="Upcoming Loads" value={stats.upcomingLoads} />
            <StatCard icon={<AlertTriangle />} label="Compliance Alerts" value={stats.complianceAlerts.length} />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <motion.div className="glass-effect p-4 rounded-lg" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
              <h3 className="text-xl font-bold mb-4">Earnings Trend</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="amount" stroke="#4CAF50" />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          </div>
        </>
      )}

      {activeView === 'loads' && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold mb-4">My Loads</h3>
          {loads.map(load => (
            <div key={load.id} className="gradient-border bg-card p-3 rounded-lg flex justify-between items-center">
              <div>
                <p className="font-medium">{load.origin} → {load.destination}</p>
                <p className="text-sm text-muted-foreground">Pickup: {new Date(load.pickup_time).toLocaleString()}</p>
              </div>
              <Button variant="outline" size="sm" onClick={() => setSelectedLoad(load)}>
                View Details
              </Button>
            </div>
          ))}
        </div>
      )}

      {activeView === 'payroll' && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold mb-4">Payroll History</h3>
          {payments.map(payment => (
            <div key={payment.id} className="gradient-border bg-card p-3 rounded-lg">
              <p><strong>Period:</strong> {new Date(payment.period_start).toLocaleDateString()} - {new Date(payment.period_end).toLocaleDateString()}</p>
              <p><strong>Amount:</strong> ${payment.amount.toFixed(2)}</p>
              <p><strong>Status:</strong> {payment.status}</p>
              <p><strong>Payment Date:</strong> {new Date(payment.payment_date).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}

      {activeView === 'messages' && (
        <div className="space-y-4">
          <h3 className="text-xl font-bold mb-4">Messages (Coming Soon)</h3>
          <p>No new messages.</p>
        </div>
      )}

      {selectedLoad && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-card p-6 rounded-lg shadow-lg max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Load Details</h2>
              <Button variant="ghost" size="icon" onClick={() => setSelectedLoad(null)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-2 mb-4">
              <p><strong>Origin:</strong> {selectedLoad.origin}</p>
              <p><strong>Destination:</strong> {selectedLoad.destination}</p>
              <p><strong>Pickup Time:</strong> {new Date(selectedLoad.pickup_time).toLocaleString()}</p>
              <p><strong>Delivery Time:</strong> {new Date(selectedLoad.delivery_time).toLocaleString()}</p>
              <p><strong>Status:</strong> {selectedLoad.status}</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => handleStatusUpdate(selectedLoad.id, 'In Progress')}>Mark In Progress</Button>
              <Button variant="outline" onClick={() => handleStatusUpdate(selectedLoad.id, 'Completed')}>Mark Completed</Button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

const StatCard = ({ icon, label, value }) => (
  <motion.div className="glass-effect p-4 rounded-lg" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3 }}>
    <div className="flex items-center gap-2">
      {icon}
      <h3 className="font-medium">{label}</h3>
    </div>
    <p className="text-2xl font-bold mt-2">{value}</p>
  </motion.div>
);

export default DriverDashboard;
