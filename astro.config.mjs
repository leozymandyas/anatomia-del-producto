// @ts-check
import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

/** Abre en nueva pestaña cualquier enlace que apunte a http(s):// */
function externalLinks() {
	return function (/** @type {any} */ tree) {
		function walk(/** @type {any} */ node) {
			if (node.type === 'element' && node.tagName === 'a') {
				const href = node.properties?.href ?? '';
				if (/^https?:\/\//.test(href)) {
					node.properties.target = '_blank';
					node.properties.rel = 'noopener noreferrer';
				}
			}
			(node.children ?? []).forEach(walk);
		}
		walk(tree);
	};
}

export default defineConfig({
	site: 'https://anatomia-del-producto.com',
	markdown: {
		rehypePlugins: [externalLinks],
	},
	integrations: [
		starlight({
			title: 'Anatomía del Producto',
			description: 'Creación de productos digitales en la era de la inteligencia artificial.',
			defaultLocale: 'root',
			locales: {
				root: { label: 'Español', lang: 'es' },
			},
			head: [
				{ tag: 'link', attrs: { rel: 'preconnect', href: 'https://fonts.googleapis.com' } },
				{ tag: 'link', attrs: { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true } },
				{
					tag: 'link',
					attrs: {
						rel: 'stylesheet',
						href: 'https://fonts.googleapis.com/css2?family=Alegreya:ital,wght@0,400;0,700;1,400&family=PT+Serif:ital,wght@0,400;0,700;1,400&family=Lato:wght@300;400;700&display=swap',
					},
				},
				{
					tag: 'link',
					attrs: { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg?v=2' },
				},
				{
					tag: 'script',
					content: 'document.title = "Anatomía del Producto";',
				},
			],
			favicon: '/favicon.svg',
			logo: { src: './src/assets/logo.svg', alt: 'Anatomía del Producto', replacesTitle: false },
			customCss: ['./src/styles/custom.css'],
			components: {
				Head: './src/components/overrides/Head.astro',
				Header: './src/components/overrides/Header.astro',
				Sidebar: './src/components/overrides/Sidebar.astro',
				PageSidebar: './src/components/overrides/PageSidebar.astro',
				MarkdownContent: './src/components/overrides/MarkdownContent.astro',
				MobileMenuFooter: './src/components/overrides/MobileMenuFooter.astro',
				Footer: './src/components/overrides/Footer.astro',
				PageTitle: './src/components/overrides/PageTitle.astro',
			},
			sidebar: [
				{
					label: 'Anatomía del producto',
					items: [
						{ label: 'Inicio', link: '/' },
						{ label: 'Contacto', link: '/contacto/' },
					],
				},
				{
					label: 'Cabeza',
					items: [
						{ autogenerate: { directory: 'cabeza' } },
					],
				},
				{
					label: 'Caja torácica',
					items: [{ autogenerate: { directory: 'caja-toracica' } }],
				},
				{
					label: 'Extremidades',
					items: [{ autogenerate: { directory: 'extremidades' } }],
				},
				{
					label: 'Todos los artículos',
					link: '/articulos/',
					attrs: { class: 'sidebar-sep-link' },
				},
				{
					label: 'Tags',
					link: '/tags/',
				},
			],
		}),
	],
});
