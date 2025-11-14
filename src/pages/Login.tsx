import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Navigation } from "@/components/Navigation";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;

      toast({
        title: "Welcome back!",
        description: "You've successfully logged in.",
      });
      
      navigate("/explore");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            user_type: 'tester',
          },
        },
      });

      if (error) throw error;

      toast({
        title: "Account created!",
        description: "Please check your email to verify your account.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="relative z-10">
        <Navigation />
        
        <div className="pt-24 pb-12 container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8 bg-card/95 backdrop-blur-sm border-4 border-accent shadow-thick p-8">
            <h1 className="text-4xl font-bold mb-2">Join Rate That AI</h1>
            <p className="text-muted-foreground">Start testing and building with AI tools</p>
          </div>

          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="signup">Sign Up</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <Card className="border-4 border-accent shadow-thick bg-card/95 backdrop-blur-sm">
                <CardHeader className="p-8">
                  <CardTitle>Welcome Back</CardTitle>
                  <CardDescription>Enter your credentials to continue</CardDescription>
                </CardHeader>
                <CardContent className="p-8 pt-0">
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="login-email">Email</Label>
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="login-password">Password</Label>
                      <Input
                        id="login-password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? "Logging in..." : "Log In"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="signup">
              <Card className="border-4 border-accent shadow-thick bg-card/95 backdrop-blur-sm">
                <CardHeader className="p-8">
                  <CardTitle>Tester Sign Up</CardTitle>
                  <CardDescription>Join our testing community</CardDescription>
                </CardHeader>
                <CardContent className="p-8 pt-0">
                  <form onSubmit={handleSignup} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="signup-email">Email</Label>
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="signup-password">Password</Label>
                      <Input
                        id="signup-password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? "Creating account..." : "Sign Up as Tester"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <p className="text-center text-sm text-muted-foreground mt-4">
            By continuing, you agree to our Terms of Service and Privacy Policy
          </p>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
