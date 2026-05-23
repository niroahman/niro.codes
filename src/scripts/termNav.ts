type Route = { href: string; external: boolean };

export function initTermNav(): void {
  const routes = new Map<string, Route>();

  document.querySelectorAll<HTMLAnchorElement>('[data-key]').forEach((el) => {
    routes.set(el.dataset.key!, {
      href: el.getAttribute('href') ?? '/',
      external: el.target === '_blank',
    });
  });

  if (routes.size === 0) return;

  const maxKeyLen = Math.max(...[...routes.keys()].map((k) => k.length));
  const display = document.getElementById('nav-prompt-input');
  let buffer = '';

  function updateDisplay(): void {
    if (display) display.textContent = buffer;
  }

  function navigate(key: string): boolean {
    const route = routes.get(key);
    if (!route) return false;
    buffer = '';
    updateDisplay();
    if (route.external) {
      window.open(route.href, '_blank', 'noopener,noreferrer');
    } else {
      window.location.href = route.href;
    }
    return true;
  }

  document.addEventListener('keydown', (e: KeyboardEvent) => {
    if (e.ctrlKey || e.altKey || e.metaKey) return;

    if (e.key === 'Escape') {
      buffer = '';
      updateDisplay();
      return;
    }

    if (e.key === 'Backspace') {
      buffer = buffer.slice(0, -1);
      updateDisplay();
      return;
    }

    if (e.key === 'Enter') {
      navigate(buffer);
      buffer = '';
      updateDisplay();
      return;
    }

    if (e.key.length !== 1) return;

    buffer += e.key;
    updateDisplay();

    if (navigate(buffer)) return;

    const hasPrefix = [...routes.keys()].some((k) => k.startsWith(buffer));
    if (!hasPrefix || buffer.length >= maxKeyLen) {
      buffer = '';
      updateDisplay();
    }
  });
}
