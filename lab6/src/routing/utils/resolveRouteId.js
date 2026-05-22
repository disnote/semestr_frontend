/**
 * Безопасно получить id задачи из props / route (включая id === 0).
 * Нельзя использовать `props.id ?? route.params.id` с последующими проверками `if (!id)`.
 */
export function resolveRouteId(props, route) {
    if (props.id !== undefined && props.id !== null && props.id !== "") {
        return Number(props.id);
    }
    return Number(route.params.id);
}
