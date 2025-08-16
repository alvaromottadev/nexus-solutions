import { FaGoogle, FaInstagram, FaLinkedin, FaWhatsapp } from "react-icons/fa";

export default function Contacts() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-300 group">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg group-hover:scale-110 transition-transform duration-300">
              <FaInstagram className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Instagram</p>
              <p className="text-gray-800 font-semibold">@nexussolutions</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-300 group">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg group-hover:scale-110 transition-transform duration-300">
              <FaWhatsapp className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">WhatsApp</p>
              <p className="text-gray-800 font-semibold">+55 31 99999-9999</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-300 group">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg group-hover:scale-110 transition-transform duration-300">
              <FaLinkedin className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">LinkedIn</p>
              <p className="text-gray-800 font-semibold">/in/nexussolutions</p>
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-4 hover:shadow-md transition-all duration-300 group">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-r from-orange-500 to-red-500 rounded-lg group-hover:scale-110 transition-transform duration-300">
              <FaGoogle className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">Email</p>
              <p className="text-gray-800 font-semibold">nexus@solutions.com</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 p-4 bg-[var(--primary-color)]/10 border border-[var(--primary-color)]/20 rounded-xl">
        <p className="text-center text-[var(--primary-color)] text-sm font-medium">
          🚀 Nossa equipe está disponível 24/7 para te ajudar!
        </p>
      </div>
    </div>
  );
}
