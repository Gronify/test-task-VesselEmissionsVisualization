# Vessel Emissions Visualization

---

## Backend Setup

### Install dependencies

```bash
cd backend
npm install
```

### Apply existing database migrations

```bash
npx prisma migrate deploy
```

### Seed the database

```bash
npm run seed
```

Seeds the database using `tools/seed.ts` with data from:
- `data/daily-log-emissions.json`
- `data/vessels.json`
- `data/pp-reference.json`

### Start the development server

```bash
npm run start:dev
```

Backend runs on `http://localhost:5000`.

---

## API Endpoints

### `GET /vessels`

Returns the list of all vessels from the database.

### `GET /vessels-emission/:id/:dwt`

Returns quarterly emissions deviation for a given vessel.

- Uses the last day of each quarter (based on the `TOUTC` field)
- Calculates Poseidon Principles SCC baselines via the `calculatePPSCCBaselines` utility
- Returns actual values, baseline values, and percentage deviation

---

## Frontend Setup

### Install dependencies and start the dev server

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:3000`.

---

## Frontend Features

- Vessel selector to choose a vessel by ID
- Emissions deviation chart (Highcharts)
- Lines on the chart can be toggled on/off
- Table data view for emissions
- Components:
  -- `Chart.tsx`: renders the Highcharts line chart
  -- `Controls.tsx`: vessel selector and interactions
  -- `DataTable.tsx`: renders emissions table
- Types defined in `types/emissions.ts`

---

## Notes

- The baseline calculation is implemented manually using `calculatePPSCCBaselines`.
- Data is grouped by quarter using custom logic.
- The frontend consumes preprocessed deviation data directly from the backend API.
