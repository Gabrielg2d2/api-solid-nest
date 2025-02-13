import { ApiProperty } from '@nestjs/swagger';

export function useGenerateDoc<T extends object>(type: T, dtoName: string) {
  const DynamicDto = class {
    constructor() {
      Object.keys(type).forEach((key) => {
        this[key] = type[key];
      });
    }
  };

  if (Array.isArray(type)) {
    const itemType = type.length > 0 ? type[0] : {};
    const DynamicDto = useGenerateDoc(itemType, dtoName);
    return [DynamicDto];
  }

  Object.defineProperty(DynamicDto, 'name', { value: dtoName });

  Object.keys(type).forEach((key) => {
    let propertyType;

    if (Array.isArray(type[key])) {
      propertyType =
        type[key].length > 0
          ? [useGenerateDoc(type[key][0], `${dtoName} => ${key}`)]
          : Array;
    } else if (typeof type[key] === 'object' && type[key] !== null) {
      propertyType = useGenerateDoc(type[key], `${dtoName} => ${key}`);
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
