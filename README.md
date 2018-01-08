# ducatus-payment

> Ducatus payment gateway

## Getting Started

Gettins started is straightforward

1. Make sure you have [docker](https://www.docker.com/) (or [redis](https://redis.io/)), [NodeJS](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.
2. Install your dependencies

    ```
    cd path/to/ducatus-payment; npm install
    ```

3. Start a redis container (or simply have a running instance):

    ```
    docker run -p "6379:6379" -d redis
    ```

4. Start the payment gateway

    ```
    npm start
    ```

### Optional

Use [Yarn](https://yarnpkg.com/en/) instead of `npm`, `yarn` is much faster and more reliable.

1. Install yarn

    ```
    npm install -g yarn
    ```

2. Install your dependencies

    ```
    cd path/to/ducatus-payment; yarn install
    ```

3. Start the payment gateway

    ```
    yarn start
    ```

## API Documentation

API documentation is hosted [here](https://ducatus.github.io/ducatus-payment-api/)


## Changelog

__0.0.1__

- Initial release

## License

Copyright (c) 2017 

Licensed under the [MIT license](LICENSE).
