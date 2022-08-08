import React from "react";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from './pages';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import { ToastContainer } from 'react-toastify';

const rootElement = document.getElementById("root")!;
const root = createRoot(rootElement);

root.render(
	<>
		<App />
		<ToastContainer
			position="top-right"
			autoClose={2000}
			hideProgressBar={true}
			closeOnClick
			rtl={false}
			pauseOnFocusLoss
			draggable
			pauseOnHover
			theme="colored"
		/>
	</>
);
