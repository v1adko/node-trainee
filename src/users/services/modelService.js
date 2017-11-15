class ModelService {
  getSafeItem = (item, safeFields) => {
    const safeItem = {};

    safeFields.forEach((field) => {
      safeItem[field] = item[field];
    });

    return safeItem;
  };

  mapSafeItems = (key, items) => {
    const itemsMap = {};
    items.forEach((item) => {
      itemsMap[item[key]] = this.getSafeItem(item, item.safeFields);
    });
    return itemsMap;
  };

  setFields = (object, fiels) => {
    const changedObject = object;
    const keys = Object.keys(fiels);

    keys.forEach((key) => {
      changedObject[key] = fiels[key];
    });

    return changedObject;
  };
}

export default new ModelService();
