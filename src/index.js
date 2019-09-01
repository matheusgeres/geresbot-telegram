let bb = require('bot-brother');
let credentials = require('../credentials/telegram');

let bot = bb({
  key: credentials.key,
  sessionManager: bb.sessionManager.memory(),
  polling: { interval: 0, timeout: 1 }
});

// Let's create command '/start'.
bot.command('start')
.invoke(function (ctx) {
  // Setting data, data is used in text message templates.
  ctx.data.user = ctx.meta.user;
  // Invoke callback must return promise.
  return ctx.sendMessage('Oi <%=user.first_name%>. Como você está? :D');
})
.answer(function (ctx) {
  ctx.data.answer = ctx.answer;
  // Returns promise.
  return ctx.sendMessage('Show!! Entendi. Você se sente <%=answer%>');
});

// Creating command '/upload_photo'.
bot.command('upload_photo')
.invoke(function (ctx) {
  return ctx.sendMessage('Me mande uma foto, por favor!');
})
.answer(function (ctx) {
  // ctx.message is an object that represents Message.
  // See https://core.telegram.org/bots/api#message 
  return ctx.sendPhoto(ctx.message.photo[0].file_id, {caption: 'Eu peguei a sua foto! :P'});
});