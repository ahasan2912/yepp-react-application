const toNumber = (value) => {
    const parsedValue = Number(value);

    return Number.isFinite(parsedValue) ? parsedValue : 0;
};

export const getDealPricing = (regularPriceValue, discountValue) => {
    const regularPrice = toNumber(regularPriceValue);
    const discount = Math.min(Math.max(toNumber(discountValue), 0), 100);
    const hasDiscount = regularPrice > 0 && discount > 0;
    const finalPrice = hasDiscount
        ? regularPrice - (regularPrice * discount) / 100
        : regularPrice;
    const savedAmount = regularPrice - finalPrice;

    return {
        regularPrice,
        discount,
        finalPrice,
        savedAmount,
        hasDiscount,
    };
};
