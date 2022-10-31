import express from 'express';
import { translateLang } from '@/controllers/translateLang.controller';

const router = express.Router();

router.post('/', translateLang);

export default router;
