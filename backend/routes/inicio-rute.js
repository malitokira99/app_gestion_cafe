import { Router } from "express";
const router = Router();

router.get('/',(req, res) => {
    res.send(' !aqui se inica el proyecto¡');
});