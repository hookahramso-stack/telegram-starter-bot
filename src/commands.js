
import { InlineKeyboard } from "grammy"

export function registerCommands(bot) {
  bot.command("start", async (ctx) => {
    const keyboard = new InlineKeyboard()
      .text("Предложить публикацию", "submit")
      .row()
      .text("Предложить репост", "repost")
      .row()
      .text("Правила сообщества", "rules")

    await ctx.reply(
      `Добро пожаловать в «СИГАРНУЮ РЕДАКЦИЮ»!

Сигарный мир глазами тех, кто им живёт.

Предложить может каждый. Публикует редакция.

Выбери, что хочешь сделать:`,
      { reply_markup: keyboard }
    )
  })

  bot.command("help", (ctx) =>
    ctx.reply("Приёмная «СИГАРНОЙ РЕДАКЦИИ».\n/start — открыть меню\n/id — узнать свой ID")
  )

  bot.command("id", (ctx) =>
    ctx.reply(`Chat ID: ${ctx.chat.id}\nYour ID: ${ctx.from?.id ?? "unknown"}`)
  )

  bot.command("ping", (ctx) => ctx.reply("Я на связи!"))

  bot.callbackQuery("submit", (ctx) =>
    ctx.answerCallbackQuery().then(() =>
      ctx.reply("Отправь фотографии и текст публикации одним сообщением или несколькими сообщениями.")
    )
  )

  bot.callbackQuery("repost", (ctx) =>
    ctx.answerCallbackQuery().then(() =>
      ctx.reply("Пришли ссылку на публикацию или перешли сообщение из другого канала.")
    )
  )

  bot.callbackQuery("rules", (ctx) =>
    ctx.answerCallbackQuery().then(() =>
      ctx.reply("Все материалы проходят предварительную модерацию редакцией. Отправляя материал, ты подтверждаешь право на его публикацию.")
    )
  )

  bot.on("message:text", async (ctx) => {
    if (ctx.message.text.startsWith("/")) return
    await ctx.reply("Чтобы начать, используй команду /start.")
  })
}
