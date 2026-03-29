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

export async function fetchJobs(): Promise<Job[]> {
  const url = process.env.NEXT_PUBLIC_GOOGLE_SHEET_URL;
  if (!url) {
    console.warn('NEXT_PUBLIC_GOOGLE_SHEET_URL is not set, using mock data.');
    const { mockJobs } = await import('@/data/mockJobs');
    return mockJobs;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Network response was not ok');
    const csvData = await response.text();

    // Simple CSV parser (handles basic cases)
    const lines = csvData.split(/\r?\n/).filter(line => line.trim() !== "");
    const headers = lines[0].split(',');

    return lines.slice(1).map(row => {
      // Split by comma but handle quoted strings if necessary
      // This is a simplified regex-based split
      const columns = row.match(/(".*?"|[^",\s]+)(?=\s*,|\s*$)/g) || [];
      const cleanCols = columns.map(col => col.trim().replace(/^"|"$/g, ''));

      return {
        id: cleanCols[0],
        title: cleanCols[1],
        description: cleanCols[2],
        skills: cleanCols[3] ? cleanCols[3].split(';') : [],
        budgetType: cleanCols[4] as 'fixed' | 'hourly',
        budget: parseFloat(cleanCols[5]) || 0,
        postedDate: cleanCols[6],
        client: {
          name: cleanCols[7],
          location: cleanCols[8],
          rating: parseFloat(cleanCols[9]) || 0,
          reviews: parseInt(cleanCols[10]) || 0,
        },
      };
    }).filter(job => job.id);
  } catch (error) {
    console.error('Error fetching jobs from Google Sheets:', error);
    const { mockJobs } = await import('@/data/mockJobs');
    return mockJobs;
  }
}
