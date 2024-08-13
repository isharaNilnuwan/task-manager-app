export function getFirstAndLastInitials(str: string) {
    str = str.trim();
    const words = str.split(/\s+/);

    if (words.length === 0) return '';    
    const firstWord = words[0];
    const lastWord = words[words.length - 1];

    const firstInitial = firstWord.charAt(0).toUpperCase();
    const lastInitial = lastWord.charAt(0).toUpperCase();

    return `${firstInitial}${lastInitial}`;
}