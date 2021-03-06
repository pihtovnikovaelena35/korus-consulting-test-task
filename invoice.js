/**
 * Общий счет для компании.
 * Подсчет итоговой суммы и бонусов.
 * 
 * @param {*} invoice общая информация о заказчике и постановках.
 */
function getInvoice(invoice) {
    let totalAmount = 0;
    let volumeCredits = 0;
    let result = `Счет для ${invoice.customer}\n`;
    const format = new Intl.NumberFormat("ru-RU",
        {
            style: "currency", currency: "RUB",
            minimumFractionDigits: 2
        }).format;
    for (let perf of invoice.performance) {
        let thisAmount = calculatePerformancePrice(perf.audience, perf.type);
        volumeCredits += calculateBonus(perf.audience, perf.type);

        // Вывод строки счета
        result += `${perf.playId}: ${format(thisAmount)}`;
        result += `(${perf.audience} мест)\n`;
        totalAmount += thisAmount;
    }
    result += `Итого с вас ${format(totalAmount)}\n`;
    result += `Вы заработали ${volumeCredits} бонусов\n`;
    return result;
}

/**
 * Подсчет цены за постановку
 * 
 * @param {*} audience размер аудитории 
 * @param {*} type  тип постановки
 */
function calculatePerformancePrice(audience, type) {
    let thisAmount = 0;
    switch (type) {
        case "tragedy":
            thisAmount = 40000;
            if (audience > 30) {
                thisAmount += 1000 * (audience - 30);
            }
            break;
        case "comedy":
            thisAmount = 30000;
            if (audience > 20) {
                thisAmount += 10000 + 500 * (audience - 20);
            }
            thisAmount += 300 * audience;
            break;
        default:
            throw new Error(`неизвестный тип: ${type}`);

    }
    return thisAmount;
}

/**
 * Подсчет бонусов
 * 
 * @param {*} audience размер аудитории 
 * @param {*} type тип постановки
 */
function calculateBonus(audience, type) {
    // Добавление бонусов
    let volumeCredits = Math.max(audience - 30, 0);
    // Дополнительный бонус за каждые 10 комедий
    if ("comedy" === type) {
        volumeCredits += Math.floor(audience / 5);
    }
    return volumeCredits;
}

export default getInvoice;