class ModelService {
  constructor() {
    this.getSafeItem = (item, safeFields) => {
      const safeItem = {};

      safeFields.forEach((field) => {
        safeItem[field] = item[field];
      });

      return safeItem;
    };
  }
}

module.exports = new ModelService();
