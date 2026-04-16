import type { FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export function LoginPage() {
  const navigate = useNavigate()

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    navigate('/')
  }

  return (
    <div className="min-h-screen grid grid-cols-1 justify-items-center bg-black overflow-hidden relative text-slate-50">
      <div className="w-full max-w-[980px] bg-transparent z-10 flex flex-col items-center justify-center">
        {/* Login Hero Section - Abstracted */}
        <div className="p-12 pb-8 flex flex-col justify-center items-center gap-4 text-center">
          <h1 className="text-[clamp(1.75rem,4vw,2.5rem)] text-white m-0 mb-4 tracking-tight font-bold">Đăng nhập cục bộ</h1>
          <p className="m-0 text-base leading-relaxed text-slate-50/90 max-w-[680px]">
            Chào mừng bạn đến với Hệ thống khảo sát môn học. Vui lòng đăng nhập để tiếp tục.
          </p>
        </div>

        {/* Login Panel */}
        <div className="flex items-center justify-center p-[2rem_1.5rem_3rem] w-full">
          <div className="grid gap-6 w-full max-w-[520px] grid-cols-1">
            <div className="w-full rounded-2xl bg-[#090a0e] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.35)] p-8">
              <div className="mb-7">
                <h2 className="text-[1.35rem] m-0 mb-1.5 font-medium text-white">Đăng nhập</h2>
                <p className="m-0 text-[0.92rem] text-slate-400">Nhập email và mật khẩu để vào hệ thống.</p>
              </div>
              <form onSubmit={handleSubmit} noValidate>
                <div className="mb-4">
                  <label htmlFor="login-email" className="block text-[0.82rem] font-medium text-white mb-1.5">Email</label>
                  <input
                    id="login-email"
                    name="email"
                    type="email"
                    autoComplete="username"
                    placeholder="ban@truong.edu.vn"
                    required
                    className="w-full box-border px-[0.85rem] py-[0.65rem] rounded-lg border border-white/10 bg-gray-900 text-slate-50 font-inherit text-[0.95rem] transition-all focus:outline-none focus:border-indigo-500 focus:ring-[3px] focus:ring-indigo-500/20"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="login-password" className="block text-[0.82rem] font-medium text-white mb-1.5">Mật khẩu</label>
                  <input
                    id="login-password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    placeholder="••••••••"
                    required
                    className="w-full box-border px-[0.85rem] py-[0.65rem] rounded-lg border border-white/10 bg-gray-900 text-slate-50 font-inherit text-[0.95rem] transition-all focus:outline-none focus:border-indigo-500 focus:ring-[3px] focus:ring-indigo-500/20"
                  />
                </div>
                <div className="flex items-center justify-between gap-3 mb-5 flex-wrap">
                  <label className="flex items-center gap-[0.45rem] text-[0.85rem] text-slate-400 cursor-pointer select-none">
                    <input type="checkbox" name="remember" defaultChecked className="w-4 h-4 accent-indigo-500" />
                    Ghi nhớ đăng nhập
                  </label>
                  <Link className="text-[0.85rem] text-indigo-400 no-underline font-medium hover:underline" to="/login/forgot">
                    Quên mật khẩu?
                  </Link>
                </div>
                <button type="submit" className="w-full py-3 px-4 border-none rounded-lg bg-gradient-to-br from-indigo-500 to-indigo-600 text-white font-inherit text-[0.95rem] font-semibold cursor-pointer shadow-md transition-all hover:brightness-110 active:scale-95">
                  Đăng nhập
                </button>
              </form>
              <p className="mt-6 text-center text-[0.88rem] text-slate-400">
                <Link to="/" className="text-indigo-400 font-medium no-underline hover:underline">← Về trang chức năng</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Background Decor */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 80% 60% at 20% 20%, rgba(99, 102, 241, 0.15), transparent 55%), linear-gradient(155deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)'
      }} />
    </div>
  )
}
