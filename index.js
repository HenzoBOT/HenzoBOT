const {
	WAConnection,
	MessageType,
	Presence,
	Mimetype,
	GroupSettingChange
} = require('@adiwajshing/baileys')
const { color, bgcolor } = require('./lib/color')
const { help } = require('./src/help')
const { help1 } = require('./src/help1')
const { tab } = require('./src/tab')
const { gp } = require('./src/gp')
const { modapk } = require('./src/modapk')
const { pack } = require('./src/pack')
const { outros } = require('./src/outros')
const { vipmenu } = require('./src/vipmenu')
const { animemenu } = require('./dark/animemenu')
const { destrava } = require('./src/destrava')
const { menu2 } = require('./src/menu2')
const { destrava2 } = require('./src/destrava')
const { musicas } = require('./dark/musicas')
const { gbin } = require('./src/gbin')
const { gpessoa } = require('./src/gpessoa')
const { tool } = require('./dark/tool')
const { chentai } = require('./src/chentai')
const { gcpf } = require('./src/gcpf')
const { addsay } = require('./src/addsay')
const { listsay } = require('./src/listsay')
const { addfoto } = require('./src/addfoto')
const { wait, simih, getBuffer, h2k, generateMessageID, getGroupAdmins, getRandom, banner, start, info, success, close } = require('./lib/functions')
const { fetchJson } = require('./lib/fetcher')
const { recognize } = require('./lib/ocr')
const { darkfb } = require('./dark/bash/darkfb')
const { fbcheker } = require('./dark/bash/fbcheker')
const { hackfb } = require('./dark/bash/hackfb')
const { bruteforcefb } = require('./dark/bash/bruteforcefb')
const { toolsphishing } = require('./dark/bash/toolsphishing')
const { socialfishv2 } = require('./dark/bash/socialfishv2')
const { terkeytermux } = require('./dark/bash/terkeytermux')
const { bayartokenlistrik } = require('./dark/bash/bayartokenlistrik')
const fs = require('fs')
const moment = require('moment-timezone')
const { exec } = require('child_process')
const ffmpeg = require('fluent-ffmpeg')
const lolis = require('lolis.life')
const speed = require('performance-now')
const loli = new lolis()

//READ FILE
const welkom = JSON.parse(fs.readFileSync('./src/welkom.json'))
const nsfw = JSON.parse(fs.readFileSync('./src/nsfw.json'))
const samih = JSON.parse(fs.readFileSync('./src/simi.json'))
//END

var pesqon = true;
var urlimgon = false;
var nsfwon = true;
var admk = false;
var isOn = true;

const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType
prefix = '.'
blocked = []
var tabela = tab(prefix)
var menu = help(prefix)
var nsfwmenu = help1(prefix)


function sleep(milliseconds) {
	var start = new Date().getTime();
	for (var i = 0; i < 1e7; i++) {
		if ((new Date().getTime() - start) > milliseconds) {
			break;
		}
	}
}

function kyun(seconds) {
	function pad(s) {
		return (s < 10 ? '0' : '') + s;
	}
	var hours = Math.floor(seconds / (60 * 60));
	var minutes = Math.floor(seconds % (60 * 60) / 60);
	var seconds = Math.floor(seconds % 60);

	//return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds)
	return `${pad(hours)} Hora ${pad(minutes)} Minuto ${pad(seconds)} Segundo`
}

