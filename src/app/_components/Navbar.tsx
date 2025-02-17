'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  HomeIcon,
  HomeIconActive,
  ReportIcon,
  ReportIconActive,
  ChatIcon,
  ChatIconActive,
  MyPageIcon,
  MyPageIconActive,
} from '../assets';
import Home from '../(route)/(home)/page';

export const Navbar = () => {
  const pathname = usePathname();

  const navItems = [
    {
      href: '/landing',
      label: '홈',
      icon: (isActive: boolean) =>
        isActive ? <HomeIconActive /> : <HomeIcon />,
    },
    {
      href: '/report',
      label: '제보',
      icon: (isActive: boolean) =>
        isActive ? <ReportIconActive /> : <ReportIcon />,
    },
    {
      href: '/mypage',
      label: '마이페이지',
      icon: (isActive: boolean) =>
        isActive ? <MyPageIconActive /> : <MyPageIcon />,
    },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full flex justify-center z-50">
      <nav className="max-w-[430px] w-full bg-white shadow-lg  pt-3 rounded-t-3xl border-gray-200">
        <div className="flex justify-around items-center h-16">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center ${
                item.href === '/report' ? 'pl-5' : 'pl-1'
              }`}
            >
              {item.icon(pathname === item.href)}
              <span
                className={`text-xs mt-1 ${
                  pathname === item.href
                    ? 'text-gray-700 font-semibold'
                    : 'text-gray-700'
                }`}
              >
                {item.label}
              </span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
};
