import React from 'react';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Card from '@/components/Card';
import Button from '@/components/Button';
import { mockJobs, Job } from '@/data/mockJobs';

// This function can be used for static generation in a real app
// export async function generateStaticParams() {
//   return mockJobs.map((job) => ({
//     id: job.id,
//   }));
// }

const getJobById = (id: string): Job | undefined => {
  return mockJobs.find(job => job.id === id);
};

const JobDetailPage = ({ params }: { params: { id: string } }) => {
  const job = getJobById(params.id);

  if (!job) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto mt-10 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <h1 className="text-3xl font-bold text-gray-800">{job.title}</h1>
              <p className="text-sm text-gray-500 mt-2">Posted on {job.postedDate}</p>
              <div className="mt-6 border-t border-gray-200 pt-6">
                <h2 className="text-xl font-semibold text-gray-800">Job Description</h2>
                <p className="mt-2 text-gray-700 whitespace-pre-wrap">{job.description}</p>
              </div>
              <div className="mt-6">
                <h2 className="text-xl font-semibold text-gray-800">Required Skills</h2>
                <div className="mt-2 flex flex-wrap gap-2">
                  {job.skills.map(skill => (
                    <span key={skill} className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-full">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card>
              <div className="text-center">
                <Button className="w-full">Apply Now</Button>
                <Button variant="secondary" className="w-full mt-2">Save Job</Button>
              </div>
              <div className="mt-6 border-t border-gray-200 pt-6">
                <h3 className="font-semibold text-gray-800">Budget</h3>
                <p className="text-gray-600">
                  {job.budgetType === 'fixed'
                    ? `$${job.budget.toLocaleString()} (Fixed Price)`
                    : `$${job.budget}/hour (Hourly)`}
                </p>
              </div>
              <div className="mt-6 border-t border-gray-200 pt-6">
                <h3 className="font-semibold text-gray-800 mb-2">About the Client</h3>
                <p className="text-lg font-bold text-gray-900">{job.client.name}</p>
                <p className="text-gray-600">{job.client.location}</p>
                <div className="mt-2 text-gray-600">
                  <span>{job.client.rating} ★</span>
                  <span className="ml-2">({job.client.reviews} reviews)</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default JobDetailPage;