import React from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './home'

const App: React.FC = () => {
	return (
		<Router>
			<Routes>
				<Route path="/">
					<Route path="/" element={<Home />} />
				</Route>
			</Routes>
		</Router>
	)
}
export default App
