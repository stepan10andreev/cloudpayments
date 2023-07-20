const PAY_BTN = document.getElementById("pay-button")

// Параметры конструктора - Widget
const constructorObject = {
    // {WidgetOptions} - все компоненты необязательные (по умолчанию локализация - RU)
    language: "ru-RU",
    sbpSupport: true,
    applePaySupport: true,
    googlePaySupport: true,
    yandexPaySupport: true,
    masterPassSupport: true,
    tinkoffPaySupport: true,
    tinkoffInstallmentSupport: true, // Поддержка Тинькофф-рассрочки
};

function pay() {
    const widget = new cp.CloudPayments(constructorObject)
    widget.pay('charge', // charge для одностадийной оплаты
      { // Параметры оплаты, * - обязательный компонент
        publicId: 'test_api_00000000000000000000002', // id из личного кабинета *
        description: 'Оплата товара №1 в ДомАптека', // назначение (описание)
        amount: 1000, //сумма *
        currency: 'RUB', //валюта *
        accountId: 'user@example.com', // идентификатор плательщика (необязательно)
        // requireEmail: true, // Требование указать e-mail адрес пользователя в виджете
        email: "", // E-mail плательщика, на который будет отправлена квитанция об оплате (необязательно)
        invoiceId: '1234567', // номер заказа  (необязательно)
        skin: "mini", // дизайн виджета (необязательно)
        autoClose: 3 // Автоматическое закрытие виджета после успешной оплаты через указанное количество секунд (минимум 3 секунды, максимум 10 секунд). 
      }, {
        onSuccess: function(options) { 
            // действие при успешной оплате И закрытии виджета после оплаты!!!
            // Указывается либо функция, либо адрес страницы сайта. В случае указания функции — она будет вызвана после успешного завершения оплаты и закрытия пользователем окна виджета.
            // В случае указания адреса — пользователь будет направлен на указанную страницу.
          console.log('Оплата прошла успешна')
        },
        onFail: function(reason, options) { 
            // действие при неуспешной оплате И закрытии виджета после оплаты!!!
            // Указывается либо функция, либо адрес страницы сайта. В случае указания функции — она будет вызвана после неуспешного завершения платежа.
            // В случае указания адреса — пользователь будет направлен на указанную страницу.
          console.log('Оплата не прошла')
        //   console.log(reason) // выводит message из onComplete(paymentResult), карты с  3-D Secure дают message=null, ,без 3-D Secure - дают информативный message

        },
        onComplete: function(paymentResult, options) { //Вызывается как только виджет получает от api.cloudpayments ответ с результатом транзакции.
            // Указывается функция, которая будет вызвана, как только виджет получит ответ с результатом транзакции. Редиректы в этом методе делать нельзя.
          console.log(paymentResult)
        }
      }
    )
}

PAY_BTN.addEventListener('click', pay)