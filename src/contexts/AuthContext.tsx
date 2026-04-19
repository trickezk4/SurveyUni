import { createContext, useContext, useState, useEffect, type ReactNode } from 'react'

export type UserRole = 'student' | 'lecturer' | 'department' | 'academic_affairs' | 'admin'

export interface AuthUser {
  id: number
  username: string
  fullName: string
  email: string
  role: UserRole
  department?: string
}

interface AuthContextType {
  user: AuthUser | null
  isAuthenticated: boolean
  login: (username: string, password: string, role: UserRole) => Promise<boolean>
  logout: () => void
  hasPermission: (path: string) => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const mockUsers: (AuthUser & { password: string })[] = [
  {
    id: 1,
    username: 'admin',
    password: 'admin123',
    fullName: 'Nguyễn Văn Admin',
    email: 'admin@uit.edu.vn',
    role: 'admin',
  },
  {
    id: 2,
    username: 'sv001',
    password: '123456',
    fullName: 'Trần Thị Hương',
    email: 'huong.tt@student.uit.edu.vn',
    role: 'student',
    department: 'Khoa CNTT',
  },
  {
    id: 3,
    username: 'gv001',
    password: '123456',
    fullName: 'PGS. Lê Văn Minh',
    email: 'minh.lv@uit.edu.vn',
    role: 'lecturer',
    department: 'Khoa CNTT',
  },
  {
    id: 4,
    username: 'khoa_cntt',
    password: '123456',
    fullName: 'Khoa Công nghệ Thông tin',
    email: 'cntt@uit.edu.vn',
    role: 'department',
    department: 'Khoa CNTT',
  },
  {
    id: 5,
    username: 'pdt001',
    password: '123456',
    fullName: 'Phòng Đào tạo',
    email: 'daotao@uit.edu.vn',
    role: 'academic_affairs',
  },
]

const rolePermissions: Record<UserRole, string[]> = {
  student: ['/subjects-to-evaluate', '/survey', '/survey-status', '/update-info'],
  lecturer: ['/evaluation-results', '/feedback-statistics', '/reports/subject', '/update-info'],
  department: ['/reports/subject', '/reports/teacher', '/export-report', '/reports/school'],
  academic_affairs: [
    '/survey-management',
    '/reports/school',
    '/reports/subject',
    '/reports/teacher',
    '/export-report',
  ],
  admin: [
    '/users',
    '/subjects',
    '/semesters',
    '/survey-management',
    '/reports/subject',
    '/reports/teacher',
    '/reports/school',
    '/export-report',
  ],
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)

  useEffect(() => {
    const saved = localStorage.getItem('currentUser')
    if (saved) {
      try {
        const parsed = JSON.parse(saved) as AuthUser
        setUser(parsed)
        localStorage.setItem('userRole', parsed.role)
      } catch {
        localStorage.removeItem('currentUser')
        localStorage.removeItem('userRole')
      }
    } else {
      localStorage.removeItem('userRole')
    }
  }, [])

  const login = async (username: string, password: string, role: UserRole): Promise<boolean> => {
    await new Promise((r) => setTimeout(r, 600))
    const found = mockUsers.find((u) => u.username === username && u.password === password && u.role === role)
    if (found) {
      const { password: _p, ...rest } = found
      setUser(rest)
      localStorage.setItem('currentUser', JSON.stringify(rest))
      localStorage.setItem('userRole', rest.role)
      return true
    }
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('currentUser')
    localStorage.removeItem('userRole')
  }

  const hasPermission = (path: string): boolean => {
    if (!user) return false
    return rolePermissions[user.role].includes(path)
  }

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout, hasPermission }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (ctx === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return ctx
}
