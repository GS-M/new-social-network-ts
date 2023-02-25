
export const updateObjectInArrey = (items: any, itemId: any, objProperty: any, newObjProps: any) => {
    return items.map((u: any) => {
        if (u[objProperty] === itemId) {        // Обращеие через [] потому что переменная не известна
            return { ...u, ...newObjProps }
        }
        return u
    })
}