class ModelService {
  constructor() {
    this.getSafeItem = (item, safeFields) => {
      const safeItem = {};

      safeFields.forEach((field) => {
        safeItem[field] = item[field];
      });

      return safeItem;
    };

    this.mapSafeItems = (key, items) => {
      const itemsMap = {};
      items.forEach((item) => { itemsMap[item[key]] = this.getSafeItem(item, item.safeFields); });
      return itemsMap;
    };
  }
}

module.exports = new ModelService();
