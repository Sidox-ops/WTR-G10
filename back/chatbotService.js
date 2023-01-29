const { NlpManager } = require('node-nlp');
const socket = require('./app')
const manager = new NlpManager({ languages: ['fr'] });
// 1 - Train the IA
async function trainChatBotIA() {
    return new Promise(async (resolve, reject) => {
        //Capter intention
        // worflow salutation et au revoir
        manager.addDocument('fr', 'ce sera tout pour moi', 'greetings.bye');
        manager.addDocument('fr', 'au revoir', 'greetings.bye');
        manager.addDocument('fr', 'okay à plus tard', 'greetings.bye');
        manager.addDocument('fr', 'à bientôt', 'greetings.bye');
        manager.addDocument('fr', 'je vais y allez', 'greetings.bye');
        manager.addDocument('fr', 'bous pouvez disposer', 'greetings.bye');

        manager.addDocument('fr', 'bonjour', 'greetings.hello');
        manager.addDocument('fr', 'salut', 'greetings.hello');
        manager.addDocument('fr', 'wesh', 'greetings.hello');
        manager.addDocument('fr', 'hello', 'greetings.hello');
        manager.addDocument('fr', 'hola', 'greetings.hello');
        manager.addDocument('fr', 'coucou', 'greetings.hello');
        
        //workflow INFORMATION VEHICULE
        //        

        manager.addDocument('fr', 'j\aimerais obtenir des informations sur les véhicules', 'infos.vehicule');
        manager.addDocument('fr', 'j\a besoin d\'informations sur les véhicules', 'infos.vehicule');
        manager.addDocument('fr', 'pouvez vous m\’aiguiller concernant les véhicules', 'infos.vehicule');
        manager.addDocument('fr', 'je ne m\'y connais pad en terme de véhicules pouvez vous m\'aider', 'infos.vehicule');
        manager.addDocument('fr', 'quel type de véhicules proposez-vous', 'infos.vehicule');
        manager.addDocument('fr', 'routier', 'usage.routier');
        manager.addDocument('fr', 'un usage routier', 'usage.routier');
        manager.addDocument('fr', 'plutôt routier', 'usage.routier');

        manager.addDocument('fr', 'tout terrain', 'usage.tt');
        manager.addDocument('fr', 'un usage tout terrain', 'usage.tt');
        manager.addDocument('fr', 'plutôt tout terrain', 'usage.tt');

        manager.addDocument('fr', 'sportif', 'usage.sportif');
        manager.addDocument('fr', 'un usage sportif', 'usage.sportif');
        manager.addDocument('fr', 'plutôt sportif', 'usage.sportif');




// Train also the NLG
        manager.addAnswer('fr', 'greetings.bye', 'Au revoir et à bientôt');
        manager.addAnswer('fr', 'greetings.bye', 'Au plaisir de vous revoir!');
        manager.addAnswer('fr', 'greetings.hello', 'Bonjour, en quoi puis-je vous aider');
        //infos VEHICULE
        manager.addAnswer('fr', 'infos.vehicule', 'quel type d\'utilisation vous intéresse ? (routier, tout-terrain, sportif, etc...)');
        manager.addAnswer('fr', 'infos.vehicule', 'quelle utilisation comptez vous en faire ? (routier, tout-terrain, sportif, etc...)');
        manager.addAnswer('fr', 'infos.vehicule', 'quel sera le type d\'usage ? (routier, tout-terrain, sportif, etc...)');

        manager.addAnswer('fr', 'usage.routier', 'il a dit routier');
        manager.addAnswer('fr', 'usage.tt', 'il a dit tout terrain');
        manager.addAnswer('fr', 'usage.sportif', 'il a dit sportif');





await manager.train();
        manager.save();
        console.log("AI has been trainded")
        resolve(true);
    })
}
async function generateResponseAI(qsm) {
    // Train and save the mode
    return new Promise(async (resolve, reject) => {
        response = await manager.process('fr', qsm);
        resolve(response);
    })
}
const connectWebSocket = (io) => {
    io.on('connection', function (socket) {
        socket.on('join', (userId) => {
            console.log("USER ONLINE IS ",userId)
            socket.join(userId);
            console.log("New user joined!")
        });
socket.on('new-msg', async function (data) {
            let response = await generateResponseAI(data.msg);
            io.to(data.room).emit('send-msg-response', response.answer !== undefined
                ? response.answer : "Je ne suis pas sûr de comprendre :(, pouvez-vous répéter ");
        })
});
}
module.exports = {
    connectWebSocket,
    trainChatBotIA
}