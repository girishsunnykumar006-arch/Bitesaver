import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, Eye, EyeOff, AlertCircle, CheckCircle } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface ValidationError {
  email?: string;
  password?: string;
}

const SignIn = () => {
  const navigate = useNavigate();
  const { login, isLoggedIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<ValidationError>({});

  useEffect(() => {
    window.scrollTo(0, 0);
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  // Email validation: must end with @gmail.com
  const validateEmail = (emailValue: string): boolean => {
    const gmailRegex = /^[^\s@]+@gmail\.com$/;
    return gmailRegex.test(emailValue);
  };

  // Password validation: at least one uppercase, one lowercase, one special char, one number
  const validatePassword = (passwordValue: string): boolean => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])(?=.*\d).{8,}$/;
    return passwordRegex.test(passwordValue);
  };

  const validateForm = (): boolean => {
    const newErrors: ValidationError = {};

    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(email)) {
      newErrors.email = "Email must end with @gmail.com";
    }

    if (!password.trim()) {
      newErrors.password = "Password is required";
    } else if (!validatePassword(password)) {
      newErrors.password = "Password must contain: uppercase letter, lowercase letter, special character, number, and be at least 8 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // Simulate authentication
    setTimeout(() => {
      setIsLoading(false);
      login(email);
      navigate("/");
    }, 1500);
  };

  const getPasswordStrengthHints = () => {
    const hints = [];
    if (!/[A-Z]/.test(password)) hints.push("Add uppercase letter");
    if (!/[a-z]/.test(password)) hints.push("Add lowercase letter");
    if (!/[!@#$%^&*]/.test(password)) hints.push("Add special character (!@#$%^&*)");
    if (!/\d/.test(password)) hints.push("Add number");
    if (password.length < 8) hints.push("At least 8 characters");
    return hints;
  };

  const passwordHints = getPasswordStrengthHints();
  const isPasswordValid = passwordHints.length === 0 && password.length > 0;

  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="pt-32 pb-12 md:pb-24 md:pt-40">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
                Welcome Back
              </h1>
              <p className="text-muted-foreground">
                Sign in to your account to continue
              </p>
            </div>

            {/* Form Card */}
            <div className="bg-card rounded-2xl border border-border p-8 space-y-6">
              <form onSubmit={handleSignIn} className="space-y-4">
                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email Address (Gmail only)
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="user@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={`pl-10 ${errors.email ? "border-red-500" : ""}`}
                      required
                    />
                  </div>
                  {errors.email && (
                    <div className="flex items-center gap-2 text-red-500 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      {errors.email}
                    </div>
                  )}
                  {email && !errors.email && validateEmail(email) && (
                    <div className="flex items-center gap-2 text-green-500 text-sm">
                      <CheckCircle className="w-4 h-4" />
                      Valid Gmail address
                    </div>
                  )}
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className={`pl-10 pr-10 ${errors.password ? "border-red-500" : ""}`}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>

                  {/* Password Requirements */}
                  {password && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 space-y-2">
                      <p className="text-xs font-medium text-blue-900">Password Requirements:</p>
                      <ul className="space-y-1">
                        <li className={`text-xs flex items-center gap-2 ${/[A-Z]/.test(password) ? "text-green-600" : "text-muted-foreground"}`}>
                          {/[A-Z]/.test(password) ? <CheckCircle className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                          Uppercase letter (A-Z)
                        </li>
                        <li className={`text-xs flex items-center gap-2 ${/[a-z]/.test(password) ? "text-green-600" : "text-muted-foreground"}`}>
                          {/[a-z]/.test(password) ? <CheckCircle className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                          Lowercase letter (a-z)
                        </li>
                        <li className={`text-xs flex items-center gap-2 ${/[!@#$%^&*]/.test(password) ? "text-green-600" : "text-muted-foreground"}`}>
                          {/[!@#$%^&*]/.test(password) ? <CheckCircle className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                          Special character (!@#$%^&*)
                        </li>
                        <li className={`text-xs flex items-center gap-2 ${/\d/.test(password) ? "text-green-600" : "text-muted-foreground"}`}>
                          {/\d/.test(password) ? <CheckCircle className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                          Number (0-9)
                        </li>
                        <li className={`text-xs flex items-center gap-2 ${password.length >= 8 ? "text-green-600" : "text-muted-foreground"}`}>
                          {password.length >= 8 ? <CheckCircle className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                          At least 8 characters ({password.length}/8)
                        </li>
                      </ul>
                    </div>
                  )}

                  {errors.password && (
                    <div className="flex items-start gap-2 text-red-500 text-sm">
                      <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                      <span>{errors.password}</span>
                    </div>
                  )}
                </div>

                {/* Remember & Forgot */}
                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded border border-border" />
                    <span className="text-sm text-muted-foreground">Remember me</span>
                  </label>
                  <a href="#" className="text-sm text-primary hover:text-primary/90">
                    Forgot password?
                  </a>
                </div>

                {/* Sign In Button */}
                <Button
                  type="submit"
                  variant="default"
                  size="lg"
                  className="w-full"
                  disabled={isLoading || !validateEmail(email) || !isPasswordValid}
                >
                  {isLoading ? "Signing in..." : "Sign In"}
                </Button>
              </form>

              {/* Divider */}
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-border"></div>
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">New to Food Forward?</span>
                </div>
              </div>

              {/* Create Account Button */}
              <Link to="/signup" className="w-full">
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  className="w-full"
                >
                  Create New Account
                </Button>
              </Link>

              {/* Sign Up Link */}
              <p className="text-center text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link to="/signup" className="text-primary hover:text-primary/90 font-medium">
                  Sign up here
                </Link>
              </p>
            </div>

            {/* Info Box */}
            <div className="mt-8 p-4 bg-muted rounded-lg text-sm text-muted-foreground text-center space-y-2">
              <p><strong>Demo Credentials:</strong></p>
              <p>Email: demo@gmail.com</p>
              <p>Password: Demo@123!</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default SignIn;
