import { BrowserRouter } from 'react-router-dom'
import { AppRoutes } from './config/routes'

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col min-h-screen w-full">
        <AppRoutes />
      </div>
    </BrowserRouter>
  )
}
