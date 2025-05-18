import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Users, DollarSign, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';

const AdminDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className="text-3xl font-bold">Admin Dashboard – Control Center</h1>
        <p className="text-muted-foreground mt-2">Oversee drivers, brokers, payroll, and system insights.</p>
      </motion.div>

      {/* Key Workflow Panels */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        {/* Admin Overview (Legacy Dashboard) */}
        <motion.div className="glass-effect p-4 rounded-lg flex flex-col justify-between" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
          <div>
            <Users className="h-8 w-8 text-primary mb-2" />
            <h2 className="text-xl font-bold mb-2">Admin Overview</h2>
            <p className="text-sm text-muted-foreground">View system-wide metrics and operational insights.</p>
          </div>
          <Button className="mt-4" onClick={() => navigate('/dashboard-overview')}>
            View Admin Overview
          </Button>
        </motion.div>

        {/* Payroll Management */}
        <motion.div className="glass-effect p-4 rounded-lg flex flex-col justify-between" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
          <div>
            <DollarSign className="h-8 w-8 text-primary mb-2" />
            <h2 className="text-xl font-bold mb-2">Payroll Management</h2>
            <p className="text-sm text-muted-foreground">Manage driver payments and export financial reports.</p>
          </div>
          <Button className="mt-4" onClick={() => navigate('/payroll')}>
            Go to Payroll
          </Button>
        </motion.div>

        {/* Broker Listing */}
        <motion.div className="glass-effect p-4 rounded-lg flex flex-col justify-between" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <div>
            <Briefcase className="h-8 w-8 text-primary mb-2" />
            <h2 className="text-xl font-bold mb-2">Active Brokers</h2>
            <p className="text-sm text-muted-foreground">View and manage active brokers and their shipments.</p>
          </div>
          <Button className="mt-4" onClick={() => navigate('/broker-dashboard')}>
            View Brokers
          </Button>
        </motion.div>

        {/* Driver Listing */}
        <motion.div className="glass-effect p-4 rounded-lg flex flex-col justify-between" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <div>
            <Users className="h-8 w-8 text-primary mb-2" />
            <h2 className="text-xl font-bold mb-2">Driver Listing & Activities</h2>
            <p className="text-sm text-muted-foreground">View all drivers, their loads, and performance data.</p>
          </div>
          <Button className="mt-4" onClick={() => navigate('/driver-dashboard')}>
            View Drivers
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default AdminDashboard;
