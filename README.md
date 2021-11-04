# Home task for Revolut

### Usage
To run in development, download and then run `yarn` to install dependencies and `yarn start` to run the development server

To run the test suit, download and then run `yarn test`

### Build the widget

To build the widget, download and then run `yarn build:widget`. If you run into problems, try deleting the .cache folder

### Notes
- .env is in the repository so you can have access to the API credentials

### Improvements
- With a better plan for the API, it is possible to get rates based on different currencies. The current implementation uses USD as a proxy currency to calculate all the rates.

- More testing is needed, specially for the Exchange component and the MainContext

- Make the widget.js file smaller with some compression. Could get it from 9.04MB to 809.57KB with parcel-plugin-compress library

- Use a CDN to make the widget available as a js script and css link