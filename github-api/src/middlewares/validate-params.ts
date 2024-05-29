import { Request, Response, NextFunction } from 'express';

export class ValidateParams {
    public static validate(req: Request, res: Response, next: NextFunction): void {
        const { username, records } = req.params;

        if (!username || typeof username !== 'string') {
            res.status(400).json({ message: 'Invalid or missing username parameter' });
            return;
        }

        if (records !== undefined) {
            const recordsNumber = Number(records);
            if (isNaN(recordsNumber)) {
                res.status(400).json({ message: 'Invalid records parameter' });
                return;
            }
        }

        next();
    }
}
