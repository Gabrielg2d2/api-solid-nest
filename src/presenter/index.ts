export class Presenter {
  private static getMessageDefault(statusCode: 200 | 201) {
    switch (statusCode) {
      case 201:
        return 'Resource created successfully';
      case 200:
        return 'Resource found';
    }
  }

  static successResponse(data: any, statusCode: 200 | 201) {
    return {
      success: true,
      message: this.getMessageDefault(statusCode),
      data,
      statusCode,
    };
  }

  static errorResponse(
    message: string,
    statusCode: number,
    timestamp: string,
    path: string,
    details?: any,
  ) {
    return {
      success: false,
      message,
      data: null,
      statusCode,
      timestamp,
      path,
      details,
    };
  }
}
