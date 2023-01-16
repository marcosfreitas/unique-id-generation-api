export const formatDate = (date: Date): string => {
  const month = new Intl.DateTimeFormat('en-US', {
    month: 'long',
  }).format(date);
  const day = new Intl.DateTimeFormat('en-US', {
    day: '2-digit',
  }).format(date);
  const year = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
  }).format(date);

  return `${month} ${day}, ${year}`;
};
