export function sumFromElement(el: NodeListOf<HTMLInputElement>): number {
    let sum = 0;

    el.forEach((e) => {
        let val = parseInt(e.value);
        sum += isNaN(val) ? 0 : val;
    });

    return sum;
}
