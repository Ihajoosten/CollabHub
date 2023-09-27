import { Injectable, NestMiddleware } from '@nestjs/common';
import { rateLimit } from 'express-rate-limit';

@Injectable()
export class RateLimitMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    const limiter = rateLimit({
      windowMs: 5 * 60 * 1000, // 15 minutes
      max: 50, // limit each IP to 100 requests per windowMs
      message: 'Rate limit exceeded, please try again later.', // Optional error message
    });
    limiter(req, res, next);
  }
}
