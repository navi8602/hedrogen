import { Link, useLocation } from 'react-router-dom';
import { NotificationCenter } from '../notifications/NotificationCenter';

export function Navigation() {
  const location = useLocation();

  const navigation = [
    { name: 'Дашборд', href: '/' },
    { name: 'Системы', href: '/systems' },
    { name: 'Растения', href: '/plants' },
    { name: 'Профиль', href: '/profile' }
  ];

  return (
    <header className="bg-white shadow">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold text-gray-900">
                HydroPro
              </span>
            </Link>

            <nav className="ml-10 flex space-x-4">
              {navigation.map(({ name, href }) => (
                <Link
                  key={name}
                  to={href}
                  className={`
                    flex items-center px-3 py-2 rounded-md text-sm font-medium
                    ${location.pathname === href
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'}
                  `}
                >
                  {name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center">
            <NotificationCenter />
          </div>
        </div>
      </div>
    </header>
  );
}