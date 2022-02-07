import Router from express;

const router = Router();

router.get("/user", UserController.index);

router.get("/user/:id", UserController.getOne);

router.post("/user",  UserController.store);

router.put("/user/:id", UserController.update);

router.delete("/user/:id", UserController.remove);

export default Router;