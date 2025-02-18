import express, { Router } from "express";
import { InicioModel } from '../models/inicio-model';
 export const inicioRouter = Router();

inicioRouter.get('/:mes',(req, res) => {
    const {mes} = req.query;
    const inicio =  InicioModel.getAll({mes});
        res.json(results);
    });
