import React from 'react';
import Layout from '../Layout/Layout';
import Dashboard from './Dashboard';

interface HomeProps {
  onLogout?: () => void;
}

export default function Home({ onLogout }: HomeProps) {
  return (
    <Layout onLogout={onLogout}>
      <Dashboard />
    </Layout>
  );
} 