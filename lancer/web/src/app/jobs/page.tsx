import React from 'react';
import Link from 'next/link';
import Header from '@/components/Header';
import Card from '@/components/Card';
import Button from '@/components/Button';
import { mockJobs, Job } from '@/data/mockJobs';

const JobCard: React.FC<{ job: Job }> = ({ job }) => (
  <Card className="mb-4 hover:shadow-lg transition-shadow duration-200">
    <div className="flex flex-col sm:flex-row justify-between">
      <div>
        <Link href={`/jobs/${job.id}`} className="text-xl font-bold text-blue-600 hover:underline">
          {job.title}
        </Link>
        <p className="text-sm text-gray-600 mt-1">
          {job.budgetType === 'fixed' ? `$${job.budget.toLocaleString()} Fixed Price` : `$${job.budget}/hour`} - Posted on {job.postedDate}
        </p>
        <p className="mt-4 text-gray-700 line-clamp-2">
          {job.description}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {job.skills.map(skill => (
            <span key={skill} className="bg-gray-200 text-gray-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
              {skill}
            </span>
          ))}
        </div>
      </div>
      <div className="mt-4 sm:mt-0 sm:ml-6 flex-shrink-0 flex flex-col items-start sm:items-end justify-between">
        <Link href={`/jobs/${job.id}`}>
          <Button>View Job</Button>
        </Link>
        <div className="mt-4 text-sm text-gray-600 text-left sm:text-right">
          <p className="font-semibold">{job.client.name}</p>
          <p>{job.client.location}</p>
          <p>Rating: {job.client.rating} ({job.client.reviews} reviews)</p>
        </div>
      </div>
    </div>
  </Card>
);

const JobsPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto mt-10 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Find your next opportunity</h1>
        <div className="flex flex-col lg:flex-row gap-8">
          <aside className="w-full lg:w-1/4">
            <Card>
              <h2 className="text-lg font-semibold mb-4">Filters</h2>
              {/* Filter components will go here */}
              <p className="text-gray-500">Filters are not yet implemented.</p>
            </Card>
          </aside>
          <div className="w-full lg:w-3/4">
            {mockJobs.map(job => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default JobsPage;