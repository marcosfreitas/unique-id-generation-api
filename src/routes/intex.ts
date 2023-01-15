const router = global.router;
const checkBodyAndQuery = global.checkBodyAndQuery;
const check = global.check;
const validationResult = global.validationResult;

const DealsController = require('../controllers/DealsController');
const DealsControllerInstance = new DealsController();

router.get('/', function (req, res) {
  res.json({ working: true });
});

router.get('/deal/', function (req, res) {
  DealsControllerInstance.all(req, res);
});
