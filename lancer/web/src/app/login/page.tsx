import React from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Card from '@/components/Card';
import Input from '@/components/Input';
import Button from '@/components/Button';

const LoginPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto mt-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <Card>
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Welcome back</h2>
            <form className="space-y-6">
              <Input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                label="Email address"
                placeholder="you@example.com"
              />
              <Input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                label="Password"
                placeholder="••••••••"
              />
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
                    Forgot your password?
                  </a>
                </div>
              </div>
              <Button type="submit" className="w-full">
                Log In
              </Button>
            </form>
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account yet?{' '}
                <Link href="/signup" className="font-medium text-blue-600 hover:text-blue-500">
                  Sign up
                </Link>
              </p>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;