
import { writable } from "svelte/store";
import { get } from 'svelte/store';
import { stores } from '@sapper/app';

export const current = writable();
export const prev = writable();
export const headerOffset = writable();

export const init = () => {
  const { page } = stores();

  page.subscribe($page => {
    prev.set(get(current));
    current.set($page);
  });
};

export const forwardRoutes = ['/blog'];
export const lateralRoutes = ['/', '/about', '/blog'];

export const isLateral = () => {
  const p = get(prev);
  const c = get(current);
  if (p && p.path && c && c.path) {
    return lateralRoutes.includes(c.path) && !isBack();
  }
  return false; 
};

export const isBack = () => {
  const p = get(prev);
  const c = get(current);
  if (p && p.path && c && c.path) {
    return p.path.indexOf(c.path) !== -1 && forwardRoutes.includes(c.path);
  }
  return false;
};