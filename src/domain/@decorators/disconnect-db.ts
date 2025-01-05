// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

import { env } from '@/env';

export class Disconnect {
  static db(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      // TODO: remove this console.log
      if (env.NODE_ENV === 'development') {
        console.log(`Calling disconnect to ${propertyKey}`);
      }
      try {
        return await originalMethod.apply(this, args);
      } finally {
        // TODO: remove this console.log
        if (env.NODE_ENV === 'development') {
          console.log(`Disconnecting from database for ${propertyKey}`);
        }
        if (this.adapter && this.adapter.prisma) {
          await this.adapter.prisma.$disconnect();
        } else {
          console.error('Adapter or Prisma instance not found');
        }
      }
    };

    return descriptor;
  }
}
