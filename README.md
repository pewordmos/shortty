# Shortty: A Simple Link Shortener 🩳

![GitHub release](https://img.shields.io/github/release/pewordmos/shortty.svg) ![GitHub issues](https://img.shields.io/github/issues/pewordmos/shortty.svg) ![GitHub stars](https://img.shields.io/github/stars/pewordmos/shortty.svg)

Welcome to **Shortty**, a very simple link shortener. Maybe too simple, quite frankly. This project aims to provide an easy way to shorten URLs without the complexity often found in other link shorteners. 

## Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Built With](#built-with)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- **Ease of Use**: Shorten links quickly with minimal setup.
- **Serverless Architecture**: Built on Cloudflare Workers for efficient performance.
- **TypeScript Support**: Enjoy type safety and modern JavaScript features.
- **Lightweight**: The project is simple and does not have unnecessary features.

## Getting Started

To get started with Shortty, you can download the latest release from the [Releases section](https://github.com/pewordmos/shortty/releases). Follow the instructions below to set it up on your local machine.

### Prerequisites

- Node.js installed on your machine.
- A Cloudflare account for deploying the service.

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/pewordmos/shortty.git
   ```

2. Navigate into the project directory:

   ```bash
   cd shortty
   ```

3. Install the required dependencies:

   ```bash
   npm install
   ```

4. Build the project:

   ```bash
   npm run build
   ```

5. Follow the instructions in the Cloudflare documentation to deploy the worker.

## Usage

After setting up Shortty, you can start shortening links. Simply send a request to the API endpoint with the URL you want to shorten. The API will return a shortened link that you can share.

### Example Request

```bash
curl -X POST https://your-cloudflare-worker-url/shorten -d '{"url": "https://example.com"}' -H "Content-Type: application/json"
```

### Example Response

```json
{
  "shortenedUrl": "https://shortty.xyz/abc123"
}
```

## Built With

- **Cloudflare Workers**: For serverless functionality.
- **Hono**: A lightweight framework for building web applications.
- **TypeScript**: For type safety and modern JavaScript features.
- **Cloudflare KV**: For storing shortened links.

## Contributing

We welcome contributions to Shortty! If you have ideas for improvements or want to report issues, please open an issue or submit a pull request.

1. Fork the repository.
2. Create your feature branch.
3. Commit your changes.
4. Push to the branch.
5. Open a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For questions or suggestions, feel free to reach out via GitHub or create an issue in the repository. 

You can find the latest releases [here](https://github.com/pewordmos/shortty/releases). Download the file and execute it to start using Shortty.

Happy shortening! 🩳