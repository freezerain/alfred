import { log, loge, telegramMessageHandler } from '#main';

const TAG = 'telegramHandlerRouter';
// all update types can be found here
// https://core.telegram.org/bots/api#update
// message
// edited_message
// inline_query
// chosen_inline_result
// callback_query
// poll
// poll_answer

export default function handleUpdate(update, env) {
	log(TAG, 'processing update', update);
	if ('message' in update) {
		return telegramMessageHandler(update, env);
	} /*else if ('poll' in update && update.poll.total_voter_count === 4) {
		return handlePollUpdate(update, env);
	}*/ else {
		throw new Error(`update type not supported: ${update}`);
	}
}
