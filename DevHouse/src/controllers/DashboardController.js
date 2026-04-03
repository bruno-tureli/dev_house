const House = require('../models/House')


class DashboardController {

    async show(req, res) {
     const { user_id } =  req.headers

     const houses = await House.find({ user: user_id })
    }


}

module.exports = new DashboardController();