import createBus from './createBus';

function createController(map, dataSet) {
  const controllerPrototype = {
    updateTime(newTime) {
      this.buses.forEach(bus => bus.updateTime(newTime));
    }
  };
  
  const controller = Object.create(controllerPrototype);

  const buses = dataSet.map(data => {
    return createBus(map, data);
  });

  const controllerProps = {
    buses
  };

  return Object.assign(controller, controllerProps);
}

export default createController;