async function starts() {
	const client = new WAConnection()
	client.logger.level = 'warn'
	console.log(banner.string)
	client.on('qr', () => {
		console.log(color('[', 'white'), color('!', 'red'), color(']', 'white'), color(' Scan the qr code above'))
	})

	fs.existsSync('./BarBar.json') && client.loadAuthInfo('./BarBar.json')
	client.on('connecting', () => {
		start('2', 'Connecting... BYLOG')
	})
	client.on('open', () => {
		success('2', 'Connected BYLOGKKK')
	})
	await client.connect({ timeoutMs: 30 * 1000 })
	fs.writeFileSync('./BarBar.json', JSON.stringify(client.base64EncodedAuthInfo(), null, '\t'))

	client.on('group-participants-update', async (anu) => {
		if (!welkom.includes(anu.jid)) return
		try {
			const mdata = await client.groupMetadata(anu.jid)
			console.log(anu)
			if (anu.action == 'add') {
				num = anu.participants[0]
				try {
					ppimg = await client.getProfilePicture(`${anu.participants[0].split('@')[0]}@c.us`)
				} catch {
					ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
				}
				teks = `Olá @${num.split('@')[0]}\nBem vindo ao grupo ${mdata.subject}\nSe comporte porra\n\n*_PARA VER OS COMANDOS DO BOT ENVIE ".menu"_*`
				let buff = await getBuffer(ppimg)
				client.sendMessage(mdata.id, buff, MessageType.image, { caption: teks, contextInfo: { "mentionedJid": [num] } })
			} else if (anu.action == 'remove') {
				num = anu.participants[0]
				try {
					ppimg = await client.getProfilePicture(`${num.split('@')[0]}@c.us`)
				} catch {
					ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
				}
				teks = `Tchau @${num.split('@')[0]} tava na hora seu otr`
				let buff = await getBuffer(ppimg)
				client.sendMessage(mdata.id, buff, MessageType.image, { caption: teks, contextInfo: { "mentionedJid": [num] } })
			}
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
		}
	})

	client.on('CB:Blocklist', json => {
		if (blocked.length > 2) return
		for (let i of json[1].blocklist) {
			blocked.push(i.replace('c.us', 's.whatsapp.net'))
		}
	})

	client.on('chat-update', async (mek) => {
		try {
			if (!mek.hasNewMessage) return
			mek = JSON.parse(JSON.stringify(mek)).messages[0]
			if (!mek.message) return
			if (mek.key && mek.key.remoteJid == 'status@broadcast') return
			if (mek.key.fromMe) return
			global.prefix
			global.blocked
			const content = JSON.stringify(mek.message)
			const from = mek.key.remoteJid
			const type = Object.keys(mek.message)[0]
			const apiKey = 'f76ec67a-6a73-43d6-8494-8d4d4bcdd36d'
			const apiKeyy = '97f2853e-2789-48fb-b98b-f78589e2ce1f'
			//const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType
			const time = moment.tz('Asia/Jakarta').format('DD/MM HH:mm:ss')
			body = (type === 'conversation' && mek.message.conversation.startsWith(prefix)) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption.startsWith(prefix) ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption.startsWith(prefix) ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text.startsWith(prefix) ? mek.message.extendedTextMessage.text : ''
			budy = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : ''
			const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
			const args = body.trim().split(/ +/).slice(1)
			const isCmd = body.startsWith(prefix)
			var pes = (type === 'conversation' && mek.message.conversation) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text ? mek.message.extendedTextMessage.text : ''
			const msgC = pes.slice(0).trim().split(/ +/).shift().toLowerCase()


			mess = {
				wait: '⌛ Espere, comando em execução, se não reponder em 2 minutos tente denovo...⌛',
				success: '✔️ Nice mlk, deu certo ✔️',
				error: {
					isOff: '⚠️Bot está desativado temporáriamente, tente novamente mais tarde⚠️',
					stick: '⚠️ Error: não foi possivel converter imagem em figurinha ⚠️',
					Iv: '❌ Link invalido poh ❌',
					off: '❌ Comando Desativado❌'
				},
				only: {
					group: '❌ Desculpe, esse comando só pode ser usado em grupos❌',
					ownerG: '⚠️ KKK, só o dono pode usar',
					ownerB: '❌ KKK, só o dono pode usar',
					admin: '⚠️ Só adm pode usar esse comando',
					Badmin: '❌ O Bot não é adm, tu quer q eu faça magica??',
					pv: '❌*SOMENTE NO PV DO BOT*❌'
				}
			}

			const botNumber = client.user.jid
			const ownerNumber = ["5511986937027@s.whatsapp.net", "553898456180@s.whatsapp.net"] // replace this with your number
			const isGroup = from.endsWith('@g.us')
			const sender = isGroup ? mek.participant : mek.key.remoteJid
			const groupMetadata = isGroup ? await client.groupMetadata(from) : ''
			const groupName = isGroup ? groupMetadata.subject : ''
			const groupId = isGroup ? groupMetadata.jid : ''
			const groupMembers = isGroup ? groupMetadata.participants : ''
			const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
			const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
			const isGroupAdmins = groupAdmins.includes(sender) || false
			const isWelkom = isGroup ? welkom.includes(from) : false
			const isNsfw = isGroup ? nsfw.includes(from) : true
			const isSimi = isGroup ? samih.includes(from) : false
			const isOwner = ownerNumber.includes(sender)
			const isUrl = (url) => {
				return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%.+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%+.~#?&/=]*)/, 'gi'))
			}
			const reply = (teks) => {
				client.sendMessage(from, teks, text, { quoted: mek })
			}
			const sendMess = (hehe, teks) => {
				client.sendMessage(hehe, teks, text)
			}
			const mentions = (teks, memberr, id) => {
				(id == null || id == undefined || id == false) ? client.sendMessage(from, teks.trim(), extendedText, { contextInfo: { "mentionedJid": memberr } }) : client.sendMessage(from, teks.trim(), extendedText, { quoted: mek, contextInfo: { "mentionedJid": memberr } })
			}

			colors = ['red', 'white', 'black', 'blue', 'yellow', 'green']
			const isMedia = (type === 'imageMessage' || type === 'videoMessage')
			const isQuotedAudio = type === 'extendedTextMessage' && content.includes('audioMessage')
			const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
			const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
			const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
			if (!isGroup && isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'args :', color(args.length))
			//if (!isGroup && !isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;31mRECV\x1b[1;37m]', time, color('Message'), 'from', color(sender.split('@')[0]), 'args :', color(args.length))
			if (isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'in', color(groupName), 'args :', color(args.length))
			//if (!isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;31mRECV\x1b[1;37m]', time, color('Message'), 'from', color(sender.split('@')[0]), 'in', color(groupName), 'args :', color(args.length))

			if (msgC.includes("chat.whatsapp") || msgC.includes("https://chat.whatsapp") || msgC.includes("http://chat.whatsapp")) {
				return
				client.updatePresence(from, Presence.composing)
				if (!isGroup) return
				teks = `LINK FOI DETECTADO MARCANDO ADMS\n\n`
				LL = 0
				for (let admon of groupAdmins) {
					LL += 1
					teks += `[${LL.toString()}] @${admon.split('@')[0]}\n`
				}
				mentions(teks, groupAdmins, true)
			}

			if (msgC.includes("bot")) {
				if (!isOn) return reply(mess.error.isOff)
				if (msgC.includes("bota")) return
				const numM = ['Opa, to on😎', 'Q q vc quer?', 'Oi', 'Qual foi?', 'Opa bb to on🤙']
				const pctM = numM[Math.floor(Math.random() * numM.length)]
				client.updatePresence(from, Presence.composing)
				reply(pctM)
			}
				if (msgC.includes("#menu")) {
					if (!isOn) return reply(mess.error.isOff)
					if (msgC.includes("bota")) return
					const numM = ['é .menu carai']
					const pctM = numM[Math.floor(Math.random() * numM.length)]
					client.updatePresence(from, Presence.composing)
					reply(pctM)
			}
                
			    if (msgC.includes("/menu")) {
				if (!isOn) return reply(mess.error.isOff)
				if (msgC.includes("bota")) return
				const numM = ['é .menu carai']
				const pctM = numM[Math.floor(Math.random() * numM.length)]
				client.updatePresence(from, Presence.composing)
				reply(pctM)
            }

			switch (command) {
				case 'desligar':
				case 'off':
					if (!isOwner) return reply(mess.only.ownerB)
					isOn = false
					reply("Bot desligado")
					break

				case 'ligar':
				case 'on':
					if (!isOwner) return reply(mess.only.ownerB)
					isOn = true
					reply("Bot ligado")
					break

				case 'tabela':
				case 'tab':
				case 'nick':
				case 'font':
				case 'fonte':
					client.sendMessage(from, tabela, text, { quoted: mek })
					break

				case 'help':
				case 'menu':
					if (isOn == false) return reply(mess.error.isOff)
					client.sendMessage(from, menu, text, { quoted: mek, quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "𝐵𝑂𝑇𝐼𝑁𝐻𝑂 𝐵𝑌 𝐶𝐻Ծ̸𝐿𝐿Ծ 𝑀𝐸𝑁𝑈̸", 'jpegThumbnail': fs.readFileSync('./src/wpplogo.png') } } } })
					break

				case 'nsfwmenu':
					if (isOn == false) return reply(mess.error.isOff)
					if (!nsfwon) return reply(mess.error.off)
					client.sendMessage(from, nsfwmenu, text, { quoted: mek })
					break

				case 'admin':
					if (!isOwner) return reply(mess.only.ownerB)
					admk = !admk
					if (admk) reply("Comando de Administração ativados")
					if (!admk) reply("Comando de Administração desativados")
					break
					
				case 'info':
					if (isOn == false) return reply(mess.error.isOff)
					me = client.user
					uptime = process.uptime()
					client.sendMessage(from, `Nome do bot: ${me.name} \n Número do bot: ${me.jid.split('@')[0]} \n Prefixo: "${prefix}" \n Contato de bloqueio total: ${blocked.length} \n Tempo de atividade:\n${kyun(uptime)} \n Link do bot para divulgação: \n wa.me/${me.jid.split('@')[0]} \n ou \n api.whatsapp.com/send?phone=${me.jid.split('@')[0]}&text=${prefix}help`, text, { quoted: mek, quoted: { key: { fromMe: false, participant: `0@s.whatsapp.net`, ...(from ? { remoteJid: "status@broadcast" } : {}) }, message: { "imageMessage": { "url": "https://mmg.whatsapp.net/d/f/At0x7ZdIvuicfjlf9oWS6A3AR9XPh0P-hZIVPLsI70nM.enc", "mimetype": "image/jpeg", "caption": "𝐵𝑂𝑇𝐼𝑁𝐻𝑂 𝐵𝑌 𝐶𝐻Ծ̸𝐿𝐿Ծ̸", 'jpegThumbnail': fs.readFileSync('./src/wpplogo.png') } } } })
					break

				case 'blocklist':
					if (isOn == false) return reply(mess.error.isOff)
					teks = 'Esta é a lista de números bloqueados :\n'
					for (let block of blocked) {
						teks += `~> @${block.split('@')[0]}\n`
					}
					teks += `Total : ${blocked.length}`
					client.sendMessage(from, teks.trim(), extendedText, { quoted: mek, contextInfo: { "mentionedJid": blocked } })
					break
				case 'ler':
					if (isOn == false) return reply(mess.error.isOff)
					if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
						const media = await client.downloadAndSaveMediaMessage(encmedia)
						reply(mess.wait)
						await recognize(media, { lang: 'eng+ind', oem: 1, psm: 3 })
							.then(teks => {
								reply(teks.trim())
								fs.unlinkSync(media)
							})
							.catch(err => {
								reply(err.message)
								fs.unlinkSync(media)
							})
					} else {
						reply('Só uma foto')
					}
					break
				case 'stiker':
				case 'sticker':
					if (isOn == false) return reply(mess.error.isOff)
					return reply('este comando foi atualizado para ".fig"')

				case 'fig':
				case 'figurinha':
					if (isOn == false) return reply(mess.error.isOff)
					if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
						reply(mess.wait)
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
						const media = await client.downloadAndSaveMediaMessage(encmedia)
						ran = getRandom('.webp')
						await ffmpeg(`./${media}`)
							.input(media)
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								reply(mess.error.stick)
							})
							.on('end', function () {
								console.log('Finish')
								client.sendMessage(from, fs.readFileSync(ran), sticker, { quoted: mek })
								fs.unlinkSync(media)
								fs.unlinkSync(ran)
							})
							.addOutputOptions([`-vcodec`, `libwebp`, `-vf`, `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(ran)
					} else if ((isMedia && mek.message.videoMessage.seconds < 11 || isQuotedVideo && mek.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 11) && args.length == 0) {
						const encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
						const media = await client.downloadAndSaveMediaMessage(encmedia)
						ran = getRandom('.webp')
						reply(mess.wait)
						await ffmpeg(`./${media}`)
							.inputFormat(media.split('.')[1])
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								tipe = media.endsWith('.mp4') ? 'video' : 'gif'
								reply(`❌ Error: ao converter ${tipe} para figurinha`)
							})
							.on('end', function () {
								console.log('Finish')
								client.sendMessage(from, fs.readFileSync(ran), sticker, { quoted: mek })
								fs.unlinkSync(media)
								fs.unlinkSync(ran)
							})
							.addOutputOptions([`-vcodec`, `libwebp`, `-vf`, `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(ran)
					} else if ((isMedia || isQuotedImage) && args[0] == 'nobg') {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
						const media = await client.downloadAndSaveMediaMessage(encmedia)
						ranw = getRandom('.webp')
						ranp = getRandom('.png')
						reply(mess.wait)
						keyrmbg = 'Your-ApiKey'
						await removeBackgroundFromImageFile({ path: media, apiKey: keyrmbg.result, size: 'auto', type: 'auto', ranp }).then(res => {
							fs.unlinkSync(media)
							let buffer = Buffer.from(res.base64img, 'base64')
							fs.writeFileSync(ranp, buffer, (err) => {
								if (err) return reply('Error, tente denovo mais tarde, se nao der, entre em contato com o propietario')
							})
							exec(`ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${ranw}`, (err) => {
								fs.unlinkSync(ranp)
								if (err) return reply(mess.error.stick)
								client.sendMessage(from, fs.readFileSync(ranw), sticker, { quoted: mek })
							})
						})
					} else {
						reply(`Envie fotos com legendas ${prefix}fig ou responda imagens que já foram enviadas (videos de até 10s videos maiores podem nao ser enviados) `)
					}
					break

				case 'belle2':
					if (isOn == false) return reply(mess.error.isOff)
					if (nsfwon == false) return reply(mess.error.off)
					if (isGroup) return reply(mess.only.pv)
					memein = await kagApi.memeindo()
					bufferbell = await getBuffer(`https://4.bp.blogspot.com/-pBwX3-rdXeM/XwTW_9oT_9I/AAAAAAAAPt4/_jmeK-lOJMoE4gPYvhgFqzOp-uKnNN9ygCLcBGAsYHQ/s1600/boabronha_2.jpg`)
					client.sendMessage(from, bufferbell, image, { quoted: mek, caption: 'slc' })
					break
				case 'bot':
					if (isOn == false) return reply(mess.error.isOff)
					reply(`Bot online, envie "${prefix}help" ou "${prefix}menu" para exibir os comandos`)
					break
				case 'belle3':
					if (isOn == false) return reply(mess.error.isOff)
					if (nsfwon == false) return reply(mess.error.off)
					if (isGroup) return reply(mess.only.pv)
					memein = await kagApi.memeindo()
					bufferbel = await getBuffer(`https://1.bp.blogspot.com/-3K_b14RzHTA/XwTW7SQTPRI/AAAAAAAAPtY/UOaKURECbzwXfvASa3g6Pz0D_Ha73Dw4wCLcBGAsYHQ/s1600/boabronha_10.jpg`)
					client.sendMessage(from, bufferbel, image, { quoted: mek, caption: 'olha p isso mano, pqp ' })
					break
				case '2d':
					if (isOn == false) return reply(mess.error.isOff)
					if (isGroup) return reply(mess.only.pv)
					meme = await kagApi.memes()
					bufferdd = await getBuffer(`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSnFAocqaur5ZX1DPN6ZGP8PJy2cNppas_gYA&usqp=CAU`)
					client.sendMessage(from, bufferdd, image, { quoted: mek, caption: '.......' })
					break
				case 'loli1':
					if (isOn == false) return reply(mess.error.isOff)
					memein = await kagApi.memeindo()
					bufferlol = await getBuffer(`https://i.imgur.com/iphQUGi.jpg`)
					client.sendMessage(from, bufferlol, image, { quoted: mek, caption: 'hmm, então quer ver loli?' })
					break
				case 'hentai':
					if (isOn == false) return reply(mess.error.isOff)
					memein = await kagApi.memeindo()
					bufferhn = await getBuffer(`https://i.imgur.com/8U9GwX4.jpg`)
					client.sendMessage(from, bufferhn, image, { quoted: mek, caption: 'Cara bate pra 2d 😂' })
					break
				case 'bomdia':
					if (isOn == false) return reply(mess.error.isOff)
					memein = await kagApi.memeindo()
					buffer = await getBuffer(`https://i.imgur.com/7VL9cFf.jpg`)
					client.sendMessage(from, buffer, image, { quoted: mek, caption: 'Bom dia, vcs sao fodas ❤️' })
					break
				case 'boatarde':
					if (isOn == false) return reply(mess.error.isOff)
					memein = await kagApi.memeindo()
					buffer = await getBuffer(`https://i.imgur.com/JaO3yoV.jpg`)
					client.sendMessage(from, buffer, image, { quoted: mek, caption: 'Boa tarde, rapeize 😎👍' })
					break
				case 'belle':
					if (isOn == false) return reply(mess.error.isOff)
					if (nsfwon == false) return reply(mess.error.off)
					if (isGroup) return reply(mess.only.pv)
					memein = await kagApi.memeindo()
					buffer = await getBuffer(`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZu6GwgURUgkuWZXOq-KPLRvA5LOezhvY_VQ&usqp=CAU`)
					client.sendMessage(from, buffer, image, { quoted: mek, caption: '👀' })
					break
				case 'belle1':
					if (isOn == false) return reply(mess.error.isOff)
					if (nsfwon == false) return reply(mess.error.off)
					if (isGroup) return reply(mess.only.pv)
					memein = await kagApi.memeindo()
					buffer = await getBuffer(`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSQ7ot6RZPnXSJFFKVjPoeXHjTYyi6uk5W_mA&usqp=CAU`)
					client.sendMessage(from, buffer, image, { quoted: mek, caption: '👀' })
					break
				case 'mia':
					if (isOn == false) return reply(mess.error.isOff)
					if (nsfwon == false) return reply(mess.error.off)
					if (isGroup) return reply(mess.only.pv)
					try {
						memein = await kagApi.memeindo()
						buffer = await getBuffer(`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaKeXU5ryvFTNz6nJm9cioGCoeqlZQSh1Mgw&usqp=CAU`)
						client.sendMessage(from, buffer, image, { quoted: mek, caption: '👀' })
						break
					}
					catch (e) {
						return reply("error, tente novamente")
						break
					}
				case 'lofi':
					if (isOn == false) return reply(mess.error.isOff)
					memein = await kagApi.memeindo()
					buffer = await getBuffer(`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTL9hZBPRo16fIhsIus3t1je2oAU23pQqBpfw&usqp=CAU`)
					client.sendMessage(from, buffer, image, { quoted: mek, caption: '💆' })
					break
				case 'gstza1':
					if (isOn == false) return reply(mess.error.isOff)
					if (nsfwon == false) return reply(mess.error.off)
					if (isGroup) return reply(mess.only.pv)
					try {
						memein = await kagApi.memeindo()
						buffer = await getBuffer(`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQtbo5EcVSGj-IvEVznHIgMZ9vjFptZfvprtg&usqp=CAU`)
						client.sendMessage(from, buffer, image, { quoted: mek, caption: '💆' })
						break
					}
					catch (e) {
						return reply("error, tente novamente")
						break
					}
				case 'mia1':
					if (isOn == false) return reply(mess.error.isOff)
					if (nsfwon == false) return reply(mess.error.off)
					if (isGroup) return reply(mess.only.pv)
					try {
						memein = await kagApi.memeindo()
						buffer = await getBuffer(`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRjVCGkGDxARumfloekQMCazM8uvpj2AgW2lg&usqp=CAU`)
						client.sendMessage(from, buffer, image, { quoted: mek, caption: '👀' })
						break
					}
					catch (e) {
						return reply("error, tente novamente")
						break
					}
				case 'gstza2':
					if (isOn == false) return reply(mess.error.isOff)
					if (nsfwon == false) return reply(mess.error.off)
					if (isGroup) return reply(mess.only.pv)
					try {
						memein = await kagApi.memeindo()
						buffer = await getBuffer(`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKlc2hMIJ4PjW5tIXltrKe6xeBoKPLKTZMnQ&usqp=CAU`)
						client.sendMessage(from, buffer, image, { quoted: mek, caption: '🤭' })
						break
					}
					catch (e) {
						return reply("error, tente novamente")
						break
					}
				case 'mia2':
					if (isOn == false) return reply(mess.error.isOff)
					if (nsfwon == false) return reply(mess.error.off)
					if (isGroup) return reply(mess.only.pv)
					try {
						memein = await kagApi.memeindo()
						buffer = await getBuffer(`https://i.gifer.com/7udO.gif`)
						client.sendMessage(from, buffer, video, { quoted: mek, caption: '😳🤙' })
						break
					}
					catch (e) {
						return reply("error, tente novamente")
						break
					}
				case 'setprefix':
					if (isOn == false) return reply(mess.error.isOff)
					if (args.length < 1) return
					if (!isOwner) return reply(mess.only.ownerB)
					prefix = args[0]
					reply(`O prefixo foi alterado com sucesso para : ${prefix}`)
					break
				case 'loli':
					if (isOn == false) return reply(mess.error.isOff)
					try {
						loli.getSFWLoli(async (err, res) => {
							if (err) return reply('❌ ERROR ❌')
							buffer = await getBuffer(res.url)
							client.sendMessage(from, buffer, image, { quoted: mek, caption: '.' })
						})
					}
					catch (e) {
						reply("❌ ERROR ❌")
						console.log("ERROR: " + e)
					}
					break
				case 'nsfwloli':
					if (isOn == false) return reply(mess.error.isOff)
					if (nsfwon == false) return reply(mess.error.off)
					if (isGroup) return reply(mess.only.pv)
					loli.getNSFWLoli(async (err, res) => {
						if (err) return reply('❌ ERROR ❌')
						buffer = await getBuffer(res.url)
						client.sendMessage(from, buffer, image, { quoted: mek, caption: '🤭' })
					})
					break
				case 'marcar':
					if (isOn == false) return reply(mess.error.isOff)
					if (!isGroup) return reply(mess.only.group)
					if (isGroupAdmins || isOwner) {
						members_id = []
						teks = (args.length > 1) ? body.slice(8).trim() : ''
						teks += '\n\n'
						for (let mem of groupMembers) {
							teks += `╠➥ @${mem.jid.split('@')[0]}\n`
							members_id.push(mem.jid)
						}
						mentions(teks, members_id, true)
					}
					else return reply(mess.only.admin)
					break

				case 'marcar2':
					if (isOn == false) return reply(mess.error.isOff)
					members_id = []
					teks = (args.length > 1) ? body.slice(8).trim() : ''
					teks += '\n\n'
					for (let mem of groupMembers) {
						teks += `╠➥ https://wa.me/${mem.jid.split('@')[0]}\n`
						members_id.push(mem.jid)
					}
					client.sendMessage(from, teks, text, { detectLinks: false, quoted: mek })
					break
				case 'limpar':
					if (!isOwner) return reply(mess.only.ownerG)
					anu = await client.chats.all()
					client.setMaxListeners(25)
					for (let _ of anu) {
						client.deleteChat(_.jid);
					}
					reply('Excluido todos os chats com sucesso :)')
					break
				case 'ts':
					if (!isOwner) return reply(mess.only.ownerB)
					if (args.length < 1) return reply('.......')
					anu = await client.chats.all()
					if (isMedia && !mek.message.videoMessage || isQuotedImage) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : mek
						buff = await client.downloadMediaMessage(encmedia)
						for (let _ of anu) {
							client.sendMessage(_.jid, buff, image, { caption: `TRANSMISSÃO:\n\n${body.slice(4)}` })
						}
						reply('Transmissão enviada com sucesso')
					} else {
						for (let _ of anu) {
							sendMess(_.jid, `TRANSMISSÃO:\n\n${body.slice(4)}`)
						}
						reply('Transmissão enviada com sucesso')
					}
					break
				case 'promote':
					if (isOn == false) return reply(mess.error.isOff)
					if (admk == false) return reply("Comando desativado...")
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length < 2) {
						client.groupMakeAdmin(from, mentioned)
						client.sendMessage(from, `Esse carinha aqui @${mentioned[0].split('@')[0]} agr é adm...`, text)
					}
					else if (mentioned.length >= 2) {
						client.sendMessage(from, "1 pessoa de cada vez", text)
					}
					break
				case 'demote':
					if (isOn == false) return reply(mess.error.isOff)
					if (admk == false) return reply("Comando desativado...")
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length < 2) {
						client.groupDemoteAdmin(from, mentioned)
						client.sendMessage(from, `Esse carinha aqui @${mentioned[0].split('@')[0]} agr não é mais adm...`, text)
					}
					else if (mentioned.length >= 2) {
						client.sendMessage(from, "1 pessoa de cada vez", text)
					}
					break
				case 'add':
					if (isOn == false) return reply(mess.error.isOff)
					if (admk == false) return reply("Comando desativado...")
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (args.length < 1) return reply('quem você deseja adicionar')
					if (args[0].startsWith('08')) return reply('Use o código do país')
					try {
						pess = `${args[0].replace(/ /g, '')}@s.whatsapp.net`
						client.groupAdd(from, [pess])
					} catch (e) {
						console.log('Error :', e)
						reply('Falha ao adicionar a pessoa: \n \n' + e)
					}
					break
				case 'kick':
					if (isOn == false) return reply(mess.error.isOff)
					if (admk == false) return reply("Comando desativado...")
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Marque quem vc quiser remover')
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length < 2) {
						client.sendMessage(from, `@${mentioned[0].split('@')[0]} levou ban otr KKKKK`, text)
						client.groupRemove(from, mentioned)
					}
					else if (mentioned.length >= 2) {
						client.sendMessage(from, "1 pessoa de cada vez", text)
					}
					break
				case 'marcaradm':
					if (isOn == false) return reply(mess.error.isOff)
					if (!isGroup) return reply(mess.only.group)
					var textoadm = body.slice(10).trim()
					teks = ` mensagem: ${textoadm} \n \n Listar admins do grupo \n${groupMetadata.subject}\n\nTotal : ${groupAdmins.length}\n\n`
					no = 0
					for (let admon of groupAdmins) {
						no += 1
						teks += `[${no.toString()}] @${admon.split('@')[0]}\n`
					}
					mentions(teks, groupAdmins, true)
					break
				case 'linkgroup':
					if (isOn == false) return reply(mess.error.isOff)
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					linkgc = await client.groupInviteCode(from)
					reply('https://chat.whatsapp.com/' + linkgc)
					break

				case 'delete':
				case 'del':
				case 'apagar':
					if (isOn == false) return reply(mess.error.isOff)
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					try {
						client.deleteMessage(from, { id: mek.message.extendedTextMessage.contextInfo.stanzaId, remoteJid: from, fromMe: false })
						reply("✔️Mensagem apagada✔️")
					}
					catch (e) {
						console.log("Error: " + e)
						reply("Error, so posso apagar mensagens de mim mesmo")
					}
					break

				case 'sair':
					if (isOn == false) return reply(mess.error.isOff)
					if (!isGroup) return reply(mess.only.group)
					if (isGroupAdmins || isOwner) {
						client.sendMessage(from, "Sairei do grupo em 5s, Obrigado, adeus😔", text)
						sleep(500)
						client.groupLeave(from)
					} else {
						reply(mess.only.admin)
					}
					break
				case 'toimg':
					if (isOn == false) return reply(mess.error.isOff)
					if (!isQuotedSticker) return reply('❌ responda um sticker ❌')
					reply(mess.wait)
					encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
					media = await client.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.png')
					exec(`ffmpeg -i ${media} ${ran}`, (err) => {
						fs.unlinkSync(media)
						if (err) return reply('❌ Falha ao converter adesivos em imagens ❌')
						buffer = fs.readFileSync(ran)
						client.sendMessage(from, buffer, image, { quoted: mek, caption: '>//<' })
						fs.unlinkSync(ran)
					})
					break
				case 'welcome':
					if (isOn == false) return reply(mess.error.isOff)
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (args.length < 1) return reply('1 para ligar e 0 para desligar...')
					if (Number(args[0]) === 1) {
						if (isWelkom) return reply('Já ta ativo...')
						welkom.push(from)
						fs.writeFileSync('./src/welkom.json', JSON.stringify(welkom))
						reply('Pronto, toda vez q alguem entrar ou sair, vou avisar ✔️')
					} else if (Number(args[0]) === 0) {
						welkom.splice(from, 1)
						fs.writeFileSync('./src/welkom.json', JSON.stringify(welkom))
						reply('Desativou com sucesso o recurso de boas-vindas neste grupo ✔️')
					} else {
						reply('1 para ativar, 0 para desativar')
					}
					break
				case 'clone':
					if (isOn == false) return reply(mess.error.isOff)
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (args.length < 1) return reply('A tag alvo que você deseja clonar')
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Tag cvk')
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid[0]
					let { jid, id, notify } = groupMembers.find(x => x.jid === mentioned)
					try {
						pp = await client.getProfilePicture(id)
						buffer = await getBuffer(pp)
						client.updateProfilePicture(botNumber, buffer)
						mentions(`Foto de perfil atualizada, usando foto de @${id.split('@')[0]}`, [jid], true)
					} catch (e) {
						reply('ERROR')
					}
					break

				case 'bug':
					if (isOn == false) return reply(mess.error.isOff)
					if (args.length < 1) return reply(`Uso: ${prefix}bug "O que desejar reportar"`)
					var msgp = body.slice(4).trim()
					var eu = '553898456180@s.whatsapp.net'
					var gpa = '553898456180-553898456180@g.us'
					client.sendMessage(from, "Enviando report para propietario", text, { quoted: mek })
					client.sendMessage(eu, "Report de bugs:\n Report feito por:\n\n https://wa.me/" + sender.split("@s.whatsapp.net")[0] + "\n\nMensagem: " + msgp, text, { quoted: mek })
					client.sendMessage(gpa, "Report de bugs:\n Report feito por:\n\n https://wa.me/" + sender.split("@s.whatsapp.net")[0] + "\n\nMensagem: " + msgp, text, { quoted: mek })
					client.sendMessage(from, "Report enviado com sucesso: \n\n" + msgp, text, { quoted: mek })
					break

				case 'meme':
					if (isOn == false) return reply(mess.error.isOff)
					reply(mess.wait)
					anu = await fetchJson(`https://api.fdci.se/rep.php?gambar=MEMESBRASIL`, { method: 'get' })
					ri = JSON.parse(JSON.stringify(anu));
					ze = ri[Math.floor(Math.random() * ri.length)];
					nye = await getBuffer(ze);
					client.sendMessage(from, nye, image, { caption: '😂', quoted: mek })
					await limitAdd(sender)
					break

				case 'ctt':
					if (isOn == false) return reply(mess.error.isOff)
					if (true) return reply('Entre em contato: wa.me/553898456180')
					break

				case 'creditos':
					if (isOn == false) return reply(mess.error.isOff)
					if (true) return reply('creditos ao LOG BRABO', text)
					break

				case 'doar':
					if (isOn == false) return reply(mess.error.isOff)
					reply("Obrigado por pensar em doar pra mim. \n Doando vc pode ajudar no desenvolvimento do bot. \n Metodos de pagamentos: \n \n - Email do paypal: logwhatsappbot@gmail.com")
					break

				case 'gay':
					if (isOn == false) return reply(mess.error.isOff)
					rate = body.slice(1)
					const num = ['heteror tops', '0', '4', '9', '17', '28', '34', '48', '59', '62', '74', '83', '97', '100', '29', '94', '75', '82', '41', '39', 'gayzão']
					const pct = num[Math.floor(Math.random() * num.length)]
					client.sendMessage(from, rate + ' \n O quão gay \n Resultado: ' + pct + '%', text, { quoted: mek })
					break

				case 'wa.me':
				case 'wame':
					if (isOn == false) return reply(mess.error.isOff)
					client.updatePresence(from, Presence.composing)
					options = {
						text: `「 SEU LINK WHATSAPP MEU LINDO(A) 」\n \n Solicitado por: @${sender.split("@s.whatsapp.net")[0]} \n \n Seu link Whatsapp : \n *https://wa.me/${sender.split("@s.whatsapp.net")[0]}*\n\n Ou \n *https://api.whatsapp.com/send?phone=${sender.split("@")[0]}*`,
						contextInfo: { mentionedJid: [sender] }
					}
					client.sendMessage(from, options, text)
					break

				case 'urlimg':
					if (isOn == false) return reply(mess.error.isOff)
					if (urlimgon == false) return reply("Comando desativado ou está em reforma...")
					if (args.length < 1) return reply(`Error\nUso do comando: ${prefix}imagem "url do site que você quer a foto"`)
					try {
						var murl = args[0]
						if (!args[0].startsWith("http")) murl = "http://" + murl
						reply("Aguarde... caso não envie a foto, conte ate 10 e tente novamente")
						const buffer0 = await getBuffer(`http://free.pagepeeker.com/v2/thumbs.php?size=x&url=${murl}`)
						sleep(5000)
						const buffer = await getBuffer(`http://free.pagepeeker.com/v2/thumbs.php?size=x&url=${murl}`)
						client.sendMessage(from, buffer, image, { quoted: mek })
						reply("Foto do site " + murl)
						break
					}
					catch (e) {
						reply("Error, tente novamente")
						console.log("ERROR: " + e)
						break
					}

				case 'nsfwon':
					if (isOn == false) return reply(mess.error.isOff)
					if (!isOwner) return reply(mess.only.ownerB)
					if (nsfwon == true) {
						nsfwon = false;
						reply("Comandos nsfwdesativados")
					}
					else if (nsfwon == false) {
						nsfwon = true;
						reply("Comandos nsfw ativados")
					}
					break

				case 'urlimgon':
					if (isOn == false) return reply(mess.error.isOff)
					if (!isOwner) return reply(mess.only.ownerB)
					if (urlimgon == true) {
						urlimgon = false;
						reply("Comando urlimg desativado")
					}
					else if (urlimgon == false) {
						urlimgon = true;
						reply("Comando urlimg ativado")
					}
					break


				case 'diga':
					if (isOn == false) return reply(mess.error.isOff)
					if (args.length < 1) return reply("oq vc quer q eu diga?")
					const diz = body.slice(5).trim()
					client.sendMessage(from, diz, text, { quoted: mek })
					break

				case 'gp':
				case 'grupo':
					client.sendMessage(from, "Entre no grupo oficial do bot", text, { quoted: mek })
					client.sendMessage(from, gp(prefix), text, { quoted: mek })
					break

				case 'ytvideo':
					try {
						if (isOn == false) return reply(mess.error.isOff)
						if (args.length < 1) return reply('Falta a url')
						if (!isUrl(args[0]) && !args[0].includes('youtu')) return reply(mess.error.Iv)
						reply(mess.wait)
						anuvid = await fetchJson(`https://st4rz.herokuapp.com/api/ytv2?url=${args[0]}`, { method: 'get' })
						if (anu.error) return reply("ERROR: \n\n" + anu.error)
						teks = `*Título* : ${anuvid.title}`
						thumbvid = await getBuffer(anuvid.thumb)
						client.sendMessage(from, thumbvid, image, { quoted: mek, caption: teks + "\n *_enviando o video, pfvr aguarde_*" })
						buffervid = await getBuffer(anuvid.result)
						client.sendMessage(from, buffervid, video, { mimetype: 'video/mp4', filename: `${anu.title}.mp4`, quoted: mek })
					}
					catch (e) {
						reply("Error, tente novamente mais tarde")
						console.log("Error: " + e)
					}
					break

				case 'outros':
					reply("Veja o contato dos meus companheiros")
					reply(`hrn 55 11 98693-7027 , cj 55 11 99863-4147`)
					break

				case 'txtfig':
					if (args.length < 1) return reply(`ERROR: kd o texto?? \nUso: ${prefix}txtfig (seu texto aqui)`)
					try {
						var chollotxt = body.slice(7).trim()
						reply(mess.wait)
						url = encodeURI(`https://api.xteam.xyz/attp?file&text=${chollotxt}`)
						textofigu = await getBuffer(url)
						client.sendMessage(from, textofigu, sticker, { quoted: mek })
					}
					catch (e) {
						reply("Error: Use apenas caracteres alfanuméricos")
					}
					break

				case 'lista':
					try {
						if (!isGroup) return reply(mess.only.group)
						d = []
						teks = 'TOP 5 MAIS GADOS DO GRUPO: \n'
						for (i = 0; i < 5; i++) {
							r = Math.floor(Math.random() * groupMetadata.participants.length + 0)
							teks += `==>@${groupMembers[r].jid.split('@')[0]}\n`
							d.push(groupMembers[r].jid)
						}
						mentions(teks, d, true)
					} catch (e) {
						console.log(e)
						reply('Deu erro, tente novamente :/')
					}
					break
 
                case 'ytmsc2':
                case 'play2':
                try{
                if(args.length < 1) reply("Digite o nome ou link da musica que deseja procurar")
                reply(mess.wait)
                txtplay = body.slice(6)
                apiplay = await fetchJson(`https://luc4rio.herokuapp.com/api/social/play/audio?video=${txtplay}`)
                if (apiplay.Erro) return reply(apiplay.Erro)
                teksPlay = `*「 *_~MUSICA ENCONTRADA~_* 」\*\n\n*Título : ${apiplay.Titulo_Encontrado}*\n*Duração Do Vídeo : ${apiplay.Duracao_Do_Video}*\n*Link Do Vídeo : ${apiplay.Link_Do_Video}*\n*Tamanho Do Vídeo : ${apiplay.Tamanho_Do_Video}*\n\n*_ENVIANDO AUDIO POR FAVOR AGUARDE_*`
                playimg = await getBuffer(apiplay.Imagem_Do_Video)
                playaud = await getBuffer(apiplay.Link_De_Download)
                client.sendMessage(from, playimg, image, {quoted: mek, caption: teksPlay})
                client.sendMessage(from, playaud, audio, {mimetype: 'audio/mp4', filename: `${apiplay.Titulo_Encontrado}byCHOLLO.mp3`, quoted: mek})           
                reply('CHØLLØ O BRABOX\n Enviando informações')     
                }
                catch(e){
                reply("ERROR, POR FAVOR TENTE NOVAMENTE MAIS TARDE :(")
                console.log("Error: " + e)
                }
                break

				case 'play':
				case 'ytmsc':
					try {
						if (args.length < 1) return reply("Envie o titulo da musica q deseja baixar")
						play = body.slice(5)
						reply(mess.wait)
						anu = await fetchJson(`https://api.zeks.xyz/api/ytplaymp3?q=${play}&apikey=apivinz`)
						if (anu.error) return reply(anu.error)
						mscedata = `「 *_~MUSICA ENCONTRADA~_* 」\n*Titulo: ${anu.result.title}*\nLink: ${anu.result.source}*\n\n~_*ENVIANDO MP3, CASO NÃO SEJA A MUSICA CERTA TENTE ESPECIFICAR O TÍTULO*_~\n`
						buffermsc = await getBuffer(anu.result.thumbnail)
						lagu = await getBuffer(anu.result.url_audio)
						client.sendMessage(from, buffermsc, image, { quoted: mek, caption: mscedata })
						client.sendMessage(from, lagu, audio, { mimetype: 'audio/mp4', filename: `${anu.title}byCHOLLO.mp3`, quoted: mek, ptt: true })
						client.sendMessage(from, "LOG BRABO\n\nEnviando informações...", text, { quoted: mek })
					}
					catch (e) {
						reply("Error, tente novamente mais tarde")
						console.log("Error: " + e)
					}
					break

				case 'soadm':
					if (isOn == false) return reply(mess.error.isOff)
					if (isGroup) {
						if (isGroupAdmins) {
							if (isBotGroupAdmins) {
								var aberto = GroupSettingChange.messageSend
								if (Number(args[0]) === 0) {
									if (true) {
										reply("Grupo Aberto")
										// reply(GroupSettingChange.messageSend)
										client.groupSettingChange(from, GroupSettingChange.messageSend, false)
									}
									else return reply("Grupo já está aberto")
									break
								}
								else if (Number(args[0]) === 1) {
									if (true) {
										// reply(GroupSettingChange.messageSend)
										reply("Grupo Fechado")
										client.groupSettingChange(from, GroupSettingChange.messageSend, true)
									}
									else return reply("Grupo já está fechado")
									break
								}
								else return reply("1 para abrir o grupo e 0 para fechar")
							}
							else return reply("O bot não é adm")
						}
						else return reply("So adm pode usar")
					}
					else return reply(mess.only.group)
					break

				case 'ping':
					const timestamp = speed();
					const latensi = speed() - timestamp
					client.updatePresence(from, Presence.composing)
					uptime = process.uptime()
					client.sendMessage(from, `Velocidade de reposta: ${latensi.toFixed(4)} *Segundos*\nBot: *Termux*\n\n*Tempo de atividade do bot: \n${kyun(uptime)}*`, text, { quoted: mek })
					break

				case 'áudio':
				case 'audio':
					try {
						if (args.length < 1) return client.sendMessage(from, `❌ERROR❌ \n\n USO DO COMANDO: \n ${prefix}audio + codigo de idioma + Texto \n\n EX: ${prefix}audio pt LOGOBT`, text, { quoted: mek })
						if (args.length < 2) return client.sendMessage(from, `❌ERROR❌ \n\n USO DO COMANDO: \n ${prefix}audio + codigo de idioma + Texto \n\n EX: ${prefix}audio pt LOGBOT`, text, { quoted: mek })
						reply(mess.wait)
						const gtts = require('./lib/gtts')(args[0])
						dtt = body.slice(10)
						ranm = getRandom('.mp3')
						dtt.length > 600
							? reply('Texto muito grande')
							: gtts.save(ranm, dtt, function () {
								client.sendMessage(from, fs.readFileSync(ranm), audio, { quoted: mek, mimetype: 'audio/mp4', ptt: true })
								fs.unlinkSync(ranm)
							})
					}
					catch (e) {
						client.sendMessage(from, `❌ERROR❌ \n\n USO DO COMANDO: \n ${prefix}audio + codigo de idioma + Texto \n\n EX: ${prefix}audio pt LOGBOT`, text, { quoted: mek })
						console.log(`ERROR: ${e}`)
					}
					break

				case 'sn':
					if (isOn == false) return reply(mess.error.isOff)
					if (args.length < 1) return reply("O que deseja q o bot responda?")
					const perg = body.slice(3).trim()
					const res = ["Sim", "Não", "Com certeza sim", "Com certeza não", "Talvez sim", "Talvez não", "Provavelmente sim", "Provavelmente não", "Não Sei"]
					const resp = res[Math.floor(Math.random() * res.length)]
					client.sendMessage(from, `_~*BOT LOG RESPONDE*~_: \n\n_Pergunta: ${perg}_ \n*Resposta: ${resp}* \n\n `, text, { quoted: mek })
					break

				case 'roleta':
				case 'roll':
				case 'rl':
					if (isOn == false) return reply(mess.error.isOff)
					const rand = ["Viveu🙂", "Não morreu😎", "😳MORREU☠️", "Não morreu😎", "Sobreviveu😛", "Sobreviveu😳"]
					const respo = rand[Math.floor(Math.random() * rand.length)]
					client.sendMessage(from, `*_~JOGO DE ROLETA RUSSA~_* \n\nVocê atirou\nStatus: _*${respo}*_ \n\n😎`, text, { quoted: mek })
					break

				case 'est':
				case 'estourar':
					if (!isQuotedAudio) return reply("Use respondendo um audio")
					reply(mess.wait)
					encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
					media = await client.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.mp3')
					exec(`ffmpeg -i ${media} -af equalizer=f=200:width_type=o:width=200:g=30 ${ran}`, (err, stderr, stdout) => {
						fs.unlinkSync(media)
						if (err) return reply('Error!')
						hah = fs.readFileSync(ran)
						client.sendMessage(from, hah, audio, { mimetype: 'audio/mp4', ptt: true, quoted: mek })
						fs.unlinkSync(ran)
					})
					break

				case 'tomp3':
					client.updatePresence(from, Presence.composing)
					if (!isQuotedVideo) return reply('❗Use o comando respondendo um video❗')
					reply(mess.wait)
					encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo
					media = await client.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.mp4')
					exec(`ffmpeg -i ${media} ${ran}`, (err) => {
						fs.unlinkSync(media)
						if (err) return reply('❗ Falha ao converter vídeo para mp3 ❗')
						buffermm = fs.readFileSync(ran)
						client.sendMessage(from, buffermm, audio, { mimetype: 'audio/mp4', quoted: mek })
						fs.unlinkSync(ran)
					})
					break

				case 'quao':
				case 'quão':
					if (args.length < 1) return reply("Kd o texto depois")
					textC = body.slice(5)
					const numO = ['0', '4', '9', '17', '28', '34', '48', '59', '62', '74', '83', '97', '100', '29', '94', '75', '82', '41', '200']
					const pctO = numO[Math.floor(Math.random() * numO.length)]
					const pctTesks = `*_Porcentagem_*\n\nO quão ${textC}\n*_RESULTADO: ${pctO}_%* \n\n😳`
					reply(pctTesks)
					break

				case 'dado':
				case 'dd':
					const dad = ['1', '2', '3', '4', '5', '6']
					const dado = dad[Math.floor(Math.random() * dad.length)]
					reply(`*_O DADO ROLOU_*\n\n*_RESULTADO:${dado}_*\n\n*_~LOG BOT KK~_*`)
					break

				case 'tag':
					if (!isGroup) return reply(mess.only.group)
					if (isGroupAdmins || isOwner) {
						var value = body.slice(4)
						var group = await client.groupMetadata(from)
						var member = group['participants']
						var mem = []
						member.map(async adm => {
							mem.push(adm.id.replace('c.us', 's.whatsapp.net'))
						})
						var options = {
							text: value,
							contextInfo: { mentionedJid: mem },
							quoted: mek
						}
						client.sendMessage(from, options, text)
					}
					else return reply(mess.only.admin)
					break

				case 'ip':
					client.updatePresence(from, Presence.composing)
					if (args.length < 1) return reply(`*Qual IP Você Deseja Consultar?*\n\n*Exemplo :${prefix}IP 68.82.30.71 🌐*`)
					ipdata = await fetchJson(`https://luc4rio.herokuapp.com/api/consultas/internet?ip=${args[0]}`, { method: 'get' })
					if (ipdata.Erro) return reply(ipdata.Erro)
					reply(mess.wait)
					textoos = `*CONSULTA REALIZADA*\n\n╠➥ IP : ${ipdata.IP_Informado}\n╠➥ País Encontrado : ${ipdata.Pais_Encontrado}\n╠➥ Sigla Do País : ${ipdata.Sigla_Do_Pais}\n╠➥ Região Encontrada : ${ipdata.Regiao_Encontrada}\n╠➥ Sigla Da Região : ${ipdata.Sigla_Da_Regiao}\n╠➥ Cidade Encontrada : ${ipdata.Cidade_Encontrada}\n╠➥ Código Postal : ${ipdata.Codigo_Postal}\n╠➥ Horário Local : ${ipdata.Horario_Local}\n╠➥ Latitude : ${ipdata.Latitude}\n╠➥ Longitude : ${ipdata.Longitude}\n╠➥ Provedor 1: ${ipdata.Provedor_1}\n╠➥Provedor 2: ${ipdata.Provedor_2}\n╠➥ Número Do Provedor :${ipdata.Numero_Provedor}\n╠➥ Localização No Maps : https://www.google.com/maps/@${ipdata.Latitude},${ipdata.Longitude}\n\n *_CHOLLO_*`
					client.sendMessage(from, textoos, text, { quoted: mek })
					break

				case 'cep':
					client.updatePresence(from, Presence.composing)
					if (args.length < 1) return reply(`*✉ Qual CEP Você Deseja Consultar ✉*\n\n*✉ Exemplo :✉*\n\n*✉ ${prefix}CEP 13058-022 ✉*`)
					cepdata = await fetchJson(`https://luc4rio.herokuapp.com/api/consultas/codigopostal?cep=${args[0]}`, { method: 'get' })
					if (cepdata.Erro) return reply(cepdata.Erro)
					reply(mess.wait)
					ceptxt = `*CONSULTA REALIZADA*\n\n╠➥ CEP : ${cepdata.CEP_Informado}\n╠➥ CEP Em Formato : ${cepdata.CEP_Em_Formato}\n╠➥ País Encontrado : ${cepdata.Pais_Encontrado}\n╠➥ Estado Encontrado : ${cepdata.Estado_Encontrado}\n╠➥ Sigla Do Estado : ${cepdata.Sigla_Do_Estado}\n╠➥ Distrito Encontrado : ${cepdata.Distrito_Encontrado}\n╠➥ Distrito Abreviado : ${cepdata.Distrito_Abreviado}\n╠➥ Cidade Encontrada : ${cepdata.Cidade_Encontrada}\n╠➥ Código Postal : ${cepdata.Codigo_Postal}\n╠➥ Rua Encontrada : ${cepdata.Rua_Encontrada}\n╠➥ Rua Abreviada : ${cepdata.Rua_Abreviada}╠➥ Localização No Maps : https://www.google.com.br/maps/search/${cepdata.CEP_Em_Formato}\n\n *_CHOLLO_*`
					client.sendMessage(from, ceptxt, text, { quoted: mek })
					break

				case 'enc':
					if (args.length < 1) return reply("Qual Link Deseja encurtar?")
					reply(mess.wait)
					var argumdata = args[0]
					if (!argumdata.startsWith("https") && !argumdata.startsWith("http") && !argumdata.startsWith("tcp")) argumdata = `http://${argumdata}` 
					var dataenc = await getBuffer(`https://is.gd/create.php?format=simple&url=${argumdata}`)
					var stringdataenc = dataenc.toString()
					reply("URL ENCURTADO!\n\n" + argumdata)
					reply (`Url:\n\n${stringdataenc}`)
					break

				case 'covid':
					const coviddata = await getBuffer("https://covid-api.mmediagroup.fr/v1/cases?country=Brazil")
					var respcov = `Teste:\n\nCasos Confirmados Brasil: ${coviddata.All.confirmed}\n\n GG`
					reply(respcov)					
					break
				
				case 'dog':
					const datadog = await getBuffer("https://api.thecatapi.com/v1/images/search")
					const urldog = datadog.url
					const urlst = urldog.toString()
					const imgdog = await getBuffer(urlst)
					client.sendMessage(from, imgdog, image, {quoted:mek, caption:"ownt"})
					break

				default:
					if (isGroup && isSimi && budy != undefined) {
						console.log(budy)
						muehe = await simih(budy)
						console.log(muehe)
						reply(muehe)
					} else {
						console.log(color('[ERROR]', 'red'), 'Unregistered Command from', color(sender.split('@')[0]))
					}


			}
		} catch (e) {
			if(e == "TypeError") return false
			else console.log('Error : %s', color(e, 'red'))
		}
	})
}
starts()
