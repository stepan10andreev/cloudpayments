// 1 вариант - создание страницы-разметки из самого скрипта (с Промисом)
async function createPaymentPage() {
  await loadCloudpaymentsScript('https://widget.cloudpayments.ru/bundles/paymentblocks.js');

  const PAYMENT_CONTAINER = createPaymentContainer();

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
      // действия при демонтировании платежного блока
  });

  element.on("success", (result) => {
      console.log("success", result);
      // действия при успешной оплате
  });

  element.on("fail", (result) => {
      console.log("fail", result);
      // действия при неуспешной оплате
  });

}

function createPaymentContainer() {
  const PAYMENT_CONTAINER = document.createElement('div');
  PAYMENT_CONTAINER.id = 'payment-container';
  document.body.prepend(PAYMENT_CONTAINER);
  return PAYMENT_CONTAINER;
}

function loadCloudpaymentsScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.defer = true;
    script.addEventListener('load', () => {
      resolve()
    })
    document.head.append(script);
  })
}

createPaymentPage();