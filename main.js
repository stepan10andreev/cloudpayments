// 1 вариант - элемент изначаьно в разметке
// const PAYMENT_CONTAINER = document.getElementById('payment-container');

// 2 вариант - создание страницы-разметки из самого скрипта
function createPaymentPage() {
    const PAYMENT_CONTAINER = document.createElement('div');
    PAYMENT_CONTAINER.id = 'payment-container';
    document.body.prepend(PAYMENT_CONTAINER)
    return PAYMENT_CONTAINER
}

// функцию динамической загрузки скрипта
function loadScript(src) {
    let script = document.createElement('script');
    script.src = src;
    // script.defer = true;
    // script.async = false;
    document.head.append(script);
}

// выполнение функций
const PAYMENT_CONTAINER = createPaymentPage();
// loadScript('./main.js')

const element = new cp.PaymentBlocks({
    publicId: "test_api_00000000000000000000002",
    description: "Оплата товара №1 в ДомАптека",
    amount: 100,
    currency: "RUB",
    invoiceId: "123",
    accountId: "123",
    email: "",
    requireEmail: false,
    language: "ru-RU",
    applePaySupport: true,
    googlePaySupport: true,
    yandexPaySupport: true,
}, {
    appearance: {
      colors: {
        primaryButtonColor: "#2E71FC",
        primaryButtonTextColor: "#FFFFFF",
        primaryHoverButtonColor: "#2E71FC",
        primaryButtonHoverTextColor: "#FFFFFF",
        activeInputColor: "#0B1E46",
        inputBackground: "#000000",
        inputColor: "#8C949F",
        inputBorderColor: "#E2E8EF",
        errorColor: "#EB5757"
      },
      borders: {
        radius: "8px"
      }
    },
    components: {
      paymentButton: {
        text: "Оплатить",
        fontSize: "16px"
      },
      paymentForm: {
        labelFontSize: "16px",
        activeLabelFontSize: "12px",
        fontSize: "16px"
      }
    }
});


element.mount(PAYMENT_CONTAINER);

element.on("destroy", () => {
    console.log("destroy");
});

element.on("success", (result) => {
    console.log("success", result);
});

element.on("fail", (result) => {
    console.log("fail", result);
});