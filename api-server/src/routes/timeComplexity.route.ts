import express from 'express';
import { calculateComplexity } from '@/controllers/timeComplexity.controller';

const router = express.Router();

router.post('/', calculateComplexity);

export default router;
