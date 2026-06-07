import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn } from '@clerk/clerk-react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Dashboard from './pages/Dashboard';
import InvoiceList from './pages/InvoiceList';
import InvoiceImport from './pages/InvoiceImport';
import Settings from './pages/Settings';
import ClientPortal from './pages/ClientPortal';

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
const queryClient = new QueryClient();

function App() {
  return (
    <ClerkProvider publishableKey={clerkPubKey}>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <SignedIn>
                    <Dashboard />
                  </SignedIn>
                  <SignedOut>
                    <RedirectToSignIn />
                  </SignedOut>
                </>
              }
            />
            <Route
              path="/invoices"
              element={
                <SignedIn>
                  <InvoiceList />
                </SignedIn>
              }
            />
            <Route
              path="/import"
              element={
                <SignedIn>
                  <InvoiceImport />
                </SignedIn>
              }
            />
            <Route
              path="/settings"
              element={
                <SignedIn>
                  <Settings />
                </SignedIn>
              }
            />
            <Route
              path="/portal/:invoice_id"
              element={<ClientPortal />}
            />
          </Routes>
        </Router>
      </QueryClientProvider>
    </ClerkProvider>
  );
}

export default App;
