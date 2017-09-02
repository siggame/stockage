# siggame/stockage

JavaScript utility that provides a common interface in communicating with Google Storage, AWS S3, and local storage.

[![Travis](https://img.shields.io/travis/siggame/stockage.svg?style=flat-square)](https://travis-ci.org/siggame/stockage)
[![Docker Pulls](https://img.shields.io/docker/pulls/stockage/registre.svg?style=flat-square)](https://hub.docker.com/r/siggame/stockage/)
[![GitHub release](https://img.shields.io/github/release/siggame/stockage.svg?style=flat-square)](https://github.com/siggame/stockage/releases)
[![Dependencies](https://img.shields.io/david/siggame/stockage.svg)](https://github.com/siggame/stockage)

## Table Of Contents
- [Description](#description)
- [Usage](#usage)
- [Contributors](#contributors)
- [License](#license)
- [Contributing](#contributing)

## Description

This library is to act as a common interface to allow us to save, retrieve, and update arbitrary files from a cloud service.

## Usage

### Installing
```
npm install siggame/stockage#stable
```

### Using Local Stockage
```typescript
// Importing
import * as stockage from "stockage";

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

## License

View our [LICENSE.md](https://github.com/siggame/colisee/blob/master/LICENSE.md)

## Contributing

View our [CONTRIBUTING.md](https://github.com/siggame/colisee/blob/master/CONTRIBUTING.md)