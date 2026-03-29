'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Button from '@/components/Button';
import Card from '@/components/Card';
import { fetchJobs, Job } from '@/lib/googleSheets';

const HeroSection = () => (
  <section className="bg-blue-600 text-white py-20">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
      <h1 className="text-4xl sm:text-5xl font-extrabold mb-6">
        Powering the Next Generation of African Talent
      </h1>
      <p className="text-xl mb-10 max-w-2xl mx-auto">
        WorkPlug is the dedicated platform for <strong>students</strong> to kickstart their careers.
        Our mission is to <strong>end unemployment in Africa within the next 10 years</strong> by connecting students with global opportunities.
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-4">
        <Link href="/jobs">
          <Button variant="secondary" className="w-full sm:w-auto text-blue-600 bg-white hover:bg-gray-100">
            Find Student Gigs
          </Button>
        </Link>
        <Link href="/signup">
          <Button className="w-full sm:w-auto border-2 border-white hover:bg-blue-700">
            Join the Movement
          </Button>
        </Link>
      </div>
    </div>
  </section>
);

const FeaturedJobs = ({ jobs }: { jobs: Job[] }) => (
  <section className="py-20 bg-gray-50">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-between items-end mb-10">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Opportunities for You</h2>
          <p className="text-gray-600 mt-2">Latest student-friendly projects from top companies</p>
        </div>
        <Link href="/jobs" className="text-blue-600 font-semibold hover:underline hidden sm:block">
          View all gigs &rarr;
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {jobs.slice(0, 4).map((job) => (
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
          View all gigs &rarr;
        </Link>
      </div>
    </div>
  </section>
);

const Features = () => (
  <section className="py-20">
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">Why Students Choose WorkPlug</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        <div className="text-center">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l9-5-9-5-9 5 9 5zm0 0v6m0-6L3 9m18 0l-9 5" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-4">Student-First</h3>
          <p className="text-gray-600">Gigs designed for student schedules and skill levels. Build your portfolio while you learn.</p>
        </div>
        <div className="text-center">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-4">Impact Africa</h3>
          <p className="text-gray-600">Be part of the mission to transform the African economy and eliminate unemployment.</p>
        </div>
        <div className="text-center">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold mb-4">Earn While Learning</h3>
          <p className="text-gray-600">Get paid fairly for your work. No more unpaid internships—your skills have value.</p>
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
          <span className="text-2xl font-bold text-white">WorkPlug</span>
          <p className="mt-2">Powering your hustle. Ending unemployment in Africa.</p>
        </div>
        <div className="flex gap-8">
          <Link href="/jobs" className="hover:text-white transition-colors">Find Gigs</Link>
          <Link href="/signup" className="hover:text-white transition-colors">Sign Up</Link>
          <Link href="/login" className="hover:text-white transition-colors">Log In</Link>
        </div>
      </div>
      <div className="mt-12 pt-8 border-t border-gray-800 text-center text-sm">
        &copy; {new Date().getFullYear()} WorkPlug. All rights reserved.
      </div>
    </div>
  </footer>
);

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);

  useEffect(() => {
    fetchJobs().then(setJobs);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <FeaturedJobs jobs={jobs} />
        <Features />
      </main>
      <Footer />
    </div>
  );
}
