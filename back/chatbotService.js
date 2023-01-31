const { NlpManager } = require('node-nlp');
const socket = require('./app')
const manager = new NlpManager({ languages: ['fr'] });
//var moment = require('moment');


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
        manager.addDocument('fr', 'vous pouvez disposer', 'greetings.bye');

        manager.addDocument('fr', 'bonjour', 'greetings.hello');
        manager.addDocument('fr', 'salut', 'greetings.hello');
        manager.addDocument('fr', 'wesh', 'greetings.hello');
        manager.addDocument('fr', 'hello', 'greetings.hello');
        manager.addDocument('fr', 'hola', 'greetings.hello');
        manager.addDocument('fr', 'coucou', 'greetings.hello');
        
        //worklow 

        manager.addDocument('fr', 'je souhaite vérifier l\'entretien de mon véhicule', 'entretien.aborder');
        manager.addDocument('fr', 'je veux vérifier l\'entretien de mon véhicule', 'entretien.aborder');
        manager.addDocument('fr', 'je veux des infos sur l\'entretien de mon véhicule', 'entretien.aborder');
        manager.addDocument('fr', 'Moins d\'un an', 'entretien.ok');
        manager.addDocument('fr', 'Plus d\'un an', 'entretien.vieux');


        //workflow INFORMATION VEHICULE
        //        

        manager.addDocument('fr', 'j\'aimerais obtenir des informations sur les véhicules', 'infos.vehicule');
        manager.addDocument('fr', 'j\'ai besoin d\'informations sur les véhicules', 'infos.vehicule');
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

        //workflow INFORMATION DE CONTACT
        //   
        manager.addDocument('fr', 'possédez vous une adresse email de contact', 'contact.mail');
        manager.addDocument('fr', 'possédez vous une adresse mail de contact', 'contact.mail');
        manager.addDocument('fr', 'possédez vous un mail de contact', 'contact.mail');
        manager.addDocument('fr', 'avez-vous une adresse à laquelle je peux vous joindre', 'contact.mail');

        manager.addDocument('fr', 'possédez vous un numéro de téléphone', 'contact.phone');
        manager.addDocument('fr', 'êtes-vous joignable par téléphone ?', 'contact.phone');
        manager.addDocument('fr', 'je peux avoir votre numéro de téléphone', 'contact.phone');
        manager.addDocument('fr', 'avez- vous un numéro de téléphone par lequel je peux vous joindre ?', 'contact.phone');

        manager.addDocument('fr', 'Comment puis-je vous joindre', 'contact');
        manager.addDocument('fr', 'Comment vous contacter', 'contact');


// Train also the NLG

        manager.addAnswer('fr', 'greetings.bye', 'Au revoir et à bientôt');
        manager.addAnswer('fr', 'greetings.bye', 'Au plaisir de vous revoir !');
        manager.addAnswer('fr', 'greetings.hello', 'Bonjour, en quoi puis-je vous aider');

        //infos ENTRETIEN
        manager.addAnswer('fr', 'entretien.aborder', 'Quelle est la date du dernier entretien fait sur le véhicule svp ? (JJ-MM-YYYY)');
        manager.addDocument('fr', 'entretien.ok', 'Combien de kilomètre avez-vous fais depuis le dernier entretien ?');
        manager.addDocument('fr', 'entretien.vieux', 'On va vous donner un rdv bep bep beeep parce que là c\'est chaud');


        //infos VEHICULE
        manager.addAnswer('fr', 'infos.vehicule', 'quel sera le type d\'usage ? (routier, tout-terrain, sportif, etc...)');

        manager.addAnswer('fr', 'usage.routier', 'Vous pourrez prendre rdv pour un essai routier au lien suivant : *lien*');
        manager.addAnswer('fr', 'usage.tt', 'Vous pourrez prendre rdv pour un essai tout-terrain au lien suivant : *lien*');
        manager.addAnswer('fr', 'usage.sportif', 'Vous pouvez prendre RDV pour un essai sportif ici : *lien* ');

        //Infos contact
        manager.addAnswer('fr', 'contact', 'Vous pouvez nous joindre par mail à l\'adresse et par téléphone au 01 28 28 29 28 en 9h et 19h30h');
        manager.addAnswer('fr', 'contact.mail', 'Vous pouvez nous écrire à l\'adresse suivante biker4life@vroumvroum.fr');
        manager.addAnswer('fr', 'contact.phone', 'Nous sommes joignable au 01 28 28 29 28');


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
            // console.log("USER ONLINE IS ",userId)
            socket.join(userId);
            // console.log("New user joined!")
        });
socket.on('new-msg', async function (data) {

    //const extractDate = data.msg.match(/\d{2}-\d{2}-\d{4}/i);

    // if (extractDate) {
    //     const parsedDate = moment(extractDate[0], 'DD-MM-YYYY');
    //     const now = moment();
    //     const difference = now.diff(parsedDate, 'days');

    //     if (difference < 365) {
    //     data.msg = 'Moins d\'un an'
    //     } else if(difference>365) {
    //     data.msg = 'Plus d\'un an'
    //     }
    // }
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