import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import detectiveLogo from "@/assets/detective-logo.png";

const AuthPage = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const logAuthEvent = async (eventType: string, success: boolean, userId?: string, errorMsg?: string) => {
    try {
      await supabase.from('auth_logs').insert({
        user_id: userId || null,
        event_type: eventType,
        email: email,
        success: success,
        error_message: errorMsg || null,
        ip_address: null, // Will be captured server-side in production
        user_agent: navigator.userAgent
      });
    } catch (error) {
      console.error('Failed to log auth event:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (isLogin) {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });

        if (error) {
          await logAuthEvent('login_failed', false, undefined, error.message);
          toast({
            title: "Login failed",
            description: error.message,
            variant: "destructive",
          });
          return;
        }

        await logAuthEvent('login_success', true, data.user?.id);
        toast({
          title: "Welcome back!",
          description: "You've successfully logged in.",
        });
        navigate("/");
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/`,
          },
        });

        if (error) {
          await logAuthEvent('signup_failed', false, undefined, error.message);
          toast({
            title: "Signup failed",
            description: error.message,
            variant: "destructive",
          });
          return;
        }

        await logAuthEvent('signup_success', true, data.user?.id);
        toast({
          title: "Account created!",
          description: "Please check your email to verify your account.",
        });
        navigate("/");
      }
    } catch (error: any) {
      await logAuthEvent(isLogin ? 'login_error' : 'signup_error', false, undefined, error.message);
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-white p-1.5 rounded-md shadow-sm">
              <img src={detectiveLogo} alt="Sales Intelligence Logo" className="h-16 w-16" />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-2">IBM Sales Intelligence</h1>
          <p className="text-muted-foreground">AI-powered client briefings</p>
        </div>

        {/* Auth Card */}
        <Card>
          <CardHeader>
            <CardTitle>{isLogin ? "Sign In" : "Create Account"}</CardTitle>
            <CardDescription>
              {isLogin 
                ? "Enter your credentials to access your briefings" 
                : "Sign up to start creating client briefings"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="name@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {!isLogin && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    required
                  />
                </div>
              )}

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Processing..." : (isLogin ? "Sign In" : "Sign Up")}
              </Button>

              <div className="text-center text-sm">
                <button
                  type="button"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-primary hover:underline"
                >
                  {isLogin 
                    ? "Don't have an account? Sign up" 
                    : "Already have an account? Sign in"}
                </button>
              </div>
            </form>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground mt-4">
          This is a mockup interface for demonstration purposes
        </p>
      </div>
    </div>
  );
};

export default AuthPage;
