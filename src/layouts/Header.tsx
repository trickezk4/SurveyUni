import { NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export function Header() {
  const { user, logout } = useAuth()

  return (
    <div className="flex flex-col min-h-screen bg-[#eef1f5]">
      <header className="sticky top-0 z-10 flex items-center gap-4 px-5 py-3 border-b border-gray-200 bg-white">
        <NavLink to="/" className="flex items-center gap-2.5 text-black no-underline" title="Trang chủ">
          <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-[#3b82f6] to-[#2563eb] shadow-md shadow-blue-500/35 text-white text-[0.85rem] font-bold">H</span>
          <span className="font-semibold text-[0.95rem] text-[#1e3a5f] max-w-[min(280px,50vw)] leading-snug hidden sm:block">Hệ thống khảo sát môn học</span>
        </NavLink>
        <div className="flex-1" />
        {user ? (
          <div className="flex items-center gap-3">
            <span className="text-[0.85rem] text-gray-600 max-w-[min(200px,40vw)] truncate hidden sm:inline" title={user.fullName}>
              {user.fullName}
            </span>
            <button
              type="button"
              onClick={() => logout()}
              className="text-[0.9rem] font-medium text-red-600 px-3 py-1.5 rounded-md hover:bg-red-50 transition-colors border-none bg-transparent cursor-pointer"
            >
              Đăng xuất
            </button>
          </div>
        ) : (
          <NavLink to="/login" className="text-[0.9rem] font-medium text-blue-600 no-underline px-3 py-1.5 rounded-md hover:bg-[#eff6ff] transition-colors">
            Đăng nhập
          </NavLink>
        )}
      </header>

      <main className="flex-1 p-[1.75rem_1.25rem_3rem] max-w-[1180px] mx-auto w-full box-border">
        <Outlet />
      </main>
    </div>
  )
}
