import type { ComponentType } from 'react'
import { Link } from 'react-router-dom'
import {
  IconAward,
  IconBook,
  IconCalendar,
  IconClipboardCheck,
  IconDownload,
  IconFileText,
  IconListChecks,
  IconLogin,
  IconPie,
  IconRefresh,
  IconSchoolReport,
  IconShield,
  IconSliders,
  IconUserCheck,
  IconUserCog,
} from '../components/Icon'

type Variant =
  | 'blue'
  | 'purple'
  | 'green'
  | 'amber'
  | 'red'
  | 'teal'
  | 'mint'
  | 'orange'
  | 'pink'
  | 'indigo'
  | 'lime'
  | 'gray'
  | 'greenDeep'
  | 'violet'
  | 'sky'

type Tile = {
  id: string
  label: string
  desc: string
  variant: Variant
  to?: string
  Icon: ComponentType<{ className?: string }>
}

const tiles: Tile[] = [
  {
    id: 'login',
    label: 'Đăng nhập hệ thống',
    desc: 'Đăng nhập vào hệ thống quản lý',
    variant: 'blue',
    to: '/login',
    Icon: IconLogin,
  },
  {
    id: 'users',
    label: 'Quản lý người dùng',
    desc: 'Phân quyền và tài khoản',
    variant: 'purple',
    to: '/users',
    Icon: IconUserCog,
  },
  {
    id: 'subjects',
    label: 'Quản lý danh sách môn học',
    desc: 'Thêm, sửa môn học',
    variant: 'green',
    Icon: IconBook,
  },
  {
    id: 'semester',
    label: 'Quản lý học kỳ',
    desc: 'Niên khóa và học kỳ',
    variant: 'amber',
    Icon: IconCalendar,
  },
  {
    id: 'survey-run',
    label: 'Thực hiện khảo sát',
    desc: 'Làm phiếu khảo sát',
    variant: 'red',
    Icon: IconClipboardCheck,
  },
  {
    id: 'subjects-eval',
    label: 'Xem môn học cần đánh giá',
    desc: 'Danh sách theo kỳ',
    variant: 'teal',
    Icon: IconListChecks,
  },
  {
    id: 'survey-status',
    label: 'Trạng thái khảo sát',
    desc: 'Theo dõi tiến độ',
    variant: 'mint',
    Icon: IconShield,
  },
  {
    id: 'update',
    label: 'Cập nhật thông hiện',
    desc: 'Hồ sơ và liên hệ',
    variant: 'orange',
    Icon: IconRefresh,
  },
  {
    id: 'results',
    label: 'Kết quả đánh giá',
    desc: 'Điểm và nhận xét',
    variant: 'pink',
    Icon: IconAward,
  },
  {
    id: 'feedback-stats',
    label: 'Thống kê phản hồi',
    desc: 'Tổng hợp phản hồi',
    variant: 'indigo',
    Icon: IconPie,
  },
  {
    id: 'report-subject',
    label: 'Báo cáo theo môn học',
    desc: 'Theo từng học phần',
    variant: 'lime',
    Icon: IconFileText,
  },
  {
    id: 'report-lecturer',
    label: 'Báo cáo theo giảng viên',
    desc: 'Theo từng GV',
    variant: 'gray',
    Icon: IconUserCheck,
  },
  {
    id: 'export',
    label: 'Xuất báo cáo',
    desc: 'Tải xuống báo cáo dưới dạng file',
    variant: 'greenDeep',
    Icon: IconDownload,
  },
  {
    id: 'survey-config',
    label: 'Quản lý khảo sát',
    desc: 'Quản lý cấu hình và nội dung khảo sát',
    variant: 'violet',
    Icon: IconSliders,
  },
  {
    id: 'school-report',
    label: 'Xem báo cáo tổng hợp toàn trường',
    desc: 'Báo cáo tổng hợp cấp trường',
    variant: 'sky',
    Icon: IconSchoolReport,
  },
]

const variantStyles: Record<Variant, string> = {
  blue: 'bg-[#dbeafe] text-[#2563eb]',
  purple: 'bg-[#ede9fe] text-[#7c3aed]',
  green: 'bg-[#dcfce7] text-[#16a34a]',
  amber: 'bg-[#fef3c7] text-[#d97706]',
  red: 'bg-[#fee2e2] text-[#dc2626]',
  teal: 'bg-[#ccfbf1] text-[#0d9488]',
  mint: 'bg-[#d1fae5] text-[#059669]',
  orange: 'bg-[#ffedd5] text-[#ea580c]',
  pink: 'bg-[#fce7f3] text-[#db2777]',
  indigo: 'bg-[#e0e7ff] text-[#4f46e5]',
  lime: 'bg-[#ecfccb] text-[#65a30d]',
  gray: 'bg-[#f3f4f6] text-[#4b5563]',
  greenDeep: 'bg-[#dcfce7] text-[#15803d]',
  violet: 'bg-[#f3e8ff] text-[#9333ea]',
  sky: 'bg-[#e0f2fe] text-[#0284c7]',
}

export function DashboardPage() {
  return (
    <div className="relative">
      <header className="mb-7">
        <h1 className="text-[clamp(1.5rem,3vw,1.85rem)] font-bold text-slate-900 tracking-[-0.03em] m-0 mb-2">Hệ thống khảo sát môn học</h1>
        <p className="text-base text-slate-500 m-0">Chọn chức năng để bắt đầu làm việc</p>
      </header>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[1.15rem]">
        {tiles.map((t) => {
          const { Icon } = t
          const body = (
            <>
              <span className={`w-11 h-11 rounded-lg flex items-center justify-center shrink-0 text-xl font-bold ${variantStyles[t.variant]}`}>
                <Icon className="w-[1.35rem] h-[1.35rem]" />
              </span>
              <span className="text-[0.92rem] font-semibold text-slate-900 leading-snug">{t.label}</span>
              <span className="text-[0.8rem] text-slate-500 leading-snug">{t.desc}</span>
            </>
          )
          const cls = 'flex flex-col items-start text-left gap-3 p-[1.2rem_1.05rem] rounded-2xl border border-[#e8eaef] bg-white shadow-[0_1px_2px_rgba(15,23,42,0.05),0_4px_14px_rgba(15,23,42,0.06)] no-underline text-inherit transition-all duration-150 hover:-translate-y-0.5 hover:border-blue-100 hover:shadow-[0_4px_6px_rgba(15,23,42,0.05),0_12px_28px_rgba(15,23,42,0.08)]'
          if (t.to) {
            return (
              <Link key={t.id} to={t.to} className={cls}>
                {body}
              </Link>
            )
          }
          return (
            <a key={t.id} href="#" className={cls} onClick={(e) => e.preventDefault()}>
              {body}
            </a>
          )
        })}
      </div>
      <button 
        type="button" 
        className="fixed bottom-5 right-5 w-10 h-10 rounded-full border-none bg-slate-700 hover:bg-slate-800 text-white text-[1.1rem] font-semibold flex items-center justify-center cursor-pointer shadow-[0_4px_14px_rgba(15,23,42,0.25)] z-30 transition-all duration-150 hover:scale-105" 
        title="Trợ giúp" 
        aria-label="Trợ giúp"
      >
        ?
      </button>
    </div>
  )
}
