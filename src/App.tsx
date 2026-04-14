import { AppProvider, useApp } from './context/AppContext';
import LoginPage from './components/LoginPage';
import Sidebar from './components/Sidebar';
import TopBar from './components/TopBar';
import Dashboard from './pages/Dashboard';
import ReturnFiling from './pages/ReturnFiling';
import IncomeTaxReturn from './pages/IncomeTaxReturn';
import SalesTax from './pages/SalesTax';
import WithholdingTax from './pages/WithholdingTax';
import PaymentCPR from './pages/PaymentCPR';
import Notices from './pages/Notices';
import Profile from './pages/Profile';
import WealthStatement from './pages/WealthStatement';
import TaxCalculator from './pages/TaxCalculator';
import PRA from './pages/PRA';
import SECP from './pages/SECP';
import FED from './pages/FED';
import Customs from './pages/Customs';
import FinancialStatements from './pages/FinancialStatements';
import Auditing from './pages/Auditing';
import CostingBudgeting from './pages/CostingBudgeting';
import Registrations from './pages/Registrations';

function PortalLayout() {
  const { currentPage, isLoggedIn } = useApp();

  if (!isLoggedIn) return <LoginPage />;

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard': return <Dashboard />;
      case 'return-filing': return <ReturnFiling />;
      case 'income-tax': return <IncomeTaxReturn />;
      case 'sales-tax': return <SalesTax />;
      case 'withholding': return <WithholdingTax />;
      case 'payment': return <PaymentCPR />;
      case 'notices': return <Notices />;
      case 'profile': return <Profile />;
      case 'wealth-statement': return <WealthStatement />;
      case 'tax-calculator': return <TaxCalculator />;
      case 'pra': return <PRA />;
      case 'secp': return <SECP />;
      case 'fed': return <FED />;
      case 'customs': return <Customs />;
      case 'financial-statements': return <FinancialStatements />;
      case 'auditing': return <Auditing />;
      case 'costing-budgeting': return <CostingBudgeting />;
      case 'registrations': return <Registrations />;
      case 'ntn-registration': return <Registrations />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <TopBar />
        {/* Practice Banner */}
        <div className="bg-yellow-400 text-yellow-900 text-center py-1 text-xs font-bold">
          ⚠️ PRACTICE PORTAL ONLY — NOT AFFILIATED WITH FBR PAKISTAN — FOR EDUCATIONAL / TRAINING PURPOSES
        </div>
        <main className="flex-1 overflow-y-auto">
          {renderPage()}
        </main>
        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 px-4 py-2 text-center text-[10px] text-gray-400">
          © 2025 FBR IRIS Practice Portal | Federal Board of Revenue | Government of Pakistan (Dummy — Education Only)
          &nbsp;|&nbsp; Version 3.0.1 (Practice)
        </footer>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <AppProvider>
      <PortalLayout />
    </AppProvider>
  );
}
