import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { CourseDataProvider } from './context/CourseDataContext'
import { Analytics } from '@vercel/analytics/react'
import ScrollToTop from './components/ScrollToTop'
import MalackyNavigation from './components/MalackyNavigation'
import BratislavaNavigation from './components/BratislavaNavigation'
import Footer from './components/Footer'
import LocationLayout from './components/LocationLayout'
import CookieConsent from './components/CookieConsent'
import HiringBanner from './components/HiringBanner'
import Gdpr from './pages/Legal/Gdpr'
import Cookies from './pages/Legal/Cookies'
import ObchodnePodmienky from './pages/Legal/ObchodnePodmienky'
import FakturacneUdaje from './pages/Legal/FakturacneUdaje'
import LocationSelector from './pages/LocationSelector'
import BratislavaHome from './pages/Bratislava/BratislavaHome'
import BratislavaKurzy from './pages/Bratislava/BratislavaKurzy'
import BratislavaKurzBDetail from './pages/Bratislava/BratislavaKurzBDetail'
import BratislavaVozidla from './pages/Bratislava/BratislavaVozidla'
import BratislavaDokumenty from './pages/Bratislava/BratislavaDokumenty'
import BratislavaKontakt from './pages/Bratislava/BratislavaKontakt'
import MalackyHome from './pages/Malacky/MalackyHome'
import MalackyKurzy from './pages/Malacky/MalackyKurzy'
import KurzBDetail from './pages/Malacky/KurzBDetail'
import KurzA1Detail from './pages/Malacky/KurzA1Detail'
import KurzA2Detail from './pages/Malacky/KurzA2Detail'
import KurzADetail from './pages/Malacky/KurzADetail'
import MalackyVozidla from './pages/Malacky/MalackyVozidla'
import MalackyDokumenty from './pages/Malacky/MalackyDokumenty'
import MalackyKontakt from './pages/Malacky/MalackyKontakt'
import AdminLogin from './pages/Admin/AdminLogin'
import AdminDashboard from './pages/Admin/AdminDashboard'
import AdminRegistrations from './pages/Admin/AdminRegistrations'
import AdminPrices from './pages/Admin/AdminPrices'
import AdminDates from './pages/Admin/AdminDates'
import Registracia from './pages/Registracia'
import TreeSocial from './pages/TreeSocial'

const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const isLoggedIn = localStorage.getItem('admin_token')
  return isLoggedIn ? <>{children}</> : <Navigate to="/admin/login" replace />
}

