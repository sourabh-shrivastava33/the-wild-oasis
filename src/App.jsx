import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import GlobalStyle from "./styles/GlobalStyles";
import DashBoard from "./pages/Dashboard";
import Account from "./pages/Account";
import Bookings from "./pages/Bookings";
import Cabins from "./pages/Cabins";
import Login from "./pages/Login";
import Settings from "./pages/Settings";
import Users from "./pages/Users";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./ui/AppLayout";
import { Toaster } from "react-hot-toast";
import Booking from "./pages/Booking";
import Checkin from "./pages/Checkin";
import ProtectedRoute from "./ui/ProtectedRoute";
import { DarkModeProvider } from "./context/DarkModeContext";
function App() {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 0,
			},
		},
	});
	return (
		<DarkModeProvider>
			<QueryClientProvider client={queryClient}>
				<ReactQueryDevtools initialIsOpen={false} />
				<GlobalStyle />
				<Toaster
					position="top-center"
					gutter={12}
					toastOptions={{
						success: {
							duration: 3000,
						},
						error: {
							duration: 5000,
						},
						style: {
							backgroundColor: "var(--color-grey-0)",
							padding: "1rem 1.5rem",
							maxWidth: "500px",
							color: "var(--color-grey-700)",
						},
					}}
				/>
				<BrowserRouter>
					<Routes>
						<Route
							element={
								<ProtectedRoute>
									<AppLayout />
								</ProtectedRoute>
							}
						>
							<Route index element={<Navigate replace to="dashboard" />} />
							<Route path="dashboard" element={<DashBoard />} />
							<Route path="account" element={<Account />} />
							<Route path="bookings" element={<Bookings />} />
							<Route path="bookings/:bookingId" element={<Booking />} />
							<Route path="checkin/:bookingId" element={<Checkin />} />
							<Route path="cabins" element={<Cabins />} />
							<Route path="settings" element={<Settings />} />
							<Route path="users" element={<Users />} />
						</Route>

						<Route path="login" element={<Login />} />
						<Route path="*" element={<PageNotFound />} />
					</Routes>
				</BrowserRouter>
			</QueryClientProvider>
		</DarkModeProvider>
	);
}

export default App;
