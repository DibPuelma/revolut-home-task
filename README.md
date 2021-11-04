# Home task for Revolut

### Usage
To run in development, download and then run `yarn start`

To run the test suit, download and then run `yarn test`

### Build the widget

To build the widget, download and then run `yarn build:widget`
### Notes
- .env is in the repository so you can have access to the API credentials

### Improvements
- With a better plan for the API, it is possible to get rates based on different currencies. The current implementation uses USD as a proxy currency to calculate all the rates.

- More testing is needed, specially for the Exchange component and the MainContext

- Make the widget.js file smaller with some compression

- Use a CDN to make the widget available as a js script and css link