
import React, { Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

const App = lazy(() => import('./App'));

createRoot(document.getElementById("root")!).render(
  <Suspense fallback={<div className="flex items-center justify-center h-screen text-xl">Loading...</div>}>
    <App />
  </Suspense>
);
