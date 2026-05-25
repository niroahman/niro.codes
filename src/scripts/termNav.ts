type Route = { href: string; external: boolean; el: HTMLAnchorElement };

export function initTermNav(opts?: { onFreeInput?: (cmd: string) => void }): {
  removeRoute: (key: string) => void;
  destroy: () => void;
} {
  const routes = new Map<string, Route>();

  document.querySelectorAll<HTMLAnchorElement>('[data-key]').forEach((el) => {
    if (el.style.display === 'none') return;
    routes.set(el.dataset.key!, {
      href: el.getAttribute('href') ?? '/',
      external: el.target === '_blank',
      el,
    });
  });

  const keys = [...routes.keys()];
  const display = document.getElementById('nav-prompt-input');
  let buffer = '';
  let selectedIndex = -1;

  function updateDisplay(): void {
    if (display) display.textContent = buffer;
  }

  function setSelected(index: number): void {
    routes.forEach(({ el }) => el.removeAttribute('data-selected'));
    selectedIndex = index;
    if (index >= 0 && index < keys.length) {
      routes.get(keys[index])?.el.setAttribute('data-selected', '');
    }
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

  routes.forEach(({ el }, key) => {
    const index = keys.indexOf(key);
    el.addEventListener('mouseenter', () => setSelected(index));
    el.addEventListener('mouseleave', () => setSelected(-1));
  });

  const handleKeydown = (e: KeyboardEvent) => {
    if (e.ctrlKey || e.altKey || e.metaKey) return;

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (keys.length > 0) setSelected((selectedIndex + 1) % keys.length);
      return;
    }

    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (keys.length > 0) setSelected((selectedIndex - 1 + keys.length) % keys.length);
      return;
    }

    if (e.key === 'Escape') {
      buffer = '';
      updateDisplay();
      setSelected(-1);
      return;
    }

    if (e.key === 'Backspace') {
      buffer = buffer.slice(0, -1);
      updateDisplay();
      return;
    }

    if (e.key === 'Enter') {
      if (selectedIndex >= 0) {
        navigate(keys[selectedIndex]);
        setSelected(-1);
      } else if (!navigate(buffer)) {
        opts?.onFreeInput?.(buffer);
      }
      buffer = '';
      updateDisplay();
      return;
    }

    if (e.key.length !== 1) return;

    buffer += e.key;
    updateDisplay();
    navigate(buffer);
  };

  document.addEventListener('keydown', handleKeydown);

  function removeRoute(key: string): void {
    const route = routes.get(key);
    if (!route) return;
    route.el.style.display = 'none';
    routes.delete(key);
    const idx = keys.indexOf(key);
    if (idx >= 0) {
      keys.splice(idx, 1);
      if (selectedIndex >= idx) selectedIndex = Math.max(-1, selectedIndex - 1);
    }
  }

  return {
    removeRoute,
    destroy: () => document.removeEventListener('keydown', handleKeydown),
  };
}
