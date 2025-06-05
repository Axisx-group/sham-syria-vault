
import React from 'react';
import { createRoot } from 'react-dom/client';
import AppClient from './AppClient.tsx';
import './index.css';

createRoot(document.getElementById("root")!).render(<AppClient />);
