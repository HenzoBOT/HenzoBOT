function starth(){
const speed = require('performance-now');
const gplink = "https://chat.whatsapp.com/GuS9NThAyFw6aXsjQfHcco"
const melink = "wa.me/553898456180"
const cjlink = `wa.me/14314891162`
const hrnlink = `wa.me/5511986937027`
var timestamp = speed();
var vel = speed() - timestamp

const help = (prefix) => {
return`

       LOG BOT TA VIDAH? 


➭ Prefixo:  「${prefix} 」

➭ Status: 「 Online 」

➭Tempo de Resposta do bot:
「${vel.toFixed(4)} Segundos」

➭ Comando : ${prefix}doar
➭ útil em : envia as informações para vc doar para ajudar no desenvolvimento do bot 
➭ uso : basta enviar o comando 
    
Numero PESSOAL do Dono! : wa.me/553898456180


--------------------------------
COMANDOS PRINCIPAIS!
--------------------------------
      
*${prefix}fig* ou *${prefix}figurinha*

*${prefix}txtfig*

*${prefix}toimg*

--------------------------------
COMANDOS PARA GRUPOS!
--------------------------------

*${prefix}gp ou ${prefix}grupo*

*${prefix}soadm*

*${prefix}linkgroup*

*${prefix}marcaradm*

*${prefix}marcar*

*${prefix}welcome*

*${prefix}add*

Comando : *${prefix}kick*

*${prefix}promote*

*${prefix}demote*

-------------------------------
DOWNLOADER MUSICA!
--------------------------------

obs: nem sempre vai funcionar!
       
*${prefix}ytvideo* [_*OFF*_]

*${prefix}ytmsc*

*${prefix}tomp3*

--------------------------------
COMANDOS AUDIOS!
--------------------------------

*${prefix}audio*

*${prefix}est* ou *${prefix}estourar

--------------------------------
COMANDOS PARA DIVERSÃO!
--------------------------------
        
*${prefix}dado*

*${prefix}quão*

*${prefix}gay*

*${prefix}roleta ou ${prefix}rl*

*${prefix}sn*

*${prefix}lista*

--------------------------------------
COMANDOS: DOAR,BUG,OUTROS E ETC!
--------------------------------------
      
*${prefix}doar*

*${prefix}bug*
 
*${prefix}outros*

*${prefix}loli1*

*${prefix}del*

*${prefix}tab*

*${prefix}lofi*

*${prefix}bomdia*

*${prefix}boatarde*

*${prefix}info*

*${prefix}ping*

*${prefix}wame ou wa.me*

*${prefix}ctt*

*${prefix}ler*

*${prefix}creditos*



----------------------------
  BY: LOG BOT TÁ? KKK


  
  Estou off? Aqui vai o numero dos meus companheiros:
  
  𝐶𝐽 𝐵𝑂𝑇:
  ${cjlink}
  НЯИ‽ 𝐵𝑂𝑇:
  ${hrnlink}
  
  Para ver todos envie ${prefix}outros

ETERNO CHOLLO
  
╚════════════════════`
}

exports.help = help

}
starth()





