const Express = require('express');
const router = Express.Router();
const { getCurrentAccountBalance } = require('../db/queries/accounts');

// get the categories total as per all transactions
router.get("/", (req, res) => {
  getCurrentAccountBalance(1)
    .then(data => res.json(data))
    .catch(error => console.log(error))
});

module.exports = router;
