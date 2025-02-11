import { Router } from 'itty-router';
import { HTMLRoute } from './routes/html';
import { makePost, makeProduct } from './lib/make-product';
import { screenshotPage } from './routes/screenshot';

export default {
	async fetch(request, env) {
		const router = Router()
			.get('/html', async () => {
				const post = await makeProduct().then(makePost);
				return HTMLRoute(post);
			})
			.get('/', async (_, env) => {
				const page = await screenshotPage(env, request.url);
				return page;
			})
			.all('*', () => new Response('Not Found.', { status: 404 }));

		return router.handle(request, env);
	},
};
