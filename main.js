function statement(invoice) {
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

        // Добавление бонусов
        volumeCredits += Math.max(perf.audience - 30, 0);
        // Дополнительный бонус за каждые 10 комедий
        if ("comedy" === perf.type) {
            volumeCredits += Math.floor(perf.audience / 5);
        }
        // Вывод строки счета
        result += `${perf.playId}: ${format(thisAmount)}`;
        result += `(${perf.audience} мест)\n`;
        totalAmount += thisAmount;
    }
    result += `Итого с вас ${format(totalAmount)}\n`;
    result += `Вы заработали ${volumeCredits} бонусов\n`;
    return result;
}

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