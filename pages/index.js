// Tree Services Edition – React Frontend Components (Connected to Backend Functions with Embedded Routing + Auth + Unified Dashboard)

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';

const supabase = createClient(
  'https://astowlftrpmcqzqymvnd.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFzdG93bGZ0cnBtY3F6cXltdm5kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYyMDk2NzgsImV4cCI6MjA2MTc4NTY3OH0.AxL3hxJfN8jWSt2eqvJhGQKqmykvEwGUyJ4iurATVmQ'
);

function withAuth(Component) {
  return function AuthWrapper(props) {
    const [session, setSession] = useState(null);

    useEffect(() => {
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session);
      });

      const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session);
      });

      return () => {
        listener.subscription.unsubscribe();
      };
    }, []);

    if (!session) {
      return <div className="p-6 text-red-600 font-semibold">Please log in to access this feature.</div>;
    }

    return <Component {...props} session={session} />;
  };
}

function HomeNavigation() {
  return (
    <div className="bg-gray-200 px-4 py-2 mb-4">
      <h2 className="text-lg font-bold">🌲 Field Agent AI - Tree Services Edition</h2>
    </div>
  );
}

export const TreeDashboard = withAuth(() => {
  const tools = [
    { name: 'Smart Follow-Ups', path: '/smart-follow-ups' },
    { name: 'Photo Analysis Upload', path: '/photo-analysis' },
    { name: 'ZIP Routing Dashboard', path: '/zip-routing' },
    { name: 'CRM Vault', path: '/crm-vault' },
    { name: 'Permit Bot & Upsell Engine', path: '/permit-bot' },
    { name: 'Storm Lead Alerts', path: '/storm-alerts' },
    { name: 'FEMA/Power Co. Tag Generator', path: '/fema-tags' },
    { name: 'Emergency Scheduling Mode', path: '/emergency-scheduling' },
    { name: 'Quote Generator by Tree Type', path: '/quote-generator' },
    { name: 'Volume Pricing Calculator', path: '/volume-pricing' },
    { name: 'Trim / Remove / Haul Tracker', path: '/trim-remove-haul' },
    { name: 'Before & After Photo Vault', path: '/before-after' },
    { name: 'Text-Based Invoicing', path: '/text-invoice' }
  ];

  return (
    <>
      <HomeNavigation />
      <nav className="mb-4">
        <Link href="/" className="text-sm text-gray-600 underline">← Back to Home</Link>
      </nav>
      <h1 className="text-3xl font-bold mb-6">Tree Services Agent Dashboard</h1>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tools.map((tool, i) => (
          <li key={i} className="border rounded shadow p-4 hover:bg-gray-100">
            <a href={tool.path} className="text-blue-600 font-semibold text-lg">{tool.name}</a>
          </li>
        ))}
      </ul>
    </>
  );
});// trigger
