const House = require('../models/House');

class HouseController {
 
async destroy(req, res) {
  const { house_id } = req.body;
  const { user_id } = req.headers;

  const user = await User.findById(user_id);
  const houses = await House.findById(house_id);

  if (String(user_id) !== String(houses.user)) {
    return res.status(401).json({ error: 'Não autorizado.' });
  }

  await House.findByIdAndDelete({ _id: house_id });

  return res.json({ message: "Excluída com sucesso!" });
}


 async index(req, res) {
  const {status} = req.query

  const houses = await House.find ({ status })

  return res.json(houses)
 }
 
async update(req, res) {
  const { house_id } = req.params;
  const { description, price, location, status } = req.body;

  const filename = req.file ? req.file.filename : undefined;

  const house = await House.findById(house_id);

  if (!house) {
    return res.status(400).json({ error: 'Casa não encontrada' });
  }

  house.description = description || house.description;
  house.price = price || house.price;
  house.location = location || house.location;
  house.status = status || house.status;

  if (filename) {
    house.thumbnail = filename;
  }

  await house.save();

  return res.json(house);
}


 async store(req, res) {
  console.log('FILE:', req.file);
  console.log('BODY:', req.body);
  console.log('HEADERS:', req.headers);

  const { filename } = req.file || {};
  const { description, price, location, status } = req.body;
  const { user_id } = req.headers;

  const house = await House.create({
    user: user_id,
    thumbnail: filename,
    description,
    price,
    location,
    status,
  });

  return res.json(house);
}
}

module.exports = new HouseController();