import { ApiProperty } from '@nestjs/swagger';

export function useGenerateDoc<T extends object>(type: T, dtoName: string) {
  const DynamicDto = class {
    constructor() {
      Object.keys(type).forEach((key) => {
        this[key] = type[key];
      });
    }
  };

  Object.defineProperty(DynamicDto, 'name', { value: dtoName });

  Object.keys(type).forEach((key) => {
    const propertyType =
      typeof type[key] === 'object' && type[key] !== null
        ? useGenerateDoc(type[key], `${dtoName} => ${key}`)
        : type[key].constructor;

    ApiProperty({
      example: type[key],
      type: propertyType,
    })(DynamicDto.prototype, key);
  });

  return DynamicDto;
}