function App() {
  return (
    <CourseDataProvider>
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Location Selector - No Nav/Footer */}
        <Route path="/" element={<LocationSelector />} />

        {/* Hidden social landing — no nav/footer */}
        <Route path="/tree" element={<TreeSocial />} />
        
        {/* Bratislava Routes with BratislavaNavigation and Footer */}
        <Route path="/bratislava" element={
          <div className="min-h-screen flex flex-col">
            <BratislavaNavigation />
            <main className="flex-grow">
              <BratislavaHome />
            </main>
            <Footer />
          </div>
        } />
        
        <Route path="/bratislava/kurzy" element={
          <div className="min-h-screen flex flex-col">
            <BratislavaNavigation />
            <main className="flex-grow">
              <BratislavaKurzy />
            </main>
            <Footer />
          </div>
        } />

        <Route path="/bratislava/kurzy/b" element={
          <div className="min-h-screen flex flex-col">
            <BratislavaNavigation />
            <main className="flex-grow">
              <BratislavaKurzBDetail />
            </main>
            <Footer />
          </div>
        } />

        <Route path="/bratislava/vozidla" element={
          <div className="min-h-screen flex flex-col">
            <BratislavaNavigation />
            <main className="flex-grow">
              <BratislavaVozidla />
            </main>
            <Footer />
          </div>
        } />

        <Route path="/bratislava/dokumenty" element={
          <div className="min-h-screen flex flex-col">
            <BratislavaNavigation />
            <main className="flex-grow">
              <BratislavaDokumenty />
            </main>
            <Footer />
          </div>
        } />

        <Route path="/bratislava/kontakt" element={
          <div className="min-h-screen flex flex-col">
            <BratislavaNavigation />
            <main className="flex-grow">
              <BratislavaKontakt />
            </main>
            <Footer />
          </div>
        } />

        <Route path="/bratislava/registracia" element={
          <div className="min-h-screen flex flex-col">
            <BratislavaNavigation />
            <main className="flex-grow">
              <Registracia key="bratislava-registracia" location="Bratislava" />
            </main>
            <Footer />
          </div>
        } />

        <Route path="/bratislava/gdpr" element={<LocationLayout location="bratislava"><Gdpr /></LocationLayout>} />
        <Route path="/bratislava/fakturacne-udaje" element={<LocationLayout location="bratislava"><FakturacneUdaje /></LocationLayout>} />
        <Route path="/bratislava/cookies" element={<LocationLayout location="bratislava"><Cookies /></LocationLayout>} />
        <Route path="/bratislava/obchodne-podmienky" element={<LocationLayout location="bratislava"><ObchodnePodmienky /></LocationLayout>} />
        
        {/* Malacky Routes with MalackyNavigation and Footer */}
        <Route path="/malacky" element={
          <div className="min-h-screen flex flex-col">
            <MalackyNavigation />
            <main className="flex-grow">
              <MalackyHome />
            </main>
            <Footer />
          </div>
        } />
        
        <Route path="/malacky/kurzy" element={
          <div className="min-h-screen flex flex-col">
            <MalackyNavigation />
            <main className="flex-grow">
              <MalackyKurzy />
            </main>
            <Footer />
          </div>
        } />
        
        <Route path="/malacky/kurzy/b" element={
          <div className="min-h-screen flex flex-col">
            <MalackyNavigation />
            <main className="flex-grow">
              <KurzBDetail />
            </main>
            <Footer />
          </div>
        } />
        
        <Route path="/malacky/kurzy/a1" element={
          <div className="min-h-screen flex flex-col">
            <MalackyNavigation />
            <main className="flex-grow">
              <KurzA1Detail />
            </main>
            <Footer />
          </div>
        } />
        
        <Route path="/malacky/kurzy/a2" element={
          <div className="min-h-screen flex flex-col">
            <MalackyNavigation />
            <main className="flex-grow">
              <KurzA2Detail />
            </main>
            <Footer />
          </div>
        } />

        <Route path="/malacky/kurzy/a" element={
          <div className="min-h-screen flex flex-col">
            <MalackyNavigation />
            <main className="flex-grow">
              <KurzADetail />
            </main>
            <Footer />
          </div>
        } />
        
        <Route path="/malacky/vozidla" element={
          <div className="min-h-screen flex flex-col">
            <MalackyNavigation />
            <main className="flex-grow">
              <MalackyVozidla />
            </main>
            <Footer />
          </div>
        } />
        
        <Route path="/malacky/dokumenty" element={
          <div className="min-h-screen flex flex-col">
            <MalackyNavigation />
            <main className="flex-grow">
              <MalackyDokumenty />
            </main>
            <Footer />
          </div>
        } />
        
        <Route path="/malacky/kontakt" element={
          <div className="min-h-screen flex flex-col">
            <MalackyNavigation />
            <main className="flex-grow">
              <MalackyKontakt />
            </main>
            <Footer />
          </div>
        } />

        <Route path="/malacky/registracia" element={
          <div className="min-h-screen flex flex-col">
            <MalackyNavigation />
            <main className="flex-grow">
              <Registracia key="malacky-registracia" location="Malacky" />
            </main>
            <Footer />
          </div>
        } />

        <Route path="/malacky/gdpr" element={<LocationLayout location="malacky"><Gdpr /></LocationLayout>} />
        <Route path="/malacky/fakturacne-udaje" element={<LocationLayout location="malacky"><FakturacneUdaje /></LocationLayout>} />
        <Route path="/malacky/cookies" element={<LocationLayout location="malacky"><Cookies /></LocationLayout>} />
        <Route path="/malacky/obchodne-podmienky" element={<LocationLayout location="malacky"><ObchodnePodmienky /></LocationLayout>} />

        {/* Admin Routes */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/registracie" element={<ProtectedRoute><AdminRegistrations /></ProtectedRoute>} />
        <Route path="/admin/ceny" element={<ProtectedRoute><AdminPrices /></ProtectedRoute>} />
        <Route path="/admin/terminy" element={<ProtectedRoute><AdminDates /></ProtectedRoute>} />
      </Routes>
      <Analytics />
      <HiringBanner />
      <CookieConsent />
    </Router>
    </CourseDataProvider>
  )
}

export default App

