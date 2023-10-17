import Layout from '@theme/Layout';
import React from 'react';
import { Analytics } from '@vercel/analytics/react';
import Home from '../components/Home';

function HomePage() {
  return (
    <>
      <Layout
        title="三木学习小站"
        description="三木的学习笔记"
      >
        <Home />
      </Layout>
      <Analytics />
    </>
  );
}

export default HomePage;
