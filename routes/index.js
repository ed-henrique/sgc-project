const { Router } = require('express');
const auth = require('../middlewares/auth.js');

const router = Router();

router.get('/', auth("student"), async (req, res) => {
  const name = req.username;
  const role = req.userRole;
  res.render('index', { username: name, role: role, active_nav: "home" });
});

module.exports = router;
