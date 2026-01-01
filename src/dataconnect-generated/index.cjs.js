const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'example',
  service: 'pho-viet',
  location: 'us-east4'
};
exports.connectorConfig = connectorConfig;

const createDemoUserRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateDemoUser');
}
createDemoUserRef.operationName = 'CreateDemoUser';
exports.createDemoUserRef = createDemoUserRef;

exports.createDemoUser = function createDemoUser(dc) {
  return executeMutation(createDemoUserRef(dc));
};

const listMenuItemsRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListMenuItems');
}
listMenuItemsRef.operationName = 'ListMenuItems';
exports.listMenuItemsRef = listMenuItemsRef;

exports.listMenuItems = function listMenuItems(dc) {
  return executeQuery(listMenuItemsRef(dc));
};

const createOrderRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateOrder', inputVars);
}
createOrderRef.operationName = 'CreateOrder';
exports.createOrderRef = createOrderRef;

exports.createOrder = function createOrder(dcOrVars, vars) {
  return executeMutation(createOrderRef(dcOrVars, vars));
};

const getMyOrdersRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetMyOrders');
}
getMyOrdersRef.operationName = 'GetMyOrders';
exports.getMyOrdersRef = getMyOrdersRef;

exports.getMyOrders = function getMyOrders(dc) {
  return executeQuery(getMyOrdersRef(dc));
};
