
const Reserve = require('../models/Reserve');
const House = require('../models/House');
const User = require('../models/User');


class ReserveController {
async store (req, res) {
    const { user_id } = req.headers;
    const {house_id} = req.params;
    const {date} =  req.body;

const house = await House.findById(house_id);
if(!house){
    return res.status(400).json({ error: 'Essa casa não existe.' });
}

if(house.status !== true){
    return res.status(400).json({ error: 'Solicitação indisponível.' });
}

const user = await User.findById(user_id);
if(String(user._id) === String(house.user)){
    return res.status(401).json({ error: 'Reserva nao autorizada' });
}

const reserve = await Reserve.Create({
    user: user_id,
    house: house_id,
    date,
});

await reserve.populate('house').populate('user').execPopulate();

return res.json({reserve})


}

}

module.exports = new ReserveController();