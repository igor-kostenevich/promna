export function useScrollTo() {
  const scrollToElement = (elementId: string, offset = 24) => {
    const targetElement = document.getElementById(elementId);
    const header = document.querySelector('header');

    if (targetElement) {
      const headerHeight = header ? header.offsetHeight : 0;
      const elementPosition =
        targetElement.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - headerHeight - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  return { scrollToElement };
}
