import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  LogIn,
  UserCog,
  BookOpen,
  CalendarDays,
  ClipboardCheck,
  ListChecks,
  Shield,
  RefreshCw,
  Award,
  PieChart,
  FileBarChart,
  UserCheck,
  Download,
  Sliders,
  Building2,
  LogOut,
  User,
  AlertCircle,
  X,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { BusinessFunctionCard } from '../components/BusinessFunctionCard'
import { useAuth } from '../contexts/AuthContext'

type Tile = {
  id: string
  title: string
  description: string
  color: string
  path: string
  public?: boolean
  Icon: LucideIcon
}

const allTiles: Tile[] = [
  {
    id: 'login',
    title: 'Đăng nhập hệ thống',
    description: 'Chọn loại tài khoản và đăng nhập',
    color: '#3B82F6',
    path: '/login',
    public: true,
    Icon: LogIn,
  },
  {
    id: 'users',
    title: 'Quản lý tài khoản người dùng',
    description: 'Quản lý thông tin người dùng',
    color: '#8B5CF6',
    path: '/users',
    Icon: UserCog,
  },
  {
    id: 'subjects',
    title: 'Quản lý danh sách môn học',
    description: 'Quản lý các môn học trong chương trình',
    color: '#10B981',
    path: '/subjects',
    Icon: BookOpen,
  },
  {
    id: 'semester',
    title: 'Quản lý học kỳ',
    description: 'Quản lý thông tin học kỳ và năm học',
    color: '#F59E0B',
    path: '/semesters',
    Icon: CalendarDays,
  },
  {
    id: 'survey-run',
    title: 'Thực hiện khảo sát môn học',
    description: 'Khảo sát đánh giá chất lượng môn học',
    color: '#EF4444',
    path: '/survey',
    Icon: ClipboardCheck,
  },
  {
    id: 'subjects-eval',
    title: 'Xem danh sách môn học cần đánh giá',
    description: 'Danh sách các môn học cần khảo sát',
    color: '#06B6D4',
    path: '/subjects-to-evaluate',
    Icon: ListChecks,
  },
  {
    id: 'survey-status',
    title: 'Kiểm tra trạng thái khảo sát',
    description: 'Theo dõi tiến độ thực hiện khảo sát',
    color: '#14B8A6',
    path: '/survey-status',
    Icon: Shield,
  },
  {
    id: 'update',
    title: 'Cập nhật thông tin cá nhân',
    description: 'Cập nhật thông tin hệ thống',
    color: '#F97316',
    path: '/update-info',
    Icon: RefreshCw,
  },
  {
    id: 'results',
    title: 'Xem kết quả đánh giá môn học',
    description: 'Kết quả đánh giá chi tiết môn học',
    color: '#EC4899',
    path: '/evaluation-results',
    Icon: Award,
  },
  {
    id: 'feedback-stats',
    title: 'Xem thống kê phản hồi sinh viên',
    description: 'Thống kê và phân tích phản hồi',
    color: '#6366F1',
    path: '/feedback-statistics',
    Icon: PieChart,
  },
  {
    id: 'report-subject',
    title: 'Xem báo cáo theo môn học',
    description: 'Báo cáo chi tiết từng môn học',
    color: '#84CC16',
    path: '/reports/subject',
    Icon: FileBarChart,
  },
  {
    id: 'report-lecturer',
    title: 'Xem báo cáo theo giảng viên',
    description: 'Báo cáo đánh giá theo giảng viên',
    color: '#64748B',
    path: '/reports/teacher',
    Icon: UserCheck,
  },
  {
    id: 'export',
    title: 'Xuất báo cáo',
    description: 'Tải xuống báo cáo dưới dạng file',
    color: '#22C55E',
    path: '/export-report',
    Icon: Download,
  },
  {
    id: 'survey-config',
    title: 'Quản lý khảo sát',
    description: 'Quản lý cấu hình và nội dung khảo sát',
    color: '#A855F7',
    path: '/survey-management',
    Icon: Sliders,
  },
  {
    id: 'school-report',
    title: 'Xem báo cáo tổng hợp toàn trường',
    description: 'Báo cáo tổng hợp cấp trường',
    color: '#0EA5E9',
    path: '/reports/school',
    Icon: Building2,
  },
]

const roleLabels: Record<string, string> = {
  student: 'Sinh viên',
  lecturer: 'Giảng viên',
  department: 'Khoa',
  academic_affairs: 'Phòng Đào tạo',
  admin: 'Quản trị viên',
}

export function DashboardPage() {
  const navigate = useNavigate()
  const { user, logout, hasPermission } = useAuth()
  const [showLoginModal, setShowLoginModal] = useState(false)

  const visibleTiles = user
    ? allTiles.filter((t) => t.path !== '/login' && (t.public || hasPermission(t.path)))
    : allTiles

  const handleClick = (path: string, isPublic?: boolean) => {
    if (path === '/login') {
      navigate('/login')
      return
    }
    if (!user && !isPublic) {
      setShowLoginModal(true)
      return
    }
    navigate(path)
  }

  const handleLogout = () => {
    if (window.confirm('Bạn có chắc chắn muốn đăng xuất?')) {
      logout()
      navigate('/')
    }
  }

  return (
    <div className="relative">
      <div className="mb-10">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-3 m-0">Hệ thống khảo sát môn học</h1>
            <p className="text-gray-600 text-lg m-0">Chọn chức năng để bắt đầu làm việc</p>
          </div>
          {user && (
            <div className="flex items-center gap-4 shrink-0">
              <div className="text-right">
                <div className="flex items-center justify-end gap-2 text-gray-900 font-semibold">
                  <User className="w-5 h-5" />
                  <span>{user.fullName}</span>
                </div>
                <div className="text-sm text-gray-600">
                  {roleLabels[user.role] ?? user.role}
                  {user.department ? ` — ${user.department}` : ''}
                </div>
              </div>
              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
              >
                <LogOut className="w-5 h-5" />
                Đăng xuất
              </button>
            </div>
          )}
        </div>



        {user && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-blue-900 m-0">
              <span className="font-semibold">Chào mừng!</span> Bạn đang dùng hệ thống với vai trò{' '}
              <span className="font-semibold">{roleLabels[user.role]}</span>. Chỉ các chức năng được phân quyền mới hiển thị
              bên dưới.
            </p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {visibleTiles.map((tile) => (
          <BusinessFunctionCard
            key={tile.id}
            icon={tile.Icon}
            title={tile.title}
            description={tile.description}
            color={tile.color}
            onClick={() => handleClick(tile.path, tile.public)}
          />
        ))}
      </div>

      {showLoginModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-amber-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 m-0">Yêu cầu đăng nhập</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowLoginModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1"
                aria-label="Đóng"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <p className="text-gray-600 mb-6 m-0">
              Bạn cần đăng nhập để sử dụng chức năng này. Hãy chọn loại tài khoản và nhập thông tin phù hợp.
            </p>
            <div className="flex gap-3 flex-wrap">
              <button
                type="button"
                onClick={() => {
                  setShowLoginModal(false)
                  navigate('/login')
                }}
                className="flex-1 min-w-[120px] px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Đăng nhập ngay
              </button>
              <button
                type="button"
                onClick={() => setShowLoginModal(false)}
                className="flex-1 min-w-[120px] px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
              >
                Hủy
              </button>
            </div>
          </div>
        </div>
      )}

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
