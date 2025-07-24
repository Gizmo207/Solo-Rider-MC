// smoothScroll.ts - Utility for smooth scrolling to sections
// Provides smooth scrolling functionality for navigation links

export const scrollToSection = (sectionId: string) => {
  console.log('Scrolling to section:', sectionId);
  const element = document.getElementById(sectionId);
  console.log('Found element:', element);
  
  if (element) {
    // Account for fixed header height (64px = h-16)
    const headerHeight = 64;
    const elementPosition = element.offsetTop - headerHeight;
    console.log('Scrolling to position:', elementPosition);
    
    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth'
    });
  } else {
    console.error('Element not found with ID:', sectionId);
  }
};

export const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
  console.log('handleSmoothScroll called with:', sectionId);
  e.preventDefault();
  scrollToSection(sectionId);
};
