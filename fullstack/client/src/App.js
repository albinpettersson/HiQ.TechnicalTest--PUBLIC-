import UploadPage from "./pages/UploadPage";

import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faCoffee, faHeart } from '@fortawesome/free-solid-svg-icons';
//import { fab } from '@fortawesome/free-brands-svg-icons';
import Footer from "./components/Footer/Footer";
import { CssBaseline } from "@mui/material";

library.add( /*fab,*/ faCoffee, faHeart )

const Layout = () => {
	return (
		<>
			<CssBaseline />
			<main>
				<Outlet />
			</main>
			<Footer />
		</>
	);
}

const App = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />} >
					<Route index element={<UploadPage />} />
				</Route>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
