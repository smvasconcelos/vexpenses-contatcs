import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './home'
import Search from './search'
import AddContact from './contact/add'

const App: React.FC = () => {
	return (
		<Router>
			<Routes>
				<Route path="*" element={<Home />} />
				<Route path="/" element={<Home />} />
				<Route path="/search" element={<Search />} />
				<Route path="/contact/add" element={<AddContact />} />
			</Routes>
		</Router>
	)
}
export default App
