function getBrowserName(userAgent) {
    let browserName = "Microsoft Edge";

    if (/chrome|chromium|crios/i.test(userAgent) && !/edg/i.test(userAgent)) {
        browserName = "Google Chrome";
    }
    else if (/firefox|fxios/i.test(userAgent)) {
        browserName = "Mozilla Firefox";
    }
    else if (/safari/i.test(userAgent) && !/chrome|chromium|crios/i.test(userAgent)) {
        browserName = "Apple Safari";
    }
    else if (/msie|trident/i.test(userAgent)) {
        browserName = "Internet Explorer";
    }
    else if (/opera|opios/i.test(userAgent)) {
        browserName = "Opera";
    }
    return browserName;
}

export default getBrowserName;