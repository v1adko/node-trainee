import AtmMongoose from './atm-schema';

class ArmAdapterMongoose extends AtmMongoose {
  constructor(data) {
    super();
    this.id = this._id;

    const {
      type,
      cityRU,
      cityUA,
      cityEN,
      fullAddressRu,
      fullAddressUa,
      fullAddressEn,
      placeRu,
      placeUa,
      latitude,
      longitude,
      tw
    } = data;

    this.type = type;
    this.cityRU = cityRU;
    this.cityUA = cityUA;
    this.cityEN = cityEN;
    this.fullAddressRu = fullAddressRu;
    this.fullAddressUa = fullAddressUa;
    this.fullAddressEn = fullAddressEn;
    this.placeRu = placeRu;
    this.placeUa = placeUa;
    this.latitude = latitude;
    this.longitude = longitude;
    this.tw = tw;
  }
}

export default ArmAdapterMongoose;
