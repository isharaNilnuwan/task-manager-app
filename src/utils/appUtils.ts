import moment from "moment";

export function getFirstAndLastInitials(str: string) {
  str = str.trim();
  const words = str.split(/\s+/);

  if (words.length === 0) return "";
  const firstWord = words[0];
  const lastWord = words[words.length - 1];

  const firstInitial = firstWord.charAt(0).toUpperCase();
  const lastInitial = lastWord.charAt(0).toUpperCase();

  return `${firstInitial}${lastInitial}`;
}

export function formatDate(date: Date, format: string) {
  return moment(date).format(format);
}

export function get_M_D_Format(date: Date) {
  return formatDate(date, "MMM DD");
}

export function get_D_M_Y_Format(date: Date) {
  return formatDate(date, "DD MMMM YYYY");
}

export function getRemainingTimeText(dueDate: Date) {
    const now = moment();
    const due = moment(dueDate);
  
    const daysDifference = due.diff(now, 'days');
  
    if (daysDifference > 1) {
      return `Should complete within ${daysDifference} days`;
    } else if (daysDifference === 1) {
      return "Should complete within tomorrow";
    } else if (daysDifference === 0) {
      return "Should complete within today";
    } else if (daysDifference === -1) {
      return "Should’ve completed yesterday";
    } else {
      return `Should’ve completed ${Math.abs(daysDifference)} days ago`;
    }
  }