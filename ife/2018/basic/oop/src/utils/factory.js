const Factory = {
  registeredTypes: new Map(),
  register(className, clazz) {
    if (!Factory.registeredTypes.has(className)) {
      Factory.registeredTypes.add(className, clazz);
    }
  },
  create(className, options) {
    if (!Factory.registeredTypes.has(className)) {
      return null;
    }

    const Clazz = this.registeredTypes.get(className);
    const instance = new Clazz(options);
    return instance;
  },
};

export default Factory;
