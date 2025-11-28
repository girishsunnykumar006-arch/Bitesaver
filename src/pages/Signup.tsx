import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { User, Mail, Lock, Eye, EyeOff, AlertCircle, CheckCircle, ArrowLeft } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface ValidationError {
  name?: string;
  email?: string;
  password?: string;
  retypePassword?: string;
}

const Signup = () => {
  const navigate = useNavigate();
  const { login, isLoggedIn } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    retypePassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showRetypePassword, setShowRetypePassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<ValidationError>({});
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  // Name validation: only characters (letters and spaces)
  const validateName = (nameValue: string): boolean => {
    const nameRegex = /^[a-zA-Z\s]+$/;
    return nameRegex.test(nameValue) && nameValue.trim().length > 0;
  };

  // Email validation: must end with @gmail.com
  const validateEmail = (emailValue: string): boolean => {
    const gmailRegex = /^[^\s@]+@gmail\.com$/;
    return gmailRegex.test(emailValue);
  };

  // Password validation: at least one uppercase, one lowercase, one special char, one number, 8+ chars
  const validatePassword = (passwordValue: string): boolean => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*])(?=.*\d).{8,}$/;
    return passwordRegex.test(passwordValue);
  };

  const validateForm = (): boolean => {
    const newErrors: ValidationError = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (!validateName(formData.name)) {
      newErrors.name = "Name must contain only letters and spaces";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Email must end with @gmail.com";
    }

    if (!formData.password.trim()) {
      newErrors.password = "Password is required";
    } else if (!validatePassword(formData.password)) {
      newErrors.password = "Password must contain: uppercase, lowercase, special character, number, and be at least 8 characters";
    }

    if (!formData.retypePassword.trim()) {
      newErrors.retypePassword = "Please retype your password";
    } else if (formData.retypePassword !== formData.password) {
      newErrors.retypePassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field when user starts typing
    if (errors[name as keyof ValidationError]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name as keyof ValidationError];
        return newErrors;
      });
    }
  };

  const handleCreateAccount = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // Simulate account creation
    setTimeout(() => {
      setIsLoading(false);
      setSuccessMessage("✅ Account created successfully! Redirecting to sign in...");

      // Show success message for 2 seconds then redirect to signin
      setTimeout(() => {
        login(formData.email);
        navigate("/");
      }, 2000);
    }, 1500);
  };

  const getPasswordStrengthHints = () => {
    const hints = [];
    if (!/[A-Z]/.test(formData.password)) hints.push("Add uppercase letter");
    if (!/[a-z]/.test(formData.password)) hints.push("Add lowercase letter");
    if (!/[!@#$%^&*]/.test(formData.password)) hints.push("Add special character (!@#$%^&*)");
    if (!/\d/.test(formData.password)) hints.push("Add number");
    if (formData.password.length < 8) hints.push("At least 8 characters");
    return hints;
  };

  const passwordHints = getPasswordStrengthHints();
  const isPasswordValid = passwordHints.length === 0 && formData.password.length > 0;
  const passwordsMatch = formData.retypePassword && formData.retypePassword === formData.password;

  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="pt-32 pb-12 md:pb-24 md:pt-40">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto">
            {/* Header with Back Button */}
            <div className="flex items-center gap-4 mb-8">
              <button
                onClick={() => navigate("/signin")}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <ArrowLeft className="w-5 h-5 text-muted-foreground" />
              </button>
              <div className="flex-1">
                <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
                  Create Account
                </h1>
                <p className="text-muted-foreground text-sm">
                  Join Food Forward today
                </p>
              </div>
            </div>

            {/* Form Card */}
            <div className="bg-card rounded-2xl border border-border p-8 space-y-6">
              {successMessage && (
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center gap-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <p className="text-sm text-green-700">{successMessage}</p>
                </div>
              )}

              <form onSubmit={handleCreateAccount} className="space-y-4">
                {/* Name Field */}
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-sm font-medium">
                    Full Name (Letters only) *
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="name"
                      type="text"
                      name="name"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`pl-10 ${errors.name ? "border-red-500" : ""}`}
                      required
                    />
                  </div>
                  {errors.name && (
                    <div className="flex items-center gap-2 text-red-500 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      {errors.name}
                    </div>
                  )}
                  {formData.name && !errors.name && validateName(formData.name) && (
                    <div className="flex items-center gap-2 text-green-500 text-sm">
                      <CheckCircle className="w-4 h-4" />
                      Valid name
                    </div>
                  )}
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium">
                    Email Address (Gmail only) *
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      name="email"
                      placeholder="user@gmail.com"
                      value={formData.email}
                      onChange={handleInputChange}
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
                  {formData.email && !errors.email && validateEmail(formData.email) && (
                    <div className="flex items-center gap-2 text-green-500 text-sm">
                      <CheckCircle className="w-4 h-4" />
                      Valid Gmail address
                    </div>
                  )}
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium">
                    Password *
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleInputChange}
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
                  {formData.password && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 space-y-2">
                      <p className="text-xs font-medium text-blue-900">Password Requirements:</p>
                      <ul className="space-y-1">
                        <li className={`text-xs flex items-center gap-2 ${/[A-Z]/.test(formData.password) ? "text-green-600" : "text-muted-foreground"}`}>
                          {/[A-Z]/.test(formData.password) ? <CheckCircle className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                          Uppercase letter (A-Z)
                        </li>
                        <li className={`text-xs flex items-center gap-2 ${/[a-z]/.test(formData.password) ? "text-green-600" : "text-muted-foreground"}`}>
                          {/[a-z]/.test(formData.password) ? <CheckCircle className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                          Lowercase letter (a-z)
                        </li>
                        <li className={`text-xs flex items-center gap-2 ${/[!@#$%^&*]/.test(formData.password) ? "text-green-600" : "text-muted-foreground"}`}>
                          {/[!@#$%^&*]/.test(formData.password) ? <CheckCircle className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                          Special character (!@#$%^&*)
                        </li>
                        <li className={`text-xs flex items-center gap-2 ${/\d/.test(formData.password) ? "text-green-600" : "text-muted-foreground"}`}>
                          {/\d/.test(formData.password) ? <CheckCircle className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                          Number (0-9)
                        </li>
                        <li className={`text-xs flex items-center gap-2 ${formData.password.length >= 8 ? "text-green-600" : "text-muted-foreground"}`}>
                          {formData.password.length >= 8 ? <CheckCircle className="w-3 h-3" /> : <AlertCircle className="w-3 h-3" />}
                          At least 8 characters ({formData.password.length}/8)
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

                {/* Retype Password Field */}
                <div className="space-y-2">
                  <Label htmlFor="retypePassword" className="text-sm font-medium">
                    Retype Password *
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      id="retypePassword"
                      type={showRetypePassword ? "text" : "password"}
                      name="retypePassword"
                      placeholder="••••••••"
                      value={formData.retypePassword}
                      onChange={handleInputChange}
                      className={`pl-10 pr-10 ${errors.retypePassword ? "border-red-500" : ""}`}
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowRetypePassword(!showRetypePassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showRetypePassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>

                  {formData.retypePassword && (
                    passwordsMatch ? (
                      <div className="flex items-center gap-2 text-green-500 text-sm">
                        <CheckCircle className="w-4 h-4" />
                        Passwords match
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-red-500 text-sm">
                        <AlertCircle className="w-4 h-4" />
                        Passwords do not match
                      </div>
                    )
                  )}

                  {errors.retypePassword && (
                    <div className="flex items-center gap-2 text-red-500 text-sm">
                      <AlertCircle className="w-4 h-4" />
                      {errors.retypePassword}
                    </div>
                  )}
                </div>

                {/* Create Account Button */}
                <Button
                  type="submit"
                  variant="default"
                  size="lg"
                  className="w-full mt-6"
                  disabled={isLoading || !validateName(formData.name) || !validateEmail(formData.email) || !isPasswordValid || !passwordsMatch}
                >
                  {isLoading ? "Creating Account..." : "Create Account"}
                </Button>
              </form>

              {/* Sign In Link */}
              <p className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <button
                  onClick={() => navigate("/signin")}
                  className="text-primary hover:text-primary/90 font-medium"
                >
                  Sign In
                </button>
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
};

export default Signup;
