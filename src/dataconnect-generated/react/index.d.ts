import { CreateDemoUserData, ListMenuItemsData, CreateOrderData, CreateOrderVariables, GetMyOrdersData } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useCreateDemoUser(options?: useDataConnectMutationOptions<CreateDemoUserData, FirebaseError, void>): UseDataConnectMutationResult<CreateDemoUserData, undefined>;
export function useCreateDemoUser(dc: DataConnect, options?: useDataConnectMutationOptions<CreateDemoUserData, FirebaseError, void>): UseDataConnectMutationResult<CreateDemoUserData, undefined>;

export function useListMenuItems(options?: useDataConnectQueryOptions<ListMenuItemsData>): UseDataConnectQueryResult<ListMenuItemsData, undefined>;
export function useListMenuItems(dc: DataConnect, options?: useDataConnectQueryOptions<ListMenuItemsData>): UseDataConnectQueryResult<ListMenuItemsData, undefined>;

export function useCreateOrder(options?: useDataConnectMutationOptions<CreateOrderData, FirebaseError, CreateOrderVariables>): UseDataConnectMutationResult<CreateOrderData, CreateOrderVariables>;
export function useCreateOrder(dc: DataConnect, options?: useDataConnectMutationOptions<CreateOrderData, FirebaseError, CreateOrderVariables>): UseDataConnectMutationResult<CreateOrderData, CreateOrderVariables>;

export function useGetMyOrders(options?: useDataConnectQueryOptions<GetMyOrdersData>): UseDataConnectQueryResult<GetMyOrdersData, undefined>;
export function useGetMyOrders(dc: DataConnect, options?: useDataConnectQueryOptions<GetMyOrdersData>): UseDataConnectQueryResult<GetMyOrdersData, undefined>;
