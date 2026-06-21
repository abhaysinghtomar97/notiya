export function getPageType(course, slug) {
  const config = {
    btech: {
      hasBranch: true
    },
    bca: {
      hasBranch: false
    },
    bba: {
      hasBranch: false
    },
    mba: {
      hasBranch: false
    },
    mca: {
      hasBranch: false
    }
  };

  const c = config[course];

  if (!c) return null;

  if (c.hasBranch) {
    
    if (slug.length === 1) {
      return {
        type: "branch",
        branch: slug[0]
      };
    }

    if (slug.length === 2) {
      return {
        type: "subject",
        branch: slug[0],
        subject: slug[1]
      };
    }

    return null;
  }

  if (slug.length === 1) {
    return {
      type: "subject",
      subject: slug[0]
    };
  }

  return null;
}