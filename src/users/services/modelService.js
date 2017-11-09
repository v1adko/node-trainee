class ModelService {
  static getSafeItem(item, safeFields) {
    const safeItem = {};

    safeFields.forEach((field) => {
      safeItem[field] = item[field];
    });

    return safeItem;
  }
}

module.exports = ModelService;
