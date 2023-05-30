const db = require('../connection')
const query = require('express')

const getPlantGoals = (userId) => {
  const queryString = `SELECT * FROM plant_goals WHERE user_id = $1 ORDER BY id;`
  return db
    .query(queryString, [userId])
    .then((data) => {
      return data.rows;
    })
    .catch((err) => {
      console.log(err.message)
    });
}

const createNewGoal = (userId, goalName, amount) => {
  const queryString = `INSERT INTO plant_goals (name, target_amount, user_id) VALUES ($1, $2, $3);`
  return db
    .query(queryString, [userId, goalName, amount])
    .then((data) => {
      return data.rows[0];
    })
    .catch((err) => {
      console.log(err.message)
    });
};

const updateGoal = (id, goalName, amount) => {
  const queryString = `UPDATE plant_goals SET target_amount = $1, name = $2 WHERE id = $3;`
  return db
    .query(queryString, [amount, goalName, id])
    .then((data) => {
      return data.rows[0];
    })
    .catch((err) => {
      console.log(err.message)
    });
}

module.exports = { createNewGoal, getPlantGoals, updateGoal }