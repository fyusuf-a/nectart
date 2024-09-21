import { redirect } from '@sveltejs/kit';

/** @type {import('@sveltejs/kit').LayoutServerLoad} */
export function load({ url }: { url: URL }) {
  const path = url.pathname;
  if (path.startsWith('/')) redirect(302, '/product');
}
