bot.on("message:text", async (ctx) => {
  if (ctx.message.text.startsWith("/")) return
  await ctx.reply("Чтобы начать, используй команду /start.")
})
