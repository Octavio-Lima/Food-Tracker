export function updateGoal(element: Element, goal: number, total: number) {
    element.textContent = goal - total + "kcal";
}
