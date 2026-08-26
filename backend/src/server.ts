import app from './app';
import env from './config/env';
import { logger } from './utils/logger';
import prisma from './config/database';

const PORT = env.API_PORT;

async function startServer() {
  try {
    // Verify DB connection
    await prisma.$connect();
    logger.info('Connected to Uzair Transport Database');

    app.listen(PORT, () => {
      logger.info(`=================================================`);
      logger.info(`🚌 Uzair Transport Backend Running on Port ${PORT}`);
      logger.info(`🌐 API Endpoint: ${env.API_URL}/api/v1`);
      logger.info(`=================================================`);
    });
  } catch (error) {
    logger.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
