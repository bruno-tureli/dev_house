// métodos: index, show, update, store, destroy

// index : Listagens de sessões
// Store: Criar nova sessão
// show: Listar uma unica sessão
// update - alterar alguma sessão
// destroy - quando queremos deletar uma sessão


const User = require('../models/User');

class SessionController {

  async  store(req, res){

        const { email } = req.body;

        let user = await User.findOne({email})

        if (!user ) {
            user = await User.create({email})
        }

        return  res.json({user})
    } 


}

module.exports = new SessionController();