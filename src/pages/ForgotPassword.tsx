import { Link } from 'react-router-dom'

export function ForgotPassword() {
  return (
    <div className="min-h-screen grid grid-cols-1 justify-items-center bg-black overflow-hidden relative text-slate-50">
      <div className="w-full max-w-[980px] bg-transparent z-10 flex flex-col items-center justify-center">
        <div className="p-12 pb-8 flex flex-col justify-center items-center gap-4 text-center">
          <h1 className="text-[clamp(1.75rem,4vw,2.5rem)] text-white m-0 mb-4 tracking-tight font-bold">Hệ thống khảo sát môn học</h1>
          <p className="m-0 text-base leading-relaxed text-slate-50/90 max-w-[680px]">
            Lưới chức năng và báo cáo thống nhất — đăng nhập để quản lý khảo sát, người dùng và học kỳ.
          </p>
        </div>

        <div className="flex items-center justify-center p-[2rem_1.5rem_3rem] w-full">
          <div className="grid gap-6 w-full max-w-[520px] grid-cols-1">
            <div className="w-full rounded-2xl bg-[#090a0e] border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.35)] p-8 text-left">
              <div className="mb-7">
                <h2 className="text-[1.35rem] m-0 mb-1.5 font-medium text-white">Lấy lại mật khẩu</h2>
                <p className="m-0 text-[0.92rem] text-slate-400">Chọn hình thức nhận mã xác minh và nhập thông tin tài khoản.</p>
              </div>
              <form onSubmit={(e) => e.preventDefault()} noValidate>
                <div className="mb-4">
                  <label htmlFor="reset-method" className="block text-[0.82rem] font-medium text-white mb-1.5">Hình thức gửi mã xác minh</label>
                  <select 
                    id="reset-method" 
                    name="resetMethod" 
                    defaultValue="email"
                    className="appearance-none w-full box-border px-[0.85rem] py-[0.65rem] rounded-lg border border-white/10 bg-gray-900 text-slate-50 font-inherit text-[0.95rem] transition-all focus:outline-none focus:border-indigo-500 focus:ring-[3px] focus:ring-indigo-500/20"
                    style={{
                      backgroundImage: 'linear-gradient(45deg, transparent 50%, #9ca3af 50%), linear-gradient(135deg, #9ca3af 50%, transparent 50%)',
                      backgroundPosition: 'calc(100% - 1rem) calc(50% - 0.15rem), calc(100% - 0.65rem) calc(50% - 0.15rem)',
                      backgroundRepeat: 'no-repeat',
                      backgroundSize: '0.45rem 0.45rem'
                    }}
                  >
                    <option value="email">Qua Email</option>
                    <option value="phone">Qua SMS</option>
                  </select>
                </div>
                <div className="mb-4">
                  <label htmlFor="reset-account" className="block text-[0.82rem] font-medium text-white mb-1.5">Mã tài khoản</label>
                  <input
                    id="reset-account"
                    name="accountId"
                    type="text"
                    placeholder="Nhập mã tài khoản"
                    required
                    className="w-full box-border px-[0.85rem] py-[0.65rem] rounded-lg border border-white/10 bg-gray-900 text-slate-50 font-inherit text-[0.95rem] transition-all focus:outline-none focus:border-indigo-500 focus:ring-[3px] focus:ring-indigo-500/20"
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="reset-email" className="block text-[0.82rem] font-medium text-white mb-1.5">Email đã đăng ký trong hệ thống</label>
                  <input
                    id="reset-email"
                    name="resetEmail"
                    type="email"
                    placeholder="ban@truong.edu.vn"
                    required
                    className="w-full box-border px-[0.85rem] py-[0.65rem] rounded-lg border border-white/10 bg-gray-900 text-slate-50 font-inherit text-[0.95rem] transition-all focus:outline-none focus:border-indigo-500 focus:ring-[3px] focus:ring-indigo-500/20"
                  />
                </div>
                <button type="submit" className="w-full py-3 px-4 rounded-lg bg-transparent border border-indigo-500 text-white font-inherit text-[0.95rem] font-semibold cursor-pointer shadow-md transition-all hover:bg-indigo-500/20 active:scale-95 mt-2">
                  Gửi
                </button>
              </form>
              <p className="mt-4 text-center text-[0.82rem] text-slate-400">
                <Link to="/login" className="text-indigo-400 font-medium no-underline hover:underline">← Quay lại đăng nhập</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse 80% 60% at 20% 20%, rgba(99, 102, 241, 0.15), transparent 55%), linear-gradient(155deg, #0f172a 0%, #1e1b4b 50%, #312e81 100%)'
      }} />
    </div>
  )
}
