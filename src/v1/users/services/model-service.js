class ModelService {
  getSafeItem = (item) => {
    console.log(item);
    if (!item.safeFields) return {};

    const safeItem = {};

    item.safeFields.forEach((field) => {
      safeItem[field] = item[field];
    });

    return safeItem;
  };

  mapSafeItems = (key, items) => {
    if (!items) return {};

    const itemsMap = {};
    items.forEach((item) => {
      itemsMap[item[key]] = this.getSafeItem(item, item.safeFields);
    });
    return itemsMap;
  };
}

export default new ModelService();
