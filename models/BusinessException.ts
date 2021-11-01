class BusinessException {
  code: string;

  constructor(code) {
    this.code = code;
  }

  get getCode(): string {
    return this.code;
  }
}

export { BusinessException };
export default BusinessException;
