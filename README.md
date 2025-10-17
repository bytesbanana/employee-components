# Employee Components

A lightweight library of reusable web components for employee management interfaces, built with [Lit](https://lit.dev/) for modern web development. This project focuses on creating performant, accessible components for handling employee data, starting with a searchable input component.

## Features

- **Employee Search Input**: A debounced search input that filters employees by name, ID, or manager's email. Supports loading states and dispatches custom events with search results.
- **TypeScript Support**: Fully typed with interfaces for employee data structures.
- **Modular Build**: Uses Vite for development and tsup for building optimized bundles (ES modules and UMD).
- **Icon Integration**: Includes Iconify for loading indicators and other icons.
- **Mock Data Integration**: Searches against sample employee data with departments, projects, and tasks.

## Installation

1. Ensure you have Node.js (v18+) installed.
2. Install the package via npm:

   ```bash
   npm install employee-components
   ```

   Or using pnpm (as used in the project):

   ```bash
   pnpm add employee-components
   ```

3. Import the components in your project:

   ```typescript
   import 'employee-components';
   ```

## Usage

### Employee Search Input

The primary component is `<employee-search-input>`, which provides a search field for employee data.

#### Basic Usage

Add the component to your HTML:

```html
<employee-search-input id="search" name="employee-search"></employee-search-input>
```

#### Listening to Search Events

The component dispatches a custom `search` event when results are available (after debouncing). Listen for it to handle filtered results:

```javascript
const searchInput = document.querySelector('employee-search-input');
searchInput.addEventListener('search', (event) => {
  const { results, query } = event.detail;
  console.log(`Found ${results.length} employees for query: ${query}`);
  // Update your UI with results, e.g., display in a list
});
```

#### Properties

- `id`: Sets the input's ID (default: "employee-search-input").
- `name`: Sets the input's name (default: "employee-search-input").
- `placeholder`: Customizable via CSS or shadow DOM (default: "Name, Email, ID").

#### Search Logic

- Searches trigger after 300ms debounce and a minimum of 2 characters.
- Filters data from `getAllData()` (mock API simulating async fetch).
- Results include full employee objects matching the query.

#### Styling

The component uses shadow DOM for encapsulation. Style the host or use CSS custom properties:

```css
employee-search-input {
  --input-border: 1px solid #ccc;
}
```

### Data Structure

The component works with structured employee data defined in [typings.d.ts](lib/src/typings.d.ts). Here's the interface overview:

```typescript
export interface Data {
  employee: Employee;
  manager: Manager;
}

export interface Employee {
  id: string;
  name: string;
  position: string;
  department: Department;
  projects: Project[];
}

export interface Department {
  id: string;
  name: string;
  manager: Manager;
}

export interface Manager {
  id: string;
  name: string;
  contact: Contact;
}

export interface Contact {
  email: string;
  phone: string;
}

export interface Project {
  projectId: string;
  projectName: string;
  startDate: string;
  tasks: Task[];
}

export interface Task {
  taskId: string;
  title: string;
  status: string;
  details: Details;
}

export interface Details {
  hoursSpent: number;
  technologiesUsed: string[];
  completionDate?: string;
  expectedCompletion?: string;
}
```

Sample data is loaded from [data.json](lib/src/data/data.json), which contains an array of `Data` objects. Searches filter on `employee.name`, `employee.id`, and `manager.contact.email`.

## Demo

Run the development server to see the component in action:

```bash
cd lib
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) (or the Vite port). The demo page ([index.html](lib/index.html)) includes the search input and logs search results to the console.

Search for terms like "John" or an email to see filtered results.

## Development

### Setup

Clone the repo and install dependencies:

```bash
git clone <repo-url>
cd lib
pnpm install
```

### Scripts

- `npm run dev`: Start Vite dev server with hot reload.
- `npm run build`: Build the library using tsup (outputs to `dist/`).
- `npm run preview`: Preview the built demo.

### Project Structure

```
lib/
├── src/
│   ├── components/
│   │   ├── employee-search-input.ts  # Main component
│   │   └── index.ts                  # Exports
│   ├── data/
│   │   ├── data.json                 # Sample employee data
│   │   └── index.ts                  # Data loader
│   ├── main.ts                       # Entry point
│   └── typings.d.ts                  # Type definitions
├── index.html                        # Demo page
├── package.json                      # Dependencies and scripts
├── tsup.config.ts                    # Build config
└── tsconfig.json                     # TypeScript config
```

### Adding New Components

1. Create a new `.ts` file in `src/components/`.
2. Export it from `src/components/index.ts`.
3. Update `src/main.ts` if needed.
4. Add to build exports in `package.json`.

## Building and Publishing

- Run `npm run build` to generate `dist/` with types, ES, and UMD bundles.
- For publishing: Update version in `package.json`, then `npm publish` (from `lib/`).

## Dependencies

- **Lit (^3.3.1)**: For web components.
- **lodash.debounce (^4.0.8)**: For input debouncing.
- **iconify-icon (^3.0.1)**: For icons (e.g., loading spinner).

Dev tools: Vite, tsup, TypeScript.

## Contributing

Contributions welcome! Fork the repo, create a feature branch, and submit a PR. Ensure code follows Prettier formatting.

## License

MIT License. See [LICENSE](LICENSE) for details (add if needed).

## Future Plans

- Add more components (e.g., employee list, detail view).
- Integrate real API fetching.
- Enhance search with more filters (e.g., department, status).
- Add unit tests with Vitest.

For questions, open an issue.