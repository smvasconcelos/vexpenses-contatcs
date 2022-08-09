import React from "react";
import { createRoot } from "react-dom/client";
import App from './pages';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from "context/user";
// import { GoogleOAuthProvider } from '@react-oauth/google';

const rootElement = document.getElementById("root")!;
const root = createRoot(rootElement);

root.render(
	<>
		{/* <GoogleOAuthProvider
			clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
		> */}
			<AuthProvider>
				<App />
			</AuthProvider>
		{/* </GoogleOAuthProvider> */}
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
