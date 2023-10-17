import Layout from '@theme/Layout';
import React from 'react';
import { Analytics } from '@vercel/analytics/react';
import Home from '../components/Home';

function HomePage() {
  return (
    <>
      <Layout
        title="青石学习小驿"
        description="青石的学习笔记"
      >
        <Home />
      </Layout>
      <Analytics />
    </>
  );
}

export default HomePage;
