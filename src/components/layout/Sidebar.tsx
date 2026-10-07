import React from 'react';
import { useFarm, AppPage } from '../../context/FarmContext';
import {
  Home,
  LayoutDashboard,
  Sprout,
  Droplets,
  HelpCircle,
  Activity,
  HeartPulse,
  CloudRain,
  ListChecks,
  GitFork,
  Settings,
  AlertTriangle
} from 'lucide-react';

interface SidebarProps {
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, onCloseMobile }) => {
  const {
    activePage,
    setActivePage,
    tomatoAnomalyActive,
    setTomatoAnomalyActive,
    availableWater,
    highRiskCount,
    t
  } = useFarm();

  const navItems: {
    id: AppPage;
    label: string;
    icon: React.ElementType;
    badge?: string;
    badgeColor?: string;
    highlight?: boolean;
  }[] = [
    { id: 'landing', label: t('navOverview'), icon: Home },
    {
      id: 'dashboard',
      label: t('navDashboard'),
      icon: LayoutDashboard,
      highlight: true
    },
    {
      id: 'fields',
      label: t('navFields'),
      icon: Sprout,
      badge: `${highRiskCount} ${t('Risk')}`,
      badgeColor: 'bg-amber-100 text-amber-800'
    },
    {
      id: 'simulator',
      label: t('navSimulator'),
      icon: Droplets,
      badge: t('Signature'),
      badgeColor: 'bg-sky-100 text-sky-800 font-bold',
      highlight: true
    },
    { id: 'explanation', label: t('navExplanation'), icon: HelpCircle, badge: t('Explainable') },
    {
      id: 'sensors',
      label: t('navSensors'),
      icon: Activity,
      badge: tomatoAnomalyActive ? t('Anomaly!') : t('Verified'),
      badgeColor: tomatoAnomalyActive ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'
    },
    { id: 'crops', label: t('navCrops'), icon: HeartPulse },
    { id: 'weather', label: t('navWeather'), icon: CloudRain },
    { id: 'recommendations', label: t('navRecommendations'), icon: ListChecks },
    { id: 'whatif', label: t('navWhatIf'), icon: GitFork, badge: t('Constraints') },
    { id: 'settings', label: t('navSettings'), icon: Settings }
  ];

  const handleNavClick = (id: AppPage) => {
    setActivePage(id);
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-stone-900/50 backdrop-blur-xs lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-16 bottom-0 left-0 z-40 w-64 bg-white border-r border-stone-200 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Farm Profile Header Card */}
        <div className="p-4 border-b border-stone-100 bg-stone-50/70">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white flex items-center justify-center font-bold text-base shadow-xs">
              GV
            </div>
            <div className="min-w-0 flex-1">
              <h4 className="text-sm font-bold text-stone-900 truncate">
                {t('greenValleyFarm')}
              </h4>
              <p className="text-xs text-stone-500 truncate">{t('demoFarm')} • Zone 4</p>
            </div>
          </div>
          <div className="mt-2.5 flex items-center justify-between text-[11px] text-stone-600 font-medium bg-white p-2 rounded-lg border border-stone-200">
            <span>{t('Water Available')}</span>
            <span className="font-bold text-sky-700">{availableWater.toLocaleString()} L</span>
          </div>
        </div>

        {/* Navigation list */}
        <nav className="flex-1 overflow-y-auto p-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activePage === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-emerald-800 text-white shadow-xs shadow-emerald-900/20'
                    : 'text-stone-700 hover:bg-stone-100 hover:text-stone-900'
                }`}
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <Icon
                    className={`w-4 h-4 shrink-0 ${
                      isActive ? 'text-emerald-200' : 'text-stone-500'
                    }`}
                  />
                  <span className="truncate">{item.label}</span>
                </div>
                {item.badge && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full shrink-0 font-semibold ${
                      isActive ? 'bg-white/20 text-white' : item.badgeColor || 'bg-stone-100 text-stone-600'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Interactive Judge / Fault Injection Control Footer */}
        <div className="p-3 border-t border-stone-200 bg-stone-50 space-y-2">
          <div className="text-[11px] font-bold text-stone-700 uppercase tracking-wider flex items-center justify-between">
            <span>{t('Hackathon Quick-Inject')}</span>
            <span className="w-2 h-2 rounded-full bg-amber-500 animate-ping" />
          </div>

          <button
            onClick={() => setTomatoAnomalyActive(!tomatoAnomalyActive)}
            className={`w-full flex items-center justify-between p-2 rounded-xl text-xs border text-left transition-all ${
              tomatoAnomalyActive
                ? 'bg-rose-50 border-rose-300 text-rose-900'
                : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-100'
            }`}
          >
            <div className="flex items-center gap-2">
              <AlertTriangle
                className={`w-4 h-4 shrink-0 ${
                  tomatoAnomalyActive ? 'text-rose-600' : 'text-amber-500'
                }`}
              />
              <div className="leading-tight">
                <span className="font-semibold block text-[11px]">
                  {tomatoAnomalyActive ? t('Fault: Tomato 85%') : t('Simulate Fault')}
                </span>
                <span className="text-[10px] text-stone-500">
                  {tomatoAnomalyActive ? t('Anomaly Flagged') : t('Send bad sensor data')}
                </span>
              </div>
            </div>
            <span
              className={`text-[10px] font-bold px-1.5 py-0.5 rounded-sm ${
                tomatoAnomalyActive ? 'bg-rose-200 text-rose-900' : 'bg-stone-200 text-stone-700'
              }`}
            >
              {tomatoAnomalyActive ? t('ACTIVE') : t('OFF')}
            </span>
          </button>
        </div>
      </aside>
    </>
  );
};
