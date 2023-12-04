# React Admin Dashboard

This project is a React-based admin dashboard that includes several key features for managing and interacting with a dataset of users. The dashboard provides functionalities like searching, editing, deleting, pagination, and more.

## Features

1. **Column Titles**: Designed to stand out from the entries for clear differentiation.
2. **Search Functionality**: Includes a search bar that can filter users based on any property (ID, name, email, role). Real-time filtering as you type, and search is triggered on pressing Enter.
3. **Edit/Delete Rows**: Capability to edit or delete rows in place. These changes are in-memory and not persistent.
4. **Pagination**: Each page displays 10 rows. Pagination controls include buttons for navigating to the first, previous, next, and last pages. Pagination updates dynamically based on the search/filter results.
5. **Row Selection**: Ability to select one or more rows for bulk actions. Selected rows are highlighted for visual feedback.
6. **Bulk Delete**: A 'Delete Selected' button allows for the deletion of multiple selected rows simultaneously.
7. **Select/Deselect All**: A checkbox in the header row to select or deselect all visible rows on the current page.
8. **Styling**: Specific class names and styles applied to different elements for a cohesive and user-friendly UI.
9. **Responsive Design**: Ensures a consistent experience across various devices and screen sizes.

## Installation

To set up the project locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/amaan14999/admin-dashboard.git
   ```

2. Navigate to the project directory:

   ```bash
   cd admin-dashboard
   ```

3. Install the dependencies:

   ```bash
   npm i
   ```

4. Run the application:

   ```bash
   npm start
   ```

## Deployment

The project is deployed using [Cloudflare](https://www.cloudflare.com/). The live version can be found [here](https://admin-dashboard-9jf.pages.dev/).

## Contributors

- [Amaan](https://github.com/amaan14999)
