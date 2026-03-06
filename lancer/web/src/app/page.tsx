import React from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Button from '@/components/Button';
import Card from '@/components/Card';
import { mockJobs } from '@/data/mockJobs';

const HeroSection = () => (
  <section className="bg-blue-600 text-white py-20">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h1 className="text-4xl sm:text-5xl font-extrabold mb-6">
        Find Your Next Developer Dream Job
      </h1>
      <p className="text-xl mb-10 max-w-2xl mx-auto">
        Lancer is the premier marketplace for top-tier developers and forward-thinking companies.
        Build your future with world-class projects.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Link href="/jobs">
          <Button variant="secondary" className="w-full sm:w-auto text-blue-600 bg-white hover:bg-gray-100">
            Browse Jobs
          </Button>
        </Link>
        <Link href="/signup">
          <Button className="w-full sm:w-auto border-2 border-white hover:bg-blue-700">
            Sign Up Now
          </Button>
        </Link>
      </div>
    </div>
  </section>
);

const FeaturedJobs = () => (
  <section className="py-20 bg-gray-50">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Featured Jobs</h2>
          <p className="text-gray-600 mt-2">Latest opportunities from top companies</p>
        </div>
        <Link href="/jobs" className="text-blue-600 font-semibold hover:underline hidden sm:block">
          View all jobs &rarr;
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {mockJobs.slice(0, 4).map((job) => (
          <Card key={job.id} className="hover:shadow-lg transition-shadow duration-200">
            <div className="flex flex-col h-full justify-between">
              <div>
                <h3 className="text-xl font-bold text-blue-600 mb-2">{job.title}</h3>
                <p className="text-sm text-gray-500 mb-4">{job.client.name} • {job.client.location}</p>
                <p className="text-gray-700 line-clamp-2 mb-4">{job.description}</p>
              </div>
              <div className="flex justify-between items-center mt-4">
                <span className="font-semibold text-gray-900">
                  {job.budgetType === 'fixed' ? `$${job.budget.toLocaleString()}` : `$${job.budget}/hr`}
                </span>
                <Link href={`/jobs/${job.id}`}>
                  <Button variant="secondary" className="text-sm">Details</Button>
                </Link>
              </div>
            </div>
          </Card>
        ))}
      </div>
      <div className="mt-10 text-center sm:hidden">
        <Link href="/jobs" className="text-blue-600 font-semibold hover:underline">
          View all jobs &rarr;
        </Link>
      </div>
    </div>
  </section>
);

const Features = () => (
  <section className="py-20">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">Why Developers Choose Lancer</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="text-center">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04rem0 000 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-4">Verified Clients</h3>
          <p className="text-gray-600">Work with companies that have been vetted for quality and payment reliability.</p>
        </div>
        <div className="text-center">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-4">Secure Payments</h3>
          <p className="text-gray-600">Our escrow system ensures you get paid for every milestone you complete.</p>
        </div>
        <div className="text-center">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-4">Fast Payouts</h3>
          <p className="text-gray-600">No more waiting weeks for your money. Receive funds quickly once work is approved.</p>
        </div>
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="bg-gray-900 text-gray-400 py-12">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row justify-between items-center">
        <div className="mb-8 md:mb-0">
          <span className="text-2xl font-bold text-white">Lancer</span>
          <p className="mt-2">The future of freelance development.</p>
        </div>
        <div className="flex gap-8">
          <Link href="/jobs" className="hover:text-white transition-colors">Find Jobs</Link>
          <Link href="/signup" className="hover:text-white transition-colors">Sign Up</Link>
          <Link href="/login" className="hover:text-white transition-colors">Log In</Link>
        </div>
      </div>
      <div className="mt-12 pt-8 border-t border-gray-800 text-center text-sm">
        &copy; {new Date().getFullYear()} Lancer. All rights reserved.
      </div>
    </div>
  </footer>
);

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <FeaturedJobs />
        <Features />
      </main>
      <Footer />
    </div>
  );
}
