import UploadPage from "./pages/UploadPage";

import { BrowserRouter, Outlet, Route, Routes } from 'react-router-dom';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faCoffee, faHeart } from '@fortawesome/free-solid-svg-icons';
//import { fab } from '@fortawesome/free-brands-svg-icons';
import Footer from "./components/Footer/Footer";
import { Box, CssBaseline, createTheme } from "@mui/material";
import { ThemeProvider as MuiThemeProvider } from "@mui/material/styles";
import { blue, deepPurple, pink } from "@mui/material/colors";

library.add( /*fab,*/ faCoffee, faHeart )


const darkTheme  = createTheme({
	palette: {
	  mode: 'dark',
	  primary: pink,
	  secondary: blue,
	}
});

const Layout = () => {
	return (     
		<MuiThemeProvider theme={darkTheme}>
			<CssBaseline />
			<Box 
				minHeight="100vh" 
				sx={{ display: "flex", flexDirection: "column" }}
			>
				<Box 
					sx={{display: "flex", flexGrow: 1}}
				>
					<Outlet />
				</Box>
				<Footer />
			</Box>
		</MuiThemeProvider>
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
