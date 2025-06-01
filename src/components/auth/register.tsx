"use client"; // Needed because useRouter is a client-side hook

import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react";
import { register } from "@/lib/authService";

export function Signup({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"div">) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    
    // Validate field on blur
    switch (name) {
      case 'email':
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (value && !emailRegex.test(value)) {
          setError("Please enter a valid email address");
          return;
        }
        break;
      case 'password':
        if (value && value.length < 6) {
          setError("Password must be at least 6 characters long");
          return;
        }
        break;
    }

    setFormData(prev => ({ ...prev, [name]: value }));
    setError(""); // Clear errors only if validation passes
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Basic validation
    if (!formData.username || !formData.email || !formData.password) {
      setError("All fields are required");
      setIsLoading(false);
      return;
    }

    try {
      await register(
        formData.username,
        formData.email,
        formData.password,
        ["ROLE_USER"] // Default role for new users
      );
      router.push('/dashboard/tasks');
    } catch (err) {
      setError(err instanceof Error ? err.message : "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Sign up</CardTitle>
          <CardDescription>
            Create your taskly account for free
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              {error && (
                <div className="text-red-500 text-sm">{error}</div>
              )}
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  defaultValue={formData.username}
                  onBlur={handleBlur}
                  placeholder="username"
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  defaultValue={formData.email}
                  onBlur={handleBlur}
                  placeholder="m@example.com"
                  required
                  disabled={isLoading}
                />
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <span className="ml-auto text-xs text-gray-500">
                    Minimum 6 characters
                  </span>
                </div>
                <Input 
                  id="password"
                  name="password"
                  type="password"
                  defaultValue={formData.password}
                  onBlur={handleBlur}
                  required
                  disabled={isLoading}
                />
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? "Creating account..." : "Create an account"}
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <a 
                onClick={() => router.push("/auth/login")} 
                className="underline underline-offset-4 cursor-pointer"
              >
                Login
              </a>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
