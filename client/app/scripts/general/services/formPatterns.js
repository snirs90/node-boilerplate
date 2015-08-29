angular.module('nodeBoiler')
    .factory('formPatterns', [function () {

        /**
         * turn number type value into a reg exp digit
         * @param num - {Number}
         * @returns {RegExp}
         */
        function digits(num) {
            return new RegExp('^\\d{' + num + '}$');
        }

        return {
            email: /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            city: /^[A-Za-z ]+$/,
            url: /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
            username: /^[A-Za-z0-9_\-@]{3,}$/,

            phone: {
                full: digits(10),
                three: digits(3),
                four: digits(4)
            },

            password: /^(?=.*[A-Z])(?=.*\d)[\x00-\x7F]{8,}$/,
            zip: /(^\d{5}$)|(^\d{5}-\d{4}$)/

        };
    }]
);
