import { Link } from 'react-router-dom';
import { Icon } from '../icons';

export function NavigationLogo() {
  return (
    <Link to="/" className="flex items-center">
      <Icon name="Package" size="lg" className="text-indigo-600" />
      <span className="ml-2 text-xl font-bold text-gray-900">
        HydroPro
      </span>
    </Link>
  );
}