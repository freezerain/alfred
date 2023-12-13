/**
 * `npm run dev` to start a server at http://localhost:8787/
 * `npm run deploy` to publish
 * `npm update @cloudflare/ai --save-dev` update AI
 * `npx wrangler tail --format=pretty` to observe logs
 * https://developers.cloudflare.com/workers/
 */

import { log, loge, cloudflareEventRequestHandler } from './main.mjs';

const TAG = 'index.js';

const Env = {
	AI: null
};

export default {
	async fetch(request, env, ctx) {
		log(TAG, 'worker request received', request);
		return cloudflareEventRequestHandler(request, env);
	}
};

