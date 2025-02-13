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
    let propertyType;

    if (Array.isArray(type[key])) {
      propertyType = Array;
    } else if (typeof type[key] === 'object' && type[key] !== null) {
      propertyType = Object;
    } else {
      propertyType = type[key].constructor;
    }

    ApiProperty({
      example: type[key],
      type: propertyType,
    })(DynamicDto.prototype, key);
  });

  return DynamicDto;
}
