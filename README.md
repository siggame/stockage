# siggame/stockage

JavaScript utility that provides a common interface in communicating with Google Storage, AWS S3, and local storage.

[![Travis](https://img.shields.io/travis/siggame/stockage.svg?style=flat-square)](https://travis-ci.org/siggame/stockage)
[![Dependencies](https://img.shields.io/david/siggame/stockage.svg)](https://github.com/siggame/stockage)
[![NPM Version](https://img.shields.io/npm/@siggame/stockage.svg?style=flat-square)](https://www.npmjs.com/package/@siggame/stockage)
[![NPM Total Downloads](https://img.shields.io/npm/dt/@siggame/stockage.svg?style=flat-square)](https://www.npmjs.com/package/@siggame/stockage)

## Table Of Contents
- [Description](#description)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Contributors](#contributors)
- [License](#license)
- [Contributing](#contributing)

## Description

This library is to act as a common interface to allow us to save, retrieve, and update arbitrary files from a cloud service.

## Getting Started
```
npm install siggame/stockage#stable
```

```typescript
import * as stockage from "@siggame/stockage";
```

## Usage

### Using Local Stockage
```typescript


// New instance
const stock = new stockage.LocalStockage();

// Writing data
const id = await stock.write("Hello, World");
const id = await stock.writeBuffer(buffer);
const id = await stock.writeJSON({hello: "world"});

// Reading data
const data = await stock.read(id);
const data = await stock.readBuffer(id);
const data = await stock.readJSON(id);
```

## Contributors
- [Russley Shaw](https://github.com/russleyshaw)
- [user404d](https://github.com/user404d)
- [Hannah Reinbolt](https://github.com/LoneGalaxy)
- [Matthew Qualls](https://github.com/MatthewQualls)

## License

View our [LICENSE.md](https://github.com/siggame/colisee/blob/master/LICENSE.md)

## Contributing

View our [CONTRIBUTING.md](https://github.com/siggame/colisee/blob/master/CONTRIBUTING.md)