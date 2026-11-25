import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { DownloadSparks } from './components/DownloadSparks';
import { HomePage } from './pages/HomePage';
import { DownloadPage } from './pages/DownloadPage';
import { PrivacyPage } from './pages/PrivacyPage';
import { DeleteAccountPage } from './pages/DeleteAccountPage';
import { SupportPage } from './pages/SupportPage';
import { TermsPage } from './pages/TermsPage';
import { NotFoundPage } from './pages/NotFoundPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/download" element={<DownloadPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/delete-account" element={<DeleteAccountPage />} />
        <Route path="/support" element={<SupportPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <DownloadSparks />
    </BrowserRouter>
  );
}
