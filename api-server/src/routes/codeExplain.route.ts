import express from 'express';
import { explainCode } from '@/controllers/codeExplain.controller';

const router = express.Router();

router.post('/', explainCode);

export default router;
