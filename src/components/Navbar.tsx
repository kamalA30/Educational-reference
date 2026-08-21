import { Bell, User, LayoutTemplate } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b border-gray-100 bg-white/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          
          {/* Right side: Title & Links */}
          <div className="flex items-center gap-12">
            {/* الشعار والعنوان */}
            <div className="flex items-center gap-4">
              <LayoutTemplate className="w-8 h-8 text-[#1E3A8A]" />
              <h1 className="text-xl font-bold text-gray-900 hidden sm:block">
                مسابقة المنهج المرجعية التربوية الرسمية
              </h1>
            </div>

            {/* الروابط */}
            <div className="hidden md:flex items-center gap-12">
              <a 
                href="#" 
                className="px-4 py-2 text-[#1E3A8A] font-semibold hover:text-[#B39055] hover:bg-gray-50 rounded-lg transition-all"
              >
                الصفحة الرئيسية
              </a>
              <a 
                href="#" 
                className="px-4 py-2 text-gray-600 font-medium hover:text-[#B39055] hover:bg-gray-50 rounded-lg transition-all"
              >
                عن المسابقة
              </a>
            </div>
          </div>

          {/* Left side: Icons */}
          <div className="flex items-center gap-3">
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors relative text-gray-600">
              <Bell className="w-6 h-6" />
              <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
            </button>
            
            <div className="w-px h-8 bg-gray-200 mx-1"></div>
            
            <button className="p-2 rounded-full hover:bg-gray-100 transition-colors flex items-center gap-3 text-gray-600">
              <User className="w-6 h-6" />
              <span className="hidden sm:block text-sm font-medium">الملف الشخصي</span>
            </button>
          </div>

        </div>
      </div>
    </nav>
  );
}