export interface Job {
  id: string;
  title: string;
  description: string;
  skills: string[];
  budgetType: 'fixed' | 'hourly';
  budget: number;
  postedDate: string;
  client: {
    name: string;
    location: string;
    rating: number;
    reviews: number;
  };
}

export const mockJobs: Job[] = [
  {
    id: '1',
    title: 'Senior Frontend Developer for E-commerce Platform',
    description: 'We are looking for an experienced Senior Frontend Developer to help us build a new, high-performance e-commerce platform. You will be responsible for building the user interface from the ground up using React and Next.js.',
    skills: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'GraphQL'],
    budgetType: 'hourly',
    budget: 75,
    postedDate: '2024-09-26',
    client: {
      name: 'Shopify Inc.',
      location: 'Ottawa, Canada',
      rating: 4.9,
      reviews: 132,
    },
  },
  {
    id: '2',
    title: 'Backend Engineer (Node.js, PostgreSQL)',
    description: 'We need a skilled backend engineer to design and implement the API and database for our new social media application. Experience with real-time data and WebSockets is a plus.',
    skills: ['Node.js', 'NestJS', 'PostgreSQL', 'Prisma', 'WebSockets'],
    budgetType: 'fixed',
    budget: 15000,
    postedDate: '2024-09-25',
    client: {
      name: 'ConnectApp',
      location: 'San Francisco, USA',
      rating: 4.8,
      reviews: 45,
    },
  },
  {
    id: '3',
    title: 'Full-Stack Developer for SaaS Dashboard',
    description: 'Join our team to build a new analytics dashboard for our SaaS product. You will work on both the React frontend and the Node.js backend.',
    skills: ['React', 'Node.js', 'Express', 'MongoDB', 'Chart.js'],
    budgetType: 'fixed',
    budget: 25000,
    postedDate: '2024-09-24',
    client: {
      name: 'DataCorp',
      location: 'Remote',
      rating: 5.0,
      reviews: 88,
    },
  },
  {
    id: '4',
    title: 'DevOps Engineer to set up CI/CD Pipeline',
    description: 'We are looking for a DevOps engineer to create a complete CI/CD pipeline for our web application using GitHub Actions and AWS.',
    skills: ['AWS', 'Docker', 'Kubernetes', 'GitHub Actions', 'Terraform'],
    budgetType: 'hourly',
    budget: 90,
    postedDate: '2024-09-23',
    client: {
      name: 'CloudScale',
      location: 'Austin, USA',
      rating: 4.7,
      reviews: 61,
    },
  },
];