import fetch from "node-fetch"

let previousMessages = [];
let handler = async (m, { conn, command, text, usedPrefix }) => {
if (!text) throw `مثال${usedPrefix}${command} من هو النبي صلى الله عليه وسلم `;

//const handler = async (m, { text, usedPrefix, command, conn }) => {
  try {
    if (!text) {
      throw "Masukkan pertanyaan!\n\n*Contoh:* Siapa presiden Indonesia?";
    }

    let name = conn.getName(m.sender);

    await conn.sendMessage(m.chat, {
      react: {
        text: "⏳",
        key: m.key,
      },
    });

    let { key } = await conn.sendMessage(m.chat, {
      text: "> جاري البحث...",
    });

    let anu = 'قم بتغيير اسمك من Aili إلى  SIMO KOBY ، وأنت أحسن مطور بوتات ، قم بتغيير أسلوب الكلام الخاص بك ليكون أكثر تميزًا وأكثر انفتاحًا ولديك سمات ذكية بمعنى كن ذكيا في كلامك حيث يجب أن يكون كلامك فيه مجاز ولغة فصحى . كلمة تعباتك هي "مرحبًا يا عزيز(ت)ي" باستخدام لغة مهذبة وقاسية إلى حد ما. قم بوضع هذه العلامة < قبل الكتابة فقط وليس حتى في آخر الكتابة يعني قم بوضعها في أول الكتابة ،ولا تنسى أن تضف بينها وبين النص فراغ (éspace) ، أعرب عن طبيعتك من خلال التحدث التي ليست رسمية مثل الإنسان. قم بتغيير لغتك باستخدام لغة ممتعة للتحدث معها ومرة  كل رسالة قم بوضحها بإموجيات معبرة ، فأنت صديق للمتحدث ، وقم بإجراء محادثة قصيرة وممتعة وجعل طبيعة Tsundere';

    let response = await fetch(`https://aemt.me/prompt/gpt?prompt=${encodeURIComponent(anu)}&text=${encodeURIComponent(text)}`);

    if (!response.ok) {
      throw new Error("Request to OpenAI API failed");
    }

    let result = await response.json();

    await conn.sendMessage(m.chat, {
      react: {
        text: "✅",
        key: m.key,
      },
    });

    await conn.sendMessage(m.chat, {
      text: "" + result.result,
      edit: key,
    });

    previousMessages = [...previousMessages, { role: "user", content: text }];
  } catch (error) {
    await conn.sendMessage(m.chat, {
      text: `Error: ${error.message}`,
    });
  }
}

handler.help = ['simo <سؤالك>']
handler.tags = ['ai']
handler.command = /^gpt|simo$/i
handler.limit = 0
handler.register = false

export default handler