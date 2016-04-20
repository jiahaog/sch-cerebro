import createBus from './createBus';
import createRoute from './createRoute';

function createController(map, dataSet) {
  const controllerPrototype = {
    updateTime(newTime) {
      this.buses.forEach(bus => bus.updateTime(newTime));
    }
  };

  const controller = Object.create(controllerPrototype);

  const route = createRoute();
  route.draw(map);
  const buses = dataSet
    .map(data => {
      return createBus(map, data, route);
    });

  const controllerProps = {
    buses
  };

  return Object.assign(controller, controllerProps);
}

export default createController;
