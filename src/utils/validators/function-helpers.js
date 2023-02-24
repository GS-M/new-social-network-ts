
export const updateObjectInArrey = (items, itemId, objProperty, newObjProps) => {
    return items.map(u => {
        if (u[objProperty] === itemId) {        // Обращеие через [] потому что переменная не известна
            return { ...u, ...newObjProps }
        }
        return u
    })
}