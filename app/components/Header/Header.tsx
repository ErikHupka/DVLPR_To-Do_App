import React from 'react';
import Link from 'next/link';

const Header: React.FC = () => {

    return (
    <header className="navbar bg-base-100 px-4 py-1">


      {/** Title */}


      <div className="navbar bg-base-100 p-0">
        <div className="flex-1">
          <Link href="/" className="btn btn-ghost pl-2 normal-case text-3xl font-light text-base-content">DVLPR To-Do App</Link>
      </div>

      {/** Navigatio Menu - DropDown */}


      <div className="dropdown dropdown-hover dropdown-end z-10">
        <label tabIndex={0} className="btn btn-sm btn-primary">Menu</label>
          <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-200 text-base-content rounded-box w-52">
            <li><Link href="/" prefetch>To-Do</Link></li>
            <li><Link href="/about" prefetch>About</Link></li>
            <li><Link href="/settings" prefetch>Settings</Link></li>
            <li><Link href="/feedback" prefetch>Feedback</Link></li>
          </ul>
        </div>
      </div>
    </header>
    )
};

export default Header;