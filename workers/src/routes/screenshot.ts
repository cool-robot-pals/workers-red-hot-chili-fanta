import puppeteer from '@cloudflare/puppeteer';

export const screenshotPage = async (env, url) => {
	let img;

	const browser = await puppeteer.launch(env.MYBROWSER);
	const page = await browser.newPage();
	await page.setViewport({ width: 4400, height: 2500 });
	await page.goto(url + 'html');
	await page.waitForSelector('.edibles', { timeout: 5_000 });
	img = await page.screenshot();
	await browser.close();
	return new Response(img, {
		headers: {
			'content-type': 'image/jpeg',
		},
	});
};
