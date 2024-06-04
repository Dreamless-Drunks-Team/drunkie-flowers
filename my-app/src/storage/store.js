import { combineReducers, configureStore } from "@reduxjs/toolkit"
import reducer from "./slice"
const rootReducer = combineReducers({
    product: reducer})
export const store = configureStore({
    reducer: rootReducer,})
