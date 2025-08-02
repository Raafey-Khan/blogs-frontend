import Navbar from '../components/Navbar';
import { StoreProvider } from '../store/StoreProvider';
import {ToastContainer} from 'react-toastify'
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <head />
      <body className="bg-gray-100 text-gray-900">
        <StoreProvider>
          <Navbar />
          {children}
          <ToastContainer position='top-right' autoClose={3000} />
        </StoreProvider>
      </body>
    </html>
  );
}
