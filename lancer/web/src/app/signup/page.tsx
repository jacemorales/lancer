import React from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Card from '@/components/Card';
import Input from '@/components/Input';
import Button from '@/components/Button';

const SignupPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto mt-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto">
          <Card>
            <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">Create your account</h2>
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
                autoComplete="new-password"
                required
                label="Password"
                placeholder="••••••••"
              />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">I am a...</label>
                <div className="flex space-x-4">
                  <label className="flex items-center">
                    <input type="radio" name="role" value="client" className="form-radio" defaultChecked />
                    <span className="ml-2 text-gray-700">Client, hiring for a project</span>
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="role" value="freeworkplug" className="form-radio" />
                    <span className="ml-2 text-gray-700">Freeworkplug, looking for work</span>
                  </label>
                </div>
              </div>
              <Button type="submit" className="w-full">
                Create Account
              </Button>
            </form>
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?{' '}
                <Link href="/login" className="font-medium text-blue-600 hover:text-blue-500">
                  Log in
                </Link>
              </p>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default SignupPage;