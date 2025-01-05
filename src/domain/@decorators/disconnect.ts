// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

export function Disconnect() {
  return function (
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor,
  ) {
    const originalMethod = descriptor.value;

    descriptor.value = async function (...args: any[]) {
      try {
        return await originalMethod.apply(this, args);
      } finally {
        if (this.adapter && this.adapter.prisma) {
          await this.adapter.prisma.$disconnect();
        } else {
          console.error('Adapter or Prisma instance not found');
        }
      }
    };

    console.log('Disconnect decorator applied to: ', propertyKey);
    return descriptor;
  };
}
