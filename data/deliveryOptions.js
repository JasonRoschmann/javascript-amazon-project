import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export const deliveryOptions = [
    {
        id: '1',
        deliveryDays: 7,
        priceCents: 0
    },
    {
        id: '2',
        deliveryDays: 3,
        priceCents: 499
    },
    {
        id: '3',
        deliveryDays: 1,
        priceCents: 999
    }
];

export function getDeliveryOptionById(id) {
    return deliveryOptions.find(option => option.id === id);
}

function isWeekend(date) {
    return date.day() === 0 || date.day() === 6; // 0 is Sunday, 6 is Saturday
}

export function calculateDeliveryDate(deliveryOption) {
    const today = dayjs();
    let deliveryDate = today.add(deliveryOption.deliveryDays, 'days');

    while (isWeekend(deliveryDate)) {
        deliveryDate = deliveryDate.add(1, 'day');
    }

    return deliveryDate.format('dddd, MMMM D');
}

