const years = [
  'AKTU-1st-year',
  'AKTU-2nd-year',
  'AKTU-3rd-year',
  'AKTU-4th-year',
];

const branches = [
  'CSE',
  'CS',
  'IT',
  'ECE',
  'CS-AI',
  'CS-AIML'
];

export default function sitemap() {
  const urls = [];

  // Home
  urls.push({
    url: 'https://notiya-seven.vercel.app',
    lastModified: new Date(),
  });

  // Main study material page
  urls.push({
    url: 'https://notiya-seven.vercel.app/btech-study-material',
    lastModified: new Date(),
  });

  for (const year of years) {
    // Year page
    urls.push({
      url: `https://notiya-seven.vercel.app/btech-study-material/${year}`,
      lastModified: new Date(),
    });

    for (const branch of branches) {
      // Branch page
      urls.push({
        url: `https://notiya-seven.vercel.app/btech-study-material/${year}/${branch}`,
        lastModified: new Date(),
      });

      // Notes page
      urls.push({
        url: `https://notiya-seven.vercel.app/btech-study-material/${year}/${branch}/notes`,
        lastModified: new Date(),
      });

      // PYQ page (if exists)
      urls.push({
        url: `https://notiya-seven.vercel.app/btech-study-material/${year}/${branch}/pyq`,
        lastModified: new Date(),
      });
    }
  }

  return urls;
}