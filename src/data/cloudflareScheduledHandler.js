import { log, TelegramApi, loge, scheduledRouter } from '#main';

const TAG = 'cloudflareScheduledHandler';
const IS_REPORTING_EXCEPTIONS = false
export default async function handle(event, env) {
	log(TAG, 'handling scheduled request', event);

	return new Promise((resolve, reject) => {
		resolve( {
			cron: event.cron,
			scheduledTime: event.scheduledTime, //new Date(event.scheduledTime).
			env: env
		})
	}).then((metadata) => scheduledRouter(metadata))
		.catch(e => {
			loge(TAG, 'error routing event request', e.message, e.stack);
			// TODO Add custom exceptions
			//and filter them here
			return exceptionReport(e.message, env);
		}).finally(() => {
			return new Response('OK');
		});
}

// secret: DEV_CHAT_ID
function exceptionReport(msg, env) {
	if(!IS_REPORTING_EXCEPTIONS) {
		return;
	}
	const tgApi = new TelegramApi(env.TELEGRAM_BOT_TOKEN);
	const chat_id = env.DEV_CHAT_ID;
	return tgApi.sendMessage({chat_id: chat_id, text: msg})
		.then(resp => loge(TAG, 'exception callback sent'))
		.catch(e => loge(TAG, 'error reporting exception to dev chat'));
}
