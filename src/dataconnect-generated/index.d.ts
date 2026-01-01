import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface CreateDemoUserData {
  user_insert: User_Key;
}

export interface CreateOrderData {
  order_insert: Order_Key;
}

export interface CreateOrderVariables {
  customerName: string;
  orderNumber: string;
  specialInstructions: string;
  status: string;
  totalPrice: number;
}

export interface GetMyOrdersData {
  orders: ({
    id: UUIDString;
    customerName?: string | null;
    orderNumber: string;
    orderTime: TimestampString;
    specialInstructions?: string | null;
    status: string;
    totalPrice?: number | null;
  } & Order_Key)[];
}

export interface Ingredient_Key {
  id: UUIDString;
  __typename?: 'Ingredient_Key';
}

export interface ListMenuItemsData {
  menuItems: ({
    id: UUIDString;
    name: string;
    description?: string | null;
    price: number;
    type: string;
    isAvailable?: boolean | null;
    imageUrl?: string | null;
  } & MenuItem_Key)[];
}

export interface MenuItem_Key {
  id: UUIDString;
  __typename?: 'MenuItem_Key';
}

export interface OrderItem_Key {
  id: UUIDString;
  __typename?: 'OrderItem_Key';
}

export interface Order_Key {
  id: UUIDString;
  __typename?: 'Order_Key';
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

interface CreateDemoUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateDemoUserData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<CreateDemoUserData, undefined>;
  operationName: string;
}
export const createDemoUserRef: CreateDemoUserRef;

export function createDemoUser(): MutationPromise<CreateDemoUserData, undefined>;
export function createDemoUser(dc: DataConnect): MutationPromise<CreateDemoUserData, undefined>;

interface ListMenuItemsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListMenuItemsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListMenuItemsData, undefined>;
  operationName: string;
}
export const listMenuItemsRef: ListMenuItemsRef;

export function listMenuItems(): QueryPromise<ListMenuItemsData, undefined>;
export function listMenuItems(dc: DataConnect): QueryPromise<ListMenuItemsData, undefined>;

interface CreateOrderRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: CreateOrderVariables): MutationRef<CreateOrderData, CreateOrderVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: CreateOrderVariables): MutationRef<CreateOrderData, CreateOrderVariables>;
  operationName: string;
}
export const createOrderRef: CreateOrderRef;

export function createOrder(vars: CreateOrderVariables): MutationPromise<CreateOrderData, CreateOrderVariables>;
export function createOrder(dc: DataConnect, vars: CreateOrderVariables): MutationPromise<CreateOrderData, CreateOrderVariables>;

interface GetMyOrdersRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetMyOrdersData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetMyOrdersData, undefined>;
  operationName: string;
}
export const getMyOrdersRef: GetMyOrdersRef;

export function getMyOrders(): QueryPromise<GetMyOrdersData, undefined>;
export function getMyOrders(dc: DataConnect): QueryPromise<GetMyOrdersData, undefined>;

