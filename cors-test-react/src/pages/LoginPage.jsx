import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Button, Input, Card } from "../components/common";
import { useAuth } from "../hooks/useAuth";
import { authService } from "../services/auth";
import { toast } from "react-hot-toast";

const loginSchema = z.object({
  username: z.string().min(1, "Tên đăng nhập không được để trống"),
  password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
});

const LoginPage = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  // Redirect if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const onSubmit = async (data) => {
    try {
      const response = await authService.login(data);
      console.log(`Login successful: ${response}`);

      toast.success("Đăng nhập thành công!");
      window.location.href = "/dashboard";
    } catch (error) {
      toast.error(error.message || "Tên đăng nhập hoặc mật khẩu không đúng!");
    }
  };

  const handleQuickLogin = async (role) => {
    try {
      // For demo purposes, use predefined credentials
      const demoCredentials = {
        Admin: { username: "admin", password: "123456" },
        Manager: { username: "manager", password: "manager123" },
        Sales: { username: "sales", password: "sales123" },
        Technician: { username: "tech", password: "tech123" },
      };

      const credentials = demoCredentials[role];
      if (credentials) {
        await authService.login(credentials);
        toast.success(`Đăng nhập thành công với vai trò ${role}!`);
        window.location.href = "/dashboard";
      }
    } catch (error) {
      toast.error(error.message || "Đăng nhập thất bại!");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center h-12 w-12 bg-primary-600 rounded-lg mx-auto">
            <span className="text-white font-bold text-xl">DX</span>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            Đăng nhập vào tài khoản
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            Hoặc{" "}
            <Link
              to="/register"
              className="font-medium text-primary-600 hover:text-primary-500">
              tạo tài khoản mới
            </Link>
          </p>
        </div>

        {/* Login form */}
        <Card className="p-8">
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <Input
              label="Tên đăng nhập"
              type="text"
              required
              {...register("username")}
              error={errors.username?.message}
              placeholder="Nhập tên đăng nhập"
            />

            <Input
              label="Mật khẩu"
              type="password"
              required
              {...register("password")}
              error={errors.password?.message}
              placeholder="Nhập mật khẩu"
            />

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-900">
                  Ghi nhớ đăng nhập
                </label>
              </div>

              <div className="text-sm">
                <Link
                  to="/forgot-password"
                  className="font-medium text-primary-600 hover:text-primary-500">
                  Quên mật khẩu?
                </Link>
              </div>
            </div>

            <Button
              type="submit"
              className="w-full"
              loading={false} // isLoggingIn removed
              disabled={false} // isLoggingIn removed
            >
              {/* isLoggingIn ? 'Đang đăng nhập...' : 'Đăng nhập' */}
              Đăng nhập
            </Button>
          </form>
        </Card>

        {/* Demo accounts */}
        <Card className="p-6 bg-blue-50 border-blue-200">
          <h3 className="text-sm font-medium text-blue-900 mb-3">
            Đăng nhập nhanh với tài khoản demo:
          </h3>
          <div className="grid grid-cols-2 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleQuickLogin("Admin")}
              className="text-blue-700 border-blue-300 hover:bg-blue-100">
              Admin
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleQuickLogin("Manager")}
              className="text-blue-700 border-blue-300 hover:bg-blue-100">
              Manager
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleQuickLogin("Sales")}
              className="text-blue-700 border-blue-300 hover:bg-blue-100">
              Sales
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleQuickLogin("Technician")}
              className="text-blue-700 border-blue-300 hover:bg-blue-100">
              Technician
            </Button>
          </div>

          <div className="mt-4 space-y-1 text-xs text-blue-800">
            <div>
              <strong>Hoặc nhập:</strong>
            </div>
            <div>Admin: admin / admin123</div>
            <div>Manager: manager / manager123</div>
            <div>Sales: sales / sales123</div>
            <div>Technician: tech / tech123</div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
