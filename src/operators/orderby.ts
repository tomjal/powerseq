import { Enumerable } from "../enumerable_";
import { OrderedEnumerable, OrderingState } from "../orderedEnumerable";
import { keySelector, OperatorR } from "../common/types";
import { ordebyImpl } from "../common/ordering";
import { wrapInThunk } from "../common/wrap";

function _orderby<T>(source: Iterable<T>, keySelector: keySelector<T, any>): OrderedEnumerable<T> {
    var state: OrderingState<T> = { descending: false, keySelector, originalIterable: source };
    var sortingIterable = ordebyImpl(state);
    return new OrderedEnumerable<T>(sortingIterable, state);
}

export function orderby<T>(source: Iterable<T>, keySelector: keySelector<T, any>): OrderedEnumerable<T>;
export function orderby<T>(keySelector: keySelector<T, any>): OperatorR<T, OrderedEnumerable<T>>;
export function orderby() {
    return wrapInThunk(arguments, _orderby);
}

declare module '../enumerable_' {
    interface Enumerable<T> {
        orderby(keySelector: keySelector<T, any>): OrderedEnumerable<T>;
    }
}
Enumerable.prototype.orderby = function <T>(this: Enumerable<T>, keySelector: keySelector<T, any>): OrderedEnumerable<T> {
    return _orderby<T>(this, keySelector);
};