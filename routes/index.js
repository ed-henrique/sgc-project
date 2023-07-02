const { Router } = require('express');
const auth = require('../middlewares/auth.js');

const router = Router();

router.get('/', auth("student"), async (req, res) => {
  const name = req.username;
  res.render('index', { username: name, active_nav: "home" });
});

module.exports = router;
