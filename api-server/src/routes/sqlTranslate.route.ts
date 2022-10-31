import express from 'express';
import { sqlTranslate } from '@/controllers/sqlTranslate.controller';

const router = express.Router();

router.post('/', sqlTranslate);

export default router;
