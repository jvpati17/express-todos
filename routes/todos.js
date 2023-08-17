var express = require('express');
var router = express.Router();
var todosCtrl = require('../controllers/todos');


// all actuals paths start with ' /todos '
//get todos
router.get('/', todosCtrl.index);
// GET /todos/:id
router.get('/:id. todosCtrl.show');


module.exports = router;
