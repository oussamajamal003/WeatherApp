export function Footer() {
  return (
    <footer className="w-full border-t border-border-subtle py-6 px-4 md:px-6 lg:px-8 bg-surface shrink-0">
      <div className="max-w-[1280px] mx-auto text-center text-text-secondary text-small">
        &copy; {new Date().getFullYear()} WeatherApp. All rights reserved.
      </div>
    </footer>
  );
}
