# Enterprise Connect Backend

The Enterprise Connect Backend is the backend component of a project aimed at providing a list of companies referenced in a government API. It uses Node.js and Express for the backend and stores data in a PostgreSQL database, accessed using Knex.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Configuration](#configuration)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)

## Getting Started

### Prerequisites

- Node.js (https://nodejs.org/)
- PostgreSQL (https://www.postgresql.org/)
- Knex.js (https://knexjs.org/)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/dorian-pltr/entreprise-connect-back.git
   ```

2. Navigate to the project directory:

   ```bash
   cd enterprise-connect-backend
   ```

3. Install dependencies:

   ```bash
   yarn
   ```

### Configuration

1. Rename `.env.example` to `.env` and update the environment variables:

   ```
   DB_HOST=your-database-host
   DB_PORT=your-database-port
   DB_USER=your-database-username
   DB_PASSWORD=your-database-password
   DB_NAME=your-database-name
   DISTANT_DB_URL=your-database-url (if you use it instead of a local database)
   ```

   If you've access to my distant database, please fill DISTANT_DB_URL instead of the others env settings.

## Usage

To start the server, run:

```bash
yarn dev
```

The server will start on the specified port (default: 3000).

## API Endpoints

- `GET /api/entreprises`: Retrieve a list of companies. You can use query parameters to filter results:
    - `name`: Search for companies by name.
    - `page`: Specify the page number for pagination.
