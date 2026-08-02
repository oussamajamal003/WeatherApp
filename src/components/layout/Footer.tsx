import React from 'react';

export const Footer = React.memo(function Footer() {
  return (
    <footer className="w-full border-t border-border-subtle py-12 px-8 md:px-12 lg:px-16 bg-surface shrink-0">
      <div className="max-w-[1280px] mx-auto text-center text-text-secondary text-small">
        &copy; {new Date().getFullYear()} WeatherApp. All rights reserved.
      </div>
    </footer>
  );
});
