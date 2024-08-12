'use client';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link';
import { toggleSidebar } from '@/store/themeConfigSlice';
import AnimateHeight from 'react-animate-height';
import { useState, useEffect } from 'react';
import IconCaretsDown from '@/components/icon/icon-carets-down';
import IconMenuDashboard from '@/components/icon/menu/icon-menu-dashboard';
import IconCaretDown from '@/components/icon/icon-caret-down';
import IconMinus from '@/components/icon/icon-minus';
import IconMenuChat from '@/components/icon/menu/icon-menu-chat';
import IconMenuInvoice from '@/components/icon/menu/icon-menu-invoice';
import { usePathname } from 'next/navigation';
import { getTranslation } from '@/i18n';
import Image from 'next/image';
import { RootState } from '@/redux/store';

const Sidebar = () => {
  const dispatch = useDispatch();
  const { t } = getTranslation();
  const pathname = usePathname();
  const [currentMenu, setCurrentMenu] = useState<string>('');
  const [errorSubMenu, setErrorSubMenu] = useState(false);
  const themeConfig = useSelector((state: RootState) => state.themeConfig);
  const semidark = useSelector((state: RootState) => state.themeConfig.semidark);
  const toggleMenu = (value: string) => {
    setCurrentMenu((oldValue) => {
      return oldValue === value ? '' : value;
    });
  };

  useEffect(() => {
    const selector = document.querySelector('.sidebar ul a[href="' + window?.location.pathname + '"]');
    if (selector) {
      selector.classList.add('active');
      const ul: any = selector.closest('ul.sub-menu');
      if (ul) {
        let ele: any = ul.closest('li.menu').querySelectorAll('.nav-link') || [];
        if (ele.length) {
          ele = ele[0];
          setTimeout(() => {
            ele.click();
          });
        }
      }
    }
  }, []);

  useEffect(() => {
    setActiveRoute();
    if (window.innerWidth < 1024 && themeConfig.sidebar) {
      dispatch(toggleSidebar());
    }
  }, [dispatch, pathname, themeConfig.sidebar]);

  const setActiveRoute = () => {
    let allLinks = document.querySelectorAll('.sidebar ul a.active');
    for (let i = 0; i < allLinks.length; i++) {
      const element = allLinks[i];
      element?.classList.remove('active');
    }
    const selector = document.querySelector('.sidebar ul a[href="' + window?.location?.pathname + '"]');
    selector?.classList.add('active');
  };

  return (
    <div className={semidark ? 'dark' : ''}>
      <nav className={`sidebar fixed bottom-0 top-0 z-50 h-full min-h-screen w-[260px] shadow-[5px_0_25px_0_rgba(94,92,154,0.1)] transition-all duration-300 ${semidark ? 'text-white-dark' : ''}`}>
        <div className="h-full bg-white dark:bg-black">
          <div className="flex items-center justify-between px-4 py-3">
            <Link href="/" className="main-logo flex shrink-0 items-center">
              <Image width="100" height="100" className="ml-[5px] w-8 flex-none" src="/assets/images/logo.svg" alt="logo" />
              <span className="align-middle text-2xl font-semibold dark:text-white-light lg:inline ltr:ml-1.5 rtl:mr-1.5">RMV</span>
            </Link>

            <button
              type="button"
              className="collapse-icon flex h-8 w-8 items-center rounded-full transition duration-300 hover:bg-gray-500/10 dark:text-white-light dark:hover:bg-dark-light/10 rtl:rotate-180"
              onClick={() => dispatch(toggleSidebar())}
            >
              <IconCaretsDown className="m-auto rotate-90" />
            </button>
          </div>
          <PerfectScrollbar className="relative h-[calc(100vh-80px)]">
            <ul className="relative space-y-0.5 p-4 py-0 font-semibold">
              <li className="menu nav-item">
                <button type="button" className={`${currentMenu === 'dashboard' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('dashboard')}>
                  <div className="flex items-center">
                    <IconMenuDashboard className="shrink-0 group-hover:!text-primary" />
                    <span className="text-black dark:text-[#506690] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3">{t('dashboard')}</span>
                  </div>

                  <div className={currentMenu !== 'dashboard' ? '-rotate-90 rtl:rotate-90' : ''}>
                    <IconCaretDown />
                  </div>
                </button>

                <AnimateHeight duration={300} height={currentMenu === 'dashboard' ? 'auto' : 0}>
                  <ul className="sub-menu text-gray-500">
                    <li>
                      <Link href="/">{t('sales')}</Link>
                    </li>
                    <li>
                      <Link href="/analytics">{t('analytics')}</Link>
                    </li>
                    <li>
                      <Link href="/finance">{t('finance')}</Link>
                    </li>
                    <li>
                      <Link href="/crypto">{t('crypto')}</Link>
                    </li>
                  </ul>
                </AnimateHeight>
              </li>

              <h2 className="-mx-4 mb-1 flex items-center bg-white-light/30 px-7 py-3 font-extrabold uppercase dark:bg-dark dark:bg-opacity-[0.08]">
                <IconMinus className="hidden h-5 w-4 flex-none" />
                <span>{t('apps')}</span>
              </h2>

              <li className="nav-item">
                <ul>
                  <li className="nav-item">
                    <Link href="/apps/chat" className="group">
                      <div className="flex items-center">
                        <IconMenuChat className="shrink-0 group-hover:!text-primary" />
                        <span className="text-black dark:text-[#506690] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3">{t('chat')}</span>
                      </div>
                    </Link>
                  </li>

                  <li className="menu nav-item">
                    <button type="button" className={`${currentMenu === 'user' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('user')}>
                      <div className="flex items-center">
                        <IconMenuInvoice className="shrink-0 group-hover:!text-primary" />
                        <span className="text-black dark:text-[#506690] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3">{t('user')}</span>
                      </div>

                      <div className={currentMenu !== 'user' ? '-rotate-90 rtl:rotate-90' : ''}>
                        <IconCaretDown />
                      </div>
                    </button>

                    <AnimateHeight duration={300} height={currentMenu === 'user' ? 'auto' : 0}>
                      <ul className="sub-menu text-gray-500">
                        <li>
                          <Link href="/dashboard/user/add">{t('add')}</Link>
                        </li>
                        <li>
                          <Link href="/dashboard/user/list">{t('list')}</Link>
                        </li>
                        <li>
                          <Link href="/dashboard/user/assign">{t('assign')}</Link>
                        </li>
                      </ul>
                    </AnimateHeight>
                  </li>

                  <li className="menu nav-item">
                    <button type="button" className={`${currentMenu === 'Category' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('Category')}>
                      <div className="flex items-center">
                        <IconMenuInvoice className="shrink-0 group-hover:!text-primary" />
                        <span className="text-black dark:text-[#506690] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3">{t('Category')}</span>
                      </div>

                      <div className={currentMenu !== 'Category' ? '-rotate-90 rtl:rotate-90' : ''}>
                        <IconCaretDown />
                      </div>
                    </button>

                    <AnimateHeight duration={300} height={currentMenu === 'Category' ? 'auto' : 0}>
                      <ul className="sub-menu text-gray-500">
                        <li>
                          <Link href="/dashboard/category/add">{t('add')}</Link>
                        </li>
                        <li>
                          <Link href="/dashboard/category/list">{t('list')}</Link>
                        </li>
                      </ul>
                    </AnimateHeight>
                  </li>

                  <li className="menu nav-item">
                    <button type="button" className={`${currentMenu === 'orders' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('orders')}>
                      <div className="flex items-center">
                        <IconMenuInvoice className="shrink-0 group-hover:!text-primary" />
                        <span className="text-black dark:text-[#506690] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3">{t('Orders')}</span>
                      </div>

                      <div className={currentMenu !== 'orders' ? '-rotate-90 rtl:rotate-90' : ''}>
                        <IconCaretDown />
                      </div>
                    </button>

                    <AnimateHeight duration={300} height={currentMenu === 'orders' ? 'auto' : 0}>
                      <ul className="sub-menu text-gray-500">
                        <li>
                          <Link href="/orders/add-order">{t('Add-Order')}</Link>
                        </li>
                        <li>
                          <Link href="/orders/list">{t('list')}</Link>
                        </li>
                      </ul>
                    </AnimateHeight>
                  </li>

                  <li className="menu nav-item">
                    <button type="button" className={`${currentMenu === 'product' ? 'active' : ''} nav-link group w-full`} onClick={() => toggleMenu('product')}>
                      <div className="flex items-center">
                        <IconMenuInvoice className="shrink-0 group-hover:!text-primary" />
                        <span className="text-black dark:text-[#506690] dark:group-hover:text-white-dark ltr:pl-3 rtl:pr-3">{t('product')}</span>
                      </div>

                      <div className={currentMenu !== 'product' ? '-rotate-90 rtl:rotate-90' : ''}>
                        <IconCaretDown />
                      </div>
                    </button>

                    <AnimateHeight duration={300} height={currentMenu === 'product' ? 'auto' : 0}>
                      <ul className="sub-menu text-gray-500">
                        <li>
                          <Link href="/product/add">{t('add')}</Link>
                        </li>
                        <li>
                          <Link href="/dashboard/product/list">{t('list')}</Link>
                        </li>
                      </ul>
                    </AnimateHeight>
                  </li>
                </ul>
              </li>
            </ul>
          </PerfectScrollbar>
        </div>
      </nav>
    </div>
  );
};

export default Sidebar;
