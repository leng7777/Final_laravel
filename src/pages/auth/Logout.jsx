import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Logout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const doLogout = async () => {
      await logout();
      navigate("/auth/login");
    };

    doLogout();
  }, [logout, navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="bg-white shadow-xl rounded-2xl p-8 flex flex-col items-center gap-4 animate-fadeIn">
        {/* Spinner */}
        <div className="relative">
          <div className="w-16 h-16 border-4 border-gray-200 rounded-full"></div>
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin absolute top-0 left-0"></div>
        </div>

        <div className="text-center">
          <p className="text-gray-800 text-lg font-semibold">
            Logging you out...
          </p>
          <p className="text-gray-500 text-sm mt-1">
            Please wait a moment
          </p>
        </div>
      </div>
    </div>
  );
}

export default Logout;
