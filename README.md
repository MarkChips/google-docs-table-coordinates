# Secret Message Decoder

This project is a Node.js script that decodes a secret message from a Google Docs table using web scraping techniques. The script default Google Docs table can be found [here.](https://docs.google.com/document/d/e/2PACX-1vQyB7MV0PP--2tIpnfhBQFBAqFYWhfBJC6BeMWMmGh30KWdprXBU_i9soJLH_UPjYUuneIYB-HdOv-d/pub)

## Features

- Scrapes a Google Docs table from a given URL
- Extracts coordinates and characters from the table
- Reconstructs the secret message based on the extracted data
- Outputs the decoded message to the console

## Prerequisites

- Node.js (version 12 or higher)
- npm (Node Package Manager)

## Google Doc Table Format

If you wish to construct your own table to be decifered it will need to follow this format:

| X-coordinate      | Character            | Y-coordinate   |
| ----------------- | -------------------- | -------------- |
| `<column number>` | `<symbol to insert>` | `<row number>` |
| 0                 | █                    | 5              |
| 1                 | ░                    | 4              |
| 2                 | █                    | 3              |

### Instructions to create your own secret message table

1. Create a blank Google Doc.
2. Insert a table 3 columns wide and however many rows you may need for the symbols you wish to construct.
3. Fill in the header row as seen above.
4. Specify the X-coordinate in the first column, and the Y-coordinate in the third column.
5. Use █ for solid blocks and ░ for shadow blocks (or whatever alt-code symbol that pleases you), and paste them in the middle column.
6. Once done, go to File > Share > Publish to web. Make sure 'Link' is selected and then click 'Publish'.
7. You will need the Google Doc publication URL for [usage, step 2.](#usage)

## Installation

1. Clone this repository or download the script.
2. Navigate to the project directory in your terminal.
3. Run `npm install` to install the required dependencies.

## Usage

1. Ensure you have the correct URL for the Google Docs publication containing the secret message table.
2. Update the `URL` constant in the script with your Google Docs URL.
3. Run the script using Node.js:

```
node index.js
```

The decoded message will be printed to the console.

## How it works

1. The script uses Playwright to launch a headless Chrome browser and navigate to the specified URL.
2. It waits for the table to load and then extracts the coordinates and characters from each row.
3. The extracted data is used to reconstruct the secret message in a 2D array.
4. Finally, the message is printed to the console.

## Dependencies

- [Playwright](https://playwright.dev/): Used for web scraping and browser automation.
