'use client'
import { BusinessCenterOutlined } from '@mui/icons-material'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
function Header({ children }) {
    const pathname = usePathname().replace(/^\/+/, '')
    const navLinks = ['dakiyboard', 'project-documents', 'project-schedule',
        'project-team',
        'project-logs',
        'project-finances',
        'project-reports',
        'all-jobs',
        'project-settings']
    return (
        <header className={pathname === 'dakiyboard' ? "md:hidden" : ""}>
            <div className="drawer z-50 font-Poppins">
                <input id="my-drawer-3" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col">
                    {/* Navbar */}
                    <div className="navbar w-full bg-base-300">
                        <div className="flex-none lg:hidden">
                            <label htmlFor="my-drawer-3" className="btn btn-square btn-ghost">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block h-6 w-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                            </label>
                        </div>
                        <div className="mx-2 flex-1 px-2 font-semibold uppercase">{pathname}</div>
                        <div className="hidden flex-none lg:block">
                            <ul className="menu menu-horizontal">
                                {/* Navbar menu content here */}
                                {navLinks.map((link) => (
                                    <li className={`capitalize ${pathname === link ? "hidden" : "block"}`} key={link}><Link href={`/${link}`}>{link}</Link></li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    {/* Page content here */}
                    {children}
                </div>
                <div className="drawer-side">
                    <label htmlFor="my-drawer-3" className="drawer-overlay"></label>
                    <ul className="menu h-full w-80 bg-base-200 p-4">
                        {/* Sidebar content here */}
                        {navLinks.map((link) => (
                            <li className="capitalize" key={link}><Link href={`/${link}`}>{link}</Link></li>
                        ))}
                        <li><div className='my-3 h-[0.2px] w-full bg-primary-content' /></li>
                        <li>
                            <Image
                                className="h-20 w-full object-cover"
                                src='/logo.png'
                                width={200}
                                quality={100}
                                height={60}
                                loading="lazy"
                                alt="logo"
                            />
                        </li>
                        <li>
                            <button className='btn btn-primary'><BusinessCenterOutlined /> + Add jobs</button>
                        </li>
                    </ul>

                </div>
            </div>
        </header >
    )
}

export default Header
