export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const skillSlug = resolvedParams?.skill || 'skill';

  const formattedTitle = skillSlug
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return {
    title: `Learn ${formattedTitle} – Interactive Roadmap, Code Examples & Notes | Notiya`,
    description: `Master ${formattedTitle} with step-by-step tutorials, annotated code examples, common debugging patterns, and interview questions on Notiya.`,
    alternates: {
      canonical: `https://www.notiya.in/premium-resources/${skillSlug}`,
    },
  };
}

export default function SkillTrackLayout({ children }) {
  return <>{children}</>;
}