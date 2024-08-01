import { Outlet } from 'react-router-dom';
import HeaderPreLaYout from './Header';
import Footer from '@/layouts/shared/Footer';

function PreLayout() {
  return (
    <div>
      <HeaderPreLaYout />
      <div className="bg-[#e9ebee] mt-[56px] h-screen">
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default PreLayout;
