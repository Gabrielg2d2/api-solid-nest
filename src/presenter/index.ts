export class Presenter {
  static successResponse(data: any) {
    return data;
  }

  static errorResponse(
    message: string,
    timestamp: string,
    path: string,
    details?: any,
  ) {
    return {
      message,
      data: null,
      timestamp,
      path,
      details,
    };
  }
}
