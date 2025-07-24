// smoothScroll.ts - Utility for smooth scrolling to sections
// Provides smooth scrolling functionality for navigation links

export const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
};

export const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
  e.preventDefault();
  scrollToSection(sectionId);
};
