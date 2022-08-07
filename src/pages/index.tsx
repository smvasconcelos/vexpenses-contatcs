import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './home'
import Search from './search'
import AddContact from './contact/add'
import EditContact from './contact/edit'

const App: React.FC = () => {
	return (
		<Router>
			<Routes>
				<Route path="*" element={<Home />} />
				<Route path="/" element={<Home />} />
				<Route path="/search" element={<Search />} />
				<Route path="/contact/add" element={<AddContact />} />
				<Route path="/contact/edit/:userInfo" element={<EditContact />} />
			</Routes>
		</Router>
	)
}
export default App
