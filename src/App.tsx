import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { DashboardPage } from './pages/DashboardPage';
import { SystemsPage } from './pages/SystemsPage';
import { PlantsPage } from './pages/PlantsPage';
import { ProfilePage } from './pages/ProfilePage';
import { HYDROPONIC_SYSTEMS } from './data/systems';
import { NotificationProvider } from './contexts/NotificationContext';
import type { RentedSystem } from './types/system';

function App() {
  const [rentedSystems, setRentedSystems] = useState<RentedSystem[]>([]);

  const handleRentSystem = (systemId: string, months: number) => {
    const system = HYDROPONIC_SYSTEMS.find(s => s.id === systemId);
    if (!system) return;

    const startDate = new Date();
    const endDate = new Date();
    endDate.setMonth(endDate.getMonth() + months);

    const newSystem: RentedSystem = {
      id: crypto.randomUUID(),
      name: system.name,
      capacity: system.capacity,
      rentalPeriod: months as 3 | 6 | 12,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
      plants: [],
      metrics: {
        temperature: 22,
        humidity: 60,
        nutrientLevel: 100,
        phLevel: 6.0,
        lastUpdated: new Date().toISOString()
      }
    };

    setRentedSystems(prev => [...prev, newSystem]);
  };

  const handleRemoveSystem = (systemId: string) => {
    setRentedSystems(prev => prev.filter(system => system.id !== systemId));
  };

  return (
    <NotificationProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route 
              path="/" 
              element={
                <DashboardPage 
                  rentedSystems={rentedSystems} 
                  onRemoveSystem={handleRemoveSystem}
                />
              } 
            />
            <Route 
              path="/systems" 
              element={<SystemsPage onRentSystem={handleRentSystem} />} 
            />
            <Route 
              path="/plants" 
              element={<PlantsPage />} 
            />
            <Route 
              path="/profile" 
              element={<ProfilePage rentedSystems={rentedSystems} />} 
            />
          </Routes>
        </Layout>
      </BrowserRouter>
    </NotificationProvider>
  );
}

export default App;