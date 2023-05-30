const Express = require('express');
const router = Express.Router();
const { getMonthlyTransactions, getMonthlyCategoriesSum, getUsersCategoryGoals, updateCategoryGoals, getCurrentAccountBalance } = require('../db/queries/transactions');
const { createNewGoal, getPlantGoals, updateGoal } = require('../db/queries/garden');

router.get("/transactions", (req, res) => {
  // get transaction data from db
  getMonthlyTransactions(1) //hardcoding user1 for now
    .then(data => res.json(data))
    .catch(error => console.log(error))
});

router.get("/categories", (req, res) => {
  // get the categories total as per all transactions
  getMonthlyCategoriesSum(1)
    .then(data => res.json(data))
    .catch(error => console.log(error))
});

router.get("/category-goals", (req, res) => {
  // get the categories saving goals
  getUsersCategoryGoals(1)
    .then(data => res.json(data))
    .catch(error => console.log(error))
});

router.put("/category-goals/:id", (req, res) => {
  const id = req.params.id;
  const amountKey = Object.keys(req.body);
  const amount = amountKey[0]

  // update category goals amount
  updateCategoryGoals(id, amount)
  .then((data) => res.json({message: `Category goal updated! ${data} rows affected.`}))
  .catch(error => console.log(error))
});

router.get("/accounts", (req, res) => {
  getCurrentAccountBalance(1)
    .then(data => res.json(data))
    .catch(error => console.log(error))
});

//get plant goals
router.get('/plant-goals', (req, res) => {
  getPlantGoals(1) //hardcoding user1 for now
  .then(data => res.json(data))
  .catch(error => console.log(error))
})


//create a plant goal
router.post('/plant-goals', (req, res) => {
  const userId = 1
  const { name, amount } = req.body
  createNewGoal(userId, name, amount)
    .then(data => res.json(data))
    .catch(error => console.log(error))
})

//update plant goal
router.put('/plant-goals/:id', (req, res) => {
  const id = req.params.id;
  const { name, target } = req.body
  updateGoal(id, name, target)
    .then(data => res.json(data))
    .catch(error => console.log(error))
})


module.exports = router;
