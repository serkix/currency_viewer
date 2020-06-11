# Currency viewer

Welcome to the currency viewer app

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Docker instructions

Docker repo for this project is located on serkix/currency-viewer-min:1.0
To use it you'll have to install docker and run following commands:
`docker pull serkix/currency-viewer-min:1.0`
`docker run --name currency-viewer -d -p 8080:80 serkix/currency-viewer-min:1.0`
and now just navigate to `http://localhost:8080/`